import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public cards = [
    { titulo: 'Terapia', class: 'card-terapia' },
    { titulo: 'Congresos', class: 'card-congresos' },
    { titulo: 'Consultoría', class: 'card-consultoria' },
  ]

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
