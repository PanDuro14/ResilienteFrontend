import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public isPrivacidadModalOpen = false;

  public icons = [
    { name: 'logo-facebook', url: 'https://www.facebook.com/resilientepsicologia?mibextid=ZbWKwL' },
    { name: 'logo-instagram', url: 'https://www.instagram.com/resilientepsicologia?igsh=cnZueHhpNWlkZ3Fx' },
    { name: 'logo-linkedin', url: 'https://www.linkedin.com' },
    { name: 'logo-youtube', url: 'https://www.youtube.com' },
    { name: 'logo-pinterest', url: 'https://www.pinterest.com' },
    { name: 'logo-owl', url:'/dedicatoria'}
  ];

  constructor(
    private modalController: ModalController,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() { return; }

  /* MODAL DE PRIVACIDAD */
  async openPrivacidadModal() {
    this.isPrivacidadModalOpen = true;
  }

  closePrivacidadModal() {
    this.modalController.dismiss();
  }

  didDismissPrivacidadModal() {
    this.isPrivacidadModalOpen = false;
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
