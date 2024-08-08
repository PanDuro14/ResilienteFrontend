import { Component, OnInit } from '@angular/core';
import { ServicioRestService } from 'src/app/services/restService/rest-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AnimationController, AlertController } from '@ionic/angular';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  public blogs: any = [];
  public agBlog: FormGroup;
  public blogSeleccionado: any;
  public isAgBlogModalOpen = false;
  public isBlogOpen = false;
  private selectedFile: File | null = null;
  public isFormValid = false;
  public currentUser: any = []; 
  public showCreateButton: boolean = false;


  constructor(
    private serviceRest: ServicioRestService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private alertCtrl: AlertController,
    private userService: UserServiceService,
  ) {
    this.agBlog = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      images: [null],
      autor: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    this.agBlog.valueChanges.subscribe(() => {
      this.checkFormValidity();
    });
  }

  ngOnInit() {
    this.getBlog();
    this.getUser(); 
  }

  getUser(){
    this.userService.getUserData().pipe(
      catchError(error =>{
        console.error('Error al obtener usuario', error); 
        this.currentUser=[]; 
        return of([]); 
      })
    ).susbcribe((Response: any) =>{
      if(Response && Response.length > 0){
        this.currentUser = Response; 
        this.checkUserPermissions(); 
      } else {
        console.warn('No se encontraron datos de usuario'); 
        this.currentUser = []; 
      }
    }); 
  }

  checkUserPermissions() {
    const superUsuario = ["Resiliente0", "Resiliente02", "Resiliente03"];
    if (this.currentUser.length > 0 && superUsuario.includes(this.currentUser[2])) {
      this.showCreateButton = true;
    } else {
      this.showCreateButton = false;
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.agBlog.patchValue({
        images: file
      });
    }
  }

  checkFormValidity() {
    this.isFormValid = this.agBlog.valid && this.selectedFile !== null;
  }

  public async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.getBlog();
            window.location.reload();
          },
        },
      ],
    });
    await alert.present();
  }

  /* APIS */
  /* GET ALL */
  public getBlog() {
    this.serviceRest.get('https://backend-resiliente.fly.dev/api/v1/blog').subscribe((respuesta) => {
      this.blogs = respuesta;
    });
  }

  /* GET ONE */
  public getOneBlog(id: number) {
    this.serviceRest.getById('https://backend-resiliente.fly.dev/api/v1/blog', id).subscribe((respuesta) => {
      this.blogSeleccionado = respuesta;
    });
  }

  public createBlog() {
    if (this.isFormValid) {
      const formData = new FormData();
      formData.append('titulo', this.agBlog.get('titulo')?.value);
      formData.append('contenido', this.agBlog.get('contenido')?.value);
      formData.append('autor', this.agBlog.get('autor')?.value);
      formData.append('fecha', this.agBlog.get('fecha')?.value);
      if (this.selectedFile) {
        formData.append('images', this.selectedFile);
      }
      this.serviceRest.post('https://backend-resiliente.fly.dev/api/v1/blog', formData).subscribe(
        (respuesta) => {
          console.log('Blog Agregado', respuesta);
          this.mostrarAlerta('Blog creado con éxito');
          this.closeAgBlogModal();
          this.agBlog.reset();
          this.getBlog();
        },
        (error) => {
          console.error('Error al crear el blog', error);
          this.mostrarAlerta('Error al crear el blog');
        }
      );
    }
  }
  /* FIN APIS */

  /* MODAL DE BLOG */
  async openAgBlogModal() {
    this.isAgBlogModalOpen = true;
  }

  closeAgBlogModal() {
    this.modalCtrl.dismiss();
  }

  didDismissAgBlogModal() {
    this.isAgBlogModalOpen = false;
  }

  async openVerBlogModal(blog: any) {
    this.blogSeleccionado = blog;
    this.isBlogOpen = true;
  }

  closeVerBlogModal() {
    this.modalCtrl.dismiss();
  }

  didDismissVerBlogModal() {
    this.isBlogOpen = false;
    this.blogSeleccionado = null;
  }

  /* ANIMACIÓN DEL MODAL */
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot || baseEl;
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop') || root)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper') || root)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);
    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
