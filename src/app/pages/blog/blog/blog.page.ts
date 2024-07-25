import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  public isAgBlogModalOpen = false;

  public blogs = [
    { tema: "Blog 1", fecha: "21 de Julio del 2024", img:"https://ionicframework.com/docs/img/demos/card-media.png" },
    { tema: "Blog 2", fecha: "22 de Julio del 2024", img:"https://ionicframework.com/docs/img/demos/card-media.png" },
    { tema: "Blog 3", fecha: "23 de Julio del 2024", img:"https://ionicframework.com/docs/img/demos/card-media.png" },
    { tema: "Blog 4", fecha: "24 de Julio del 2024", img:"https://ionicframework.com/docs/img/demos/card-media.png" },

  ];

  constructor(private modalCtrl: ModalController, private animationCtrl: AnimationController) { }

  ngOnInit() {
  }

    /* MODAL DE BLOG */
    async openAgBlogModal() {
      this.isAgBlogModalOpen = true;
    }
  
    closeAgBlogModal() {
      this.modalCtrl.dismiss();
    }
  
    didDismissAgBlogModal() {
      this.isAgBlogModalOpen = false;
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
