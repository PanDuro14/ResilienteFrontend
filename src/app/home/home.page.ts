import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public isResenaModalOpen = false;
  public isFormValid = false;
  public allColabs: any = []; 

  public slides = [
    { name: "Slide 1", img: "assets/gif/gif1.gif" },
    { name: "Slide 2", img: "assets/gif/gif2.gif" },
  ];

  public cards = [
    { titulo: 'Psicología', class: 'card-psicologia', link: "/psicologia" },
    { titulo: 'Consultoría', class: 'card-consultoria', link: "/consultoria" },
    { titulo: 'Blogs', class: 'card-blogs', link: "/blog" },
  ];

/*   public posts = [
    {
      img: 'assets/img/posts/1.webp',
      date: '14 de Julio de 2024',
      title: 'Como Elegir la Carrera Adecuada',
      description: '¿Confundido sobre tu carrera? Descubre cómo tus intereses y habilidades pueden guiarte hacia la opción ideal. Haz clic para más información y encontrar tu camino profesional.',
      isImageFirst: true
    },
    {
      img: 'assets/img/posts/2.webp',
      date: '19 de Julio de 2024',
      title: 'La Importancia de la Salud Mental en el Entorno Empresarial',
      description: 'La salud mental de los empleados impulsa productividad y éxito. Conoce estrategias para mejorar el ambiente laboral y consulta nuestros programas de bienestar. ¡Haz clic para más detalles y agendar una consulta!',
      isImageFirst: false
    },
    {
      img: 'assets/img/posts/3.webp',
      date: '3 de Julio de 2024',
      title: '¿Te cuesta conectar con tu hijo adolescente?',
      description: '¿Tienes dificultades para conectar con tu hijo adolescente? Aprende estrategias para fortalecer la relación y considera la terapia si es necesario. Haz clic para obtener consejos y agendar tu cita con nuestros expertos.',
      isImageFirst: true
    }
  ]; */

/*   public ultimaItems = [
    { img: "https://ionicframework.com/docs/img/demos/card-media.png", title: "Lorem ipsum dolor" },
    { img: "https://ionicframework.com/docs/img/demos/card-media.png", title: "Lorem ipsum dolor" },
  ];
 */
  constructor(
    private serviceRest: ServicioRestService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private alertCtrl: AlertController, 
    private http: HttpClient
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
    this.getAllColabs(); 
/*     this.getBlog();
 */  }

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

/*   public getBlog() {
    this.serviceRest.get('https://backend-resiliente.fly.dev/api/v1/blog').subscribe((respuesta) => {
      this.blogs = respuesta;
    });
  } */

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

  // colaboradores 
  getAllColabs():void {
    this.http.get<any[]>('https://backend-resiliente.fly.dev/api/v1/colab').subscribe(
      Response => {
        this.allColabs = Response; 
      }, 
      error => {
        console.error('Dashboard: Error al obtener las colaboraciones', error); 
      }
    ); 
  }

  openUrl(url: string) {
    window.open(url, '_blank');
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