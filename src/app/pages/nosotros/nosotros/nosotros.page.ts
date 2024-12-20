import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  public valoresC = [
    { valor: "Compromiso", descripcion: "Nos dedicamos a brindar un servicio excepcional y a acompañar a nuestros clientes en cada paso de su camino hacia el bienestar.", img: "assets/img/valores/compromiso.webp" },
    { valor: "Ética", descripcion: "Operamos con los más altos estándares de integridad y profesionalismo, asegurando la confidencialidad y el respeto en todas nuestras interacciones.", img: "assets/img/valores/etica.webp" },
    { valor: "Respeto", descripcion: "Valoramos la dignidad de cada persona y tratamos a todos con consideración y aprecio, fomentando un ambiente de confianza y apoyo mutuo.", img: "assets/img/valores/respeto.webp" },
    { valor: "Empatía", descripcion: "Nos esforzamos por comprender y compartir los sentimientos de nuestros clientes, brindando un apoyo sincero y comprensivo en sus momentos de necesidad.", img: "assets/img/valores/empatia.webp" },
    { valor: "Calidad", descripcion: "Nos comprometemos a ofrecer servicios de la más alta calidad, utilizando enfoques basados en evidencia y prácticas recomendadas para obtener los mejores resultados.", img: "assets/img/valores/calidad.webp" },
    { valor: "Excelencia", descripcion: "Buscamos continuamente mejorar y perfeccionar nuestras habilidades y conocimientos, aspirando a la excelencia en todo lo que hacemos.", img: "assets/img/valores/excelencia.webp" },
  ];

  public psicologos = [
    {
      nombre: "Yolanda Esparza",
      img: "assets/img/equipo/psic1.webp",
      descripcion: "Psicóloga y Maestra en Educación. Especializada en Terapia Cognitiva Conductual y Tanatología; con más de 15 años de experiencia clínica en adolescentes y adultos. Conferencista, tallerista y consultora.",
      especialidad: "Lic. en Psicología, Maestría en Educación con Orientación en Tutoría",
      cedula: "4403100, 13173822"
    },
    {
      nombre: "Andrea Zaragoza",
      img: "assets/img/equipo/psic2.webp",
      descripcion: "Especialista en TDC, conductas suicidas, primeros auxilios psicológicos y trastornos del ánimo. Ofrece terapias efectivas y personalizadas.",
      especialidad: "Lic. en Psicología",
      cedula: "13802594"
    },
    {
      nombre: "Mariana Hernandez",
      img: "assets/img/equipo/psic3.webp",
      descripcion: "Psicóloga especializada en Psicoterapia Infantil, intervención en duelo y sexualidad infantil. Comprometida con el bienestar emocional de los niños.",
      especialidad: "Lic. en Psicología",
      cedula: "13749246"
    },
    {
      nombre: "Salvador Rubalcava",
      img: "assets/img/equipo/psicologonw1.jpg",
      descripcion: "Trabajo con adicciones por más de 4 años. Diplomado en psicofarmacología. Diplomado en trastornos de la personalidad. Diplomado en neurociencias de las adicciones",
      especialidad: "Adicciones",
      cedula: "13560890"
    },

    {
      nombre: "Nestor Calderon",
      img: "assets/img/equipo/psicologonw2.jpg",
      descripcion: "Con 4 años de experiencia en manejo de terapia psicológica infantil, adulta y pareja, atención en primeros auxilios psicológicos, atención en manejo de pensamiento e intento suicida, capacitador en el área del mhGAP",
      especialidad: "Lic. Psicología humanista",
      cedula: "11332142"
    },
    {
      nombre: "Guadalupe Piña Diosdado",
      img:"assets/img/equipo/psicologonw3.jpg",
      descripcion: "Especializada en casos de violencia de género. Psicoterapia con perspectiva de género. Enfoque cognitivo conductual. Diplomado en psicología criminal. Diplomado en evaluación Neuropsicológica. Experiencia en atención a adolescentes y adultos, en trastornos del estado de ánimo como ansiedad, depresión, Tr bipolar.",
      especialidad: "Lic, Psicología Humanista",
      cedula: "12314360"
    },
/*
    {
      nombre: "Daniela",
      img: "https://ionicframework.com/docs/img/demos/card-media.png",
      descripcion: "descripcion",
      especialidad: "especialidad",
      cedula: "cedula"
    },

    {
      nombre: "Yolanda 2",
      img: "https://ionicframework.com/docs/img/demos/card-media.png",
      descripcion: "descripcion",
      especialidad: "especialidad",
      cedula: "cedula"
    },
    {
      nombre: "Daniela Macias",
      img: "https://ionicframework.com/docs/img/demos/card-media.png",
      descripcion: "Psicoterapeuta con enfoque integral, especializada en adicciones, psicoeducación y terapia de lenguaje, con diplomado en psicoterapia cognitivo-conductual.",
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

    */
  ];



  constructor() { }

  ngOnInit() {
    return;
  }

}
