import { Component } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isResenaModalOpen = false;


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

  public comentarios = [
    { nombre: "Jesús Alto", img: "assets/img/pruebas/pelon.jpg", opinion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis." },
    { nombre: "Jesús Chikito", img: "assets/img/pruebas/gsu.jpg", opinion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis." },
    { nombre: "Valeria Flores", img: "https://ionicframework.com/docs/img/demos/avatar.svg", opinion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis." },
    { nombre: "Alan García", img: "https://pbs.twimg.com/media/FxQnEEoXoAAAmHE.jpg", opinion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis." },
  ];

  public ultimaItems = [
    { img: "https://ionicframework.com/docs/img/demos/card-media.png", title: "Lorem ipsum dolor" },
    { img: "https://ionicframework.com/docs/img/demos/card-media.png", title: "Lorem ipsum dolor" },
  ];

  constructor(private modalController: ModalController, private animationCtrl: AnimationController) { }


  /* MODAL DE RESEÑA */
  async openResenaModal() {
    this.isResenaModalOpen = true;
  }

  closeResenaModal() {
    this.modalController.dismiss();
  }

  didDismissResenaModal() {
    this.isResenaModalOpen = false;
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
