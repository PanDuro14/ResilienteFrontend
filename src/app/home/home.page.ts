import { Component, OnInit } from '@angular/core';
import { ServicioRestService } from '../services/restService/rest-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimationController, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public resenas: any = [];
  public agResena: FormGroup;
  public blogs: any = [];
  public isResenaModalOpen = false;
  public isFormValid = false;

  public slides = [
    { name: "Slide 1", img: "assets/gif/gif1.gif" },
    { name: "Slide 2", img: "assets/gif/gif2.gif" },
  ];

  public cards = [
    { titulo: 'Psicología', class: 'card-psicologia', link: "/psicologia" },
    { titulo: 'Consultoría', class: 'card-consultoria', link: "/consultoria" },
    { titulo: 'Blogs', class: 'card-blogs', link: "/blog" },
  ];

  public posts = [
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      date: 'FECHA',
      title: 'TÍTULO DE NOTA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.',
      isImageFirst: true
    },
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      date: 'FECHA',
      title: 'TÍTULO DE NOTA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.',
      isImageFirst: false
    },
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      date: 'FECHA',
      title: 'TÍTULO DE NOTA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.',
      isImageFirst: true
    }
  ];

  public ultimaItems = [
    { img: "https://ionicframework.com/docs/img/demos/card-media.png", title: "Lorem ipsum dolor" },
    { img: "https://ionicframework.com/docs/img/demos/card-media.png", title: "Lorem ipsum dolor" },
  ];

  constructor(
    private serviceRest: ServicioRestService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private alertCtrl: AlertController
  ) {
    this.agResena = this.fb.group({
      contenido: ['', Validators.required],
      autor: ['', Validators.required],
    });

    this.agResena.valueChanges.subscribe(() => {
      this.checkFormValidity();
    });
  }

  ngOnInit() {
    this.getResena();
    this.getBlog();
  }

  checkFormValidity() {
    const contenido = this.agResena.get('contenido');
    const autor = this.agResena.get('autor');

    this.isFormValid = this.agResena.valid &&
      contenido !== null && contenido.value !== null && contenido.value.trim() !== '' &&
      autor !== null && autor.value !== null && autor.value.trim() !== '';
  }

  public async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.getResena();
            window.location.reload();
          }
        }
      ]
    });
    await alert.present();
  }

  public getResena() {
    this.serviceRest.get('https://backend-resiliente.fly.dev/api/v1/comentario').subscribe((respuesta) => {
      this.resenas = respuesta;
    });
  }

  public getBlog() {
    this.serviceRest.get('https://backend-resiliente.fly.dev/api/v1/blog').subscribe((respuesta) => {
      this.blogs = respuesta;
    });
  }

  public createResena() {
    if (this.isFormValid) {
      const nuevaResena = this.agResena.value;
      this.serviceRest.post('https://backend-resiliente.fly.dev/api/v1/comentario', nuevaResena).subscribe(
        (respuesta) => {
          console.log('Reseña Agregada', respuesta);
          this.mostrarAlerta('Reseña creada con éxito');
          this.closeResenaModal();
          this.agResena.reset();
          this.getResena();
        },
        (error) => {
          console.error('Error al crear la reseña', error);
          this.mostrarAlerta('Error al crear la reseña');
        }
      );
    }
  }

  async openResenaModal() {
    this.isResenaModalOpen = true;
  }

  closeResenaModal() {
    this.modalCtrl.dismiss();
  }

  didDismissResenaModal() {
    this.isResenaModalOpen = false;
  }

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