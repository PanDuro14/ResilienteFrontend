import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  public valoresC = [
    {valor: "Compromiso", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", img: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {valor: "Ética", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", img: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {valor: "Respeto", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", img: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {valor: "Empatía", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", img: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {valor: "Calidad", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", img: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {valor: "Exelencia", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", img: "https://ionicframework.com/docs/img/demos/card-media.png"},


  ]

  constructor() { }

  ngOnInit() {
  }

}
