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
      img: "assets/img/equipo/psic1.jpg",
      descripcion: "Psicóloga especializada en tutoría y psicoterapia infantil, con experiencia en orientación educativa y apoyo psicológico.",
      especialidad: "Lic. en Psicología, Maestría en Educación con Orientación en Tutoría",
      cedula: "4403100, 13173822"
    },
    {
      nombre: "Andrea Zaragoza",
      img: "assets/img/equipo/psic2.jpg",
      descripcion: "Especialista en TDC, conductas suicidas, primeros auxilios psicológicos y trastornos del ánimo. Ofrece terapias efectivas y personalizadas.",
      especialidad: "Lic. en Psicología",
      cedula: "13802594"
    },
    {
      nombre: "Mariana Hernandez",
      img: "assets/img/equipo/psic3.jpg",
      descripcion: "Psicóloga especializada en Psicoterapia Infantil, intervención en duelo y sexualidad infantil. Comprometida con el bienestar emocional de los niños.",
      especialidad: "",
      cedula: ""
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
  ];
  
  
  
  constructor() { }

  ngOnInit() {
  }

}
