import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isResenaModalOpen = false;

  public slides = [
    { name: "Slide 1", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { name: "Slide 2", img: "https://swiperjs.com/demos/images/nature-2.jpg" },
    { name: "Slide 3", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { name: "Slide 4", img: "https://swiperjs.com/demos/images/nature-2.jpg" },
  ];

  public cards = [
    { titulo: 'Terapia', class: 'card-terapia' },
    { titulo: 'Congresos', class: 'card-congresos' },
    { titulo: 'Consultoría', class: 'card-consultoria' },
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

  constructor(private modalController: ModalController,) { }


  // Modales
  async openResenaModal() {
    this.isResenaModalOpen = true;
  }

  closeResenaModal() {
    this.modalController.dismiss();
  }

  didDismissResenaModal() {
    this.isResenaModalOpen = false;
  }
}
