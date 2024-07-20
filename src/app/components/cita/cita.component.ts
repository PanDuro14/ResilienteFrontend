import { Component, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
})
export class CitaComponent implements OnInit {

  public isCitaModalOpen = false;

  public serviciosPsicologia = [
    {tipo: "Atención para niños"},
    {tipo: "Atención para adolescentes"},
    {tipo: "Atención para adultos"},
    {tipo: "Atención para adultos mayores"},
    {tipo: "Psicoterapia de pareja"},
    {tipo: "Acompañamiento tanatológico"},
  ];

  public serviciosConsultoria = [
    {tipo: "Consultoría empresarial"},
    {tipo: "Cursos y talleres"},
    {tipo: "Conferencias"},
    {tipo: "Orientación vocacional"},
  ];

  public psicologos = [
    {nombre: "Yolanda Esparza"},
    {nombre: "Andrea Zaragoza"},
    {nombre: "Mariana Hernandez"},
    {nombre: "Mariana Lopez"},
    {nombre: "Judith Yañez"},

  ];

  constructor(private modalController: ModalController, private animationCtrl: AnimationController) { }

  ngOnInit() { }


  /* MODAL DE CITA */
  async openCitaModal() {
    this.isCitaModalOpen = true;
  }

  closeCitaModal() {
    this.modalController.dismiss();
  }

  didDismissCitaModal() {
    this.isCitaModalOpen = false;
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