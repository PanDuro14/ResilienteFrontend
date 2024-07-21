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
    {
      nombre: "Yolanda Esparza",
      img: "assets/img/equipo/psic1.jpg",
      descripcion: "Psicóloga y educadora especializada en tutoría, con experiencia en orientación educativa y apoyo psicológico en instituciones educativas.",
      especialidad: "Lic. en Psicología, Maestría en Educación con Orientación en Tutoría",
      cedula: "4403100, 13173822"
    },
    {
      nombre: "Andrea Zaragoza",
      img: "assets/img/equipo/psic2.jpg",
      descripcion: "Especialista en TDC, tratamiento de conductas suicidas, primeros auxilios psicológicos y trastornos del ánimo. Ofrece terapias efectivas y personalizadas en un entorno terapéutico seguro.",
      especialidad: "Lic. en Psicología",
      cedula: "13802594"
    },
    {
      nombre: "Mariana Hernandez",
      img: "assets/img/equipo/psic3.jpg",
      descripcion: "Psicóloga especializada en Psicoterapia Infantil, intervención en duelo y sexualidad infantil. Comprometida con el bienestar emocional y mental de los niños.",
      especialidad: "",
      cedula: ""
    },
    {
      nombre: "Daniela Macias",
      img: "https://ionicframework.com/docs/img/demos/card-media.png",
      descripcion: "Psicoterapeuta con enfoque integral, especializada en adicciones, psicoeducación y terapia de lenguaje. Diplomada en psicoterapia cognitivo-conductual.",
      especialidad: "Lic. en Psicología",
      cedula: "13778915"
    },
    {
      nombre: "Victoria Díaz",
      img: "https://ionicframework.com/docs/img/demos/card-media.png",
      descripcion: "Psicóloga especializada en terapia infantil, dedicada a mejorar el bienestar emocional y mental de los niños.",
      especialidad: "Lic. en Psicología",
      cedula: "09947667"
    }
  ];
  
  
  constructor() { }

  ngOnInit() {
  }

}
