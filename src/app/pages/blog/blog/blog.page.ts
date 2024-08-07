import { Component, OnInit } from '@angular/core';
import { ServicioRestService } from 'src/app/services/restService/rest-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AnimationController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  public blogs: any = [];
  public agBlog: FormGroup;
  public isFormValid = false;
  public isAgBlogModalOpen = false;
  public isBlogOpen = false;
  private selectedFile: File | null = null;

/*   public blogs = [
    { tema: "Blog 1", fecha: "21 de Julio del 2024", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { tema: "Blog 2", fecha: "22 de Julio del 2024", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { tema: "Blog 3", fecha: "23 de Julio del 2024", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { tema: "Blog 4", fecha: "24 de Julio del 2024", img: "https://ionicframework.com/docs/img/demos/card-media.png" },

  ]; */

  constructor(
    private serviceRest: ServicioRestService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private alertCtrl: AlertController) {


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
    /*inicio ola 
    const titulo = this.agBlog.get('titulo');
    const contenido = this.agBlog.get('contenido');
    const images = this.agBlog.get('images');
    const autor = this.agBlog.get('autor');
    const fecha = this.agBlog.get('fecha');

    this.isFormValid = this.agBlog.valid &&
      titulo !== null && titulo.value !== null && titulo.value.trim() !== '' &&
      contenido !== null && contenido.value !== null && contenido.value.trim() !== '' &&
      images !== null && images.value !== null && images.value.trim() !== '' &&
      autor !== null && autor.value !== null && autor.value.trim() !== '' &&
      fecha !== null && fecha.value !== null && fecha.value.trim() !== '';
    fin ola*/
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
          }
        }
      ]
    });
    await alert.present();
  }


  /* APIS */
  /* GET */ 
  public getBlog() {
    this.serviceRest.get('https://backend-resiliente.fly.dev/api/v1/blog').subscribe((respuesta) => {
      this.blogs = respuesta;
    });
  }

  public createBlog() {
    if (this.isFormValid) {
      const formData = new FormData(); 
      formData.append('titulo', this.agBlog.get('titulo')?.value); 
      formData.append('contenido', this.agBlog.get('contenido')?.value);
      formData.append('autor', this.agBlog.get('autor')?.value);
      formData.append('fecha', this.agBlog.get('fecha')?.value);
      if(this.selectedFile){
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


  
  /* FIN Transformar el formato de las imagenes * /

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

  async openVerBlogModal() {
    this.isBlogOpen = true;
  }

  closeVerBlogModal(){
    this.modalCtrl.dismiss();
  }

  didDismissVerBlogModal() {
    this.isAgBlogModalOpen = false;
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
