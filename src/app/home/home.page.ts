import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

/*   public slides = [
    {name: "Slide 1", img: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {name: "Slide 2", img: "https://swiperjs.com/demos/images/nature-2.jpg"},
    {name: "Slide 3", img: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {name: "Slide 4", img: "https://swiperjs.com/demos/images/nature-2.jpg"},
  ]; */

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
  
  constructor() { }

}
