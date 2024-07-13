import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  public valoresC = [
    { valor: "Compromiso", descripcion: "Nos dedicamos a brindar un servicio excepcional y a acompañar a nuestros clientes en cada paso de su camino hacia el bienestar.", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { valor: "Ética", descripcion: "Operamos con los más altos estándares de integridad y profesionalismo, asegurando la confidencialidad y el respeto en todas nuestras interacciones.", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { valor: "Respeto", descripcion: "Valoramos la dignidad de cada persona y tratamos a todos con consideración y aprecio, fomentando un ambiente de confianza y apoyo mutuo.", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { valor: "Empatía", descripcion: "Nos esforzamos por comprender y compartir los sentimientos de nuestros clientes, brindando un apoyo sincero y comprensivo en sus momentos de necesidad.", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { valor: "Calidad", descripcion: "Nos comprometemos a ofrecer servicios de la más alta calidad, utilizando enfoques basados en evidencia y prácticas recomendadas para obtener los mejores resultados.", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
    { valor: "Excelencia", descripcion: "Buscamos continuamente mejorar y perfeccionar nuestras habilidades y conocimientos, aspirando a la excelencia en todo lo que hacemos.", img: "https://ionicframework.com/docs/img/demos/card-media.png" },
  ];
  public psicologos = [
    { nombre: "Yolanda Esparza", img: "https://ionicframework.com/docs/img/demos/card-media.png", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", especialidad: "Lorem Ipsum E", cedula: "Lorem Ipsum C" },
    { nombre: "Andrea Zaragoza", img: "assets/img/equipo/psic2.jpg", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", especialidad: "Lorem Ipsum E", cedula: "Lorem Ipsum C" },
    { nombre: "Mariana Hernandez", img: "assets/img/equipo/psic3.jpg", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", especialidad: "Lorem Ipsum E", cedula: "Lorem Ipsum C" },
    { nombre: "Mariana López", img: "https://ionicframework.com/docs/img/demos/card-media.png", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", especialidad: "Lorem Ipsum E", cedula: "Lorem Ipsum C" },
    { nombre: "Judith Yañez", img: "https://ionicframework.com/docs/img/demos/card-media.png", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", especialidad: "Lorem Ipsum E", cedula: "Lorem Ipsum C" },
  ];
  constructor() { }

  ngOnInit() {
  }

}
