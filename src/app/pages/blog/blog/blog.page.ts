import { Component, OnInit } from '@angular/core';
import { ServicioRestService } from 'src/app/services/restService/rest-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AnimationController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authService/auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  public blogs: any = [];
  public currentUser: any = [];
  public blogSeleccionado: any;

  public agBlog: FormGroup;
  private selectedFile: File | null = null;

  public isAgBlogModalOpen = false;
  public isBlogOpen = false;
  public isFormValid = false;
  public showCreateButton: boolean = false;
  public admin: boolean = false;

  private oldApiUrl = 'https://backend-resiliente.fly.dev/api/v1';

  constructor(
    private serviceRest: ServicioRestService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private alertCtrl: AlertController,
    private authservice: AuthService,
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
    this.authservice.$admin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      //console.log('valor de admin en blog: ', this.admin);
    });
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
          },
        },
      ],
    });
    await alert.present();
  }

  /* APIS */
  /* GET ALL */
  async getBlog() {
    this.serviceRest.get(`${environment.apiUrl}/blog`).subscribe((respuesta) => {
      this.blogs = respuesta;
    });
  }

  /* GET ONE */
  public getOneBlog(id: number) {
    this.serviceRest.getById(`${environment.apiUrl}/blog`, id).subscribe((respuesta) => {
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
      this.serviceRest.post(`${environment.apiUrl}/blog`, formData).subscribe(
        (respuesta) => {
          //console.log('Blog Agregado', respuesta);
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
