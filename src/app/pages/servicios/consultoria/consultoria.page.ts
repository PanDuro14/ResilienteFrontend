import { Component, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-consultoria',
  templateUrl: './consultoria.page.html',
  styleUrls: ['./consultoria.page.scss'],
})
export class ConsultoriaPage implements OnInit {
  public isCursosModalOpen = false;

  constructor(
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController
  ) { }

  public cursos = [
    { titulo: "Estrategias de Carga Laboral", desc: "Descubre cómo analizar y equilibrar cargas de trabajo, priorizar tareas y usar tecnología para una gestión más eficaz. ¡Optimiza el rendimiento de tu equipo!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/pdf/cursos/estrategias-de-carga-laboral.pdf" },
    { titulo: "Trabajo Colaborativo (Habilidades Laborales)", desc: "Mejora la cooperación y eficacia en equipos con técnicas de comunicación, resolución de conflictos y toma de decisiones. ¡Lleva tu equipo al siguiente nivel!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/img/cursos/trabajo-colaborativo.webp" },
    { titulo: "Prevención de Factores de Riesgo Psicosociales", desc: "Aprende a identificar y mitigar los riesgos Psicosociales y el síndrome de Burnout en el trabajo. ¡Mejora el bienestar y la productividad de tu equipo!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/pdf/cursos/prevencion-de-factores-de-riesgos-psicosociales.pdf" },
    { titulo: "Equipos de Trabajo de Alto Desempeño", desc: "Forma y lidera equipos de alto rendimiento con estrategias de liderazgo efectivo, comunicación y motivación. ¡Alcanza la eficiencia máxima con tu equipo!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/img/cursos/equipos-de-trabajo-de-alto-desempeño.webp" },
    { titulo: "Manejo del Estrés Laboral", desc: "Domina las técnicas para identificar, comprender y gestionar el estrés laboral. ¡Mejora tu bienestar emocional y rendimiento profesional!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/pdf/cursos/manejo-del-estres-laboral.pdf" },
    { titulo: "Inteligencia Emocional en el Ámbito Laboral", desc: "Descubre cómo la inteligencia emocional puede transformar las relaciones laborales y aumentar la productividad. ¡Crea un ambiente de trabajo positivo y colaborativo!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/img/cursos/inteligencia-emocional-en-el-ambito-laboral.webp" },
    { titulo: "Servicio y Atención al Cliente", desc: "Adquiere habilidades para ofrecer un servicio al cliente excepcional, manejando quejas y creando experiencias positivas. ¡Fomenta la lealtad y satisfacción de tus clientes!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/pdf/cursos/servicio-y-atencion-al-cliente.pdf" },
    { titulo: "Pruebas Psicométricas", desc: "Mejora la selección de personal y gestión de talento con nuestras soluciones de evaluación Psicométricas de alta calidad. ¡Descubre más con nuestras pruebas personalizadas!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/img/cursos/pruebas-psicometricas.webp" },
    { titulo: "Tutoría en Educación Superior", desc: "Desarrolla competencias para un diagnóstico, plan de acción tutorial y evaluación de la tutoría efectiva. ¡Optimiza la acción tutorial en educación superior!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/pdf/cursos/tutoria-en-educacion-superior.pdf" },
    { titulo: "Orientación Vocacional", desc: "Recibe asesoría para la elección de carrera profesional basada en tus intereses y habilidades. ¡Encuentra la carrera que se adapta a ti!", img: "https://ionicframework.com/docs/img/demos/card-media.png", link: "assets/img/cursos/orientacion-vocacional.webp" }
  ];


  ngOnInit() {
  }


  async openCursosModal() {
    this.isCursosModalOpen = true;
  }

  closeCursosModal() {
    this.modalCtrl.dismiss();
  }

  didDismissCursosModal() {
    this.isCursosModalOpen = false;
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
