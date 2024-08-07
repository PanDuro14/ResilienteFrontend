import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, Validator, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { AlertController, AnimationController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public isEditCitaOpenModal = false; 
  public allcitas: any[] = [];
  edidForm: FormGroup; 
  selectedCitaId: number | null = null; 

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private alertController: AlertController,
    private modalCtrl: ModalController, 
    private animationCtrl: AnimationController,
  ) {    
    this.edidForm = this.fb.group({
      nombrecompleto: ['', [Validators.required]], 
      correo: ['', [Validators.required]], 
      telefono: ['', [Validators.required]], 
      tipocita: ['', [Validators.required]], 
      fecha: ['', [Validators.required]], 
      horario: ['', [Validators.required]], 
      psicologo: ['', [Validators.required]], 
      cuentanosdeti: ['', [Validators.required]]
    }); 
  }

  ngOnInit() {
    this.getAllCitas();
  }

  getAllCitas(): void {
    this.http.get<any[]>('https://backend-resiliente.fly.dev/api/v1/cita').subscribe(
      response => {
        this.allcitas = response;
        console.log('All citas: ', this.allcitas);
      },
      error => {
        console.error('Dashboard: Error al obtener las citas ', error);
      }
    );
  }

  editCita(cita: any){
    this.selectedCitaId = cita.id; 
    this.edidForm. patchValue({
      nombrecompleto: cita.nombrecompleto,
      correo: cita.correo,
      telefono: cita.telefono,
      tipocita: cita.tipocita,
      fecha: cita.fecha,
      horario: cita.horario,
      psicologo: cita.psicologo,
      cuentanosdeti: cita.cuentanosdeti
    }); 
  }

  updateCita(){
    if (this.edidForm.valid && this.selectedCitaId !== null){
      const updatedCita = this.edidForm.value; 
      this.http.put(`https://backend-resiliente.fly.dev/api/v1/cita/${this.selectedCitaId}`, updatedCita).subscribe(
        Response => {
          console.log('Cita actualizada: ', Response); 
          this.getAllCitas(); 
          this.edidForm.reset(); 
          this.selectedCitaId = null; 
        }, 
        error => {
          console.error('Error al actualizar la cita ', error); 
        }
      ); 
    } else {
      console.error('Formulario no valido o no hay cita seleccionada'); 
    }
  }

  async presentAlert(message: string){
    const alert = await this.alertController.create({
      header: 'Error', 
      message: message, 
      buttons: ['Ok']
    }); 
    await alert.present(); 
  }

  async OpenEditCita(){
    this.isEditCitaOpenModal = true; 
  }

  closeEditCita(){
    this.modalCtrl.dismiss(); 
  }

  didDismissEditCita(){
    this.isEditCitaOpenModal = false;
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

