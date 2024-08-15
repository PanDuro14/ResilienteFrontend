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
  public allColabs: any[] = []; 
  createColabForm: FormGroup; 
  editForm: FormGroup; 
  editColabForm: FormGroup; 
  selectedCitaId: number | null = null; 
  selectedColabId: number | null = null; 
  private selectedFile: File | null = null;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private alertController: AlertController,
    private modalCtrl: ModalController, 
    private animationCtrl: AnimationController,
  ) {    
    this.editForm = this.fb.group({
      nombrecompleto: ['', [Validators.required]], 
      correo: ['', [Validators.required]], 
      telefono: ['', [Validators.required]], 
      tipocita: ['', [Validators.required]], 
      fecha: ['', [Validators.required]], 
      horario: ['', [Validators.required]], 
      psicologo: ['', [Validators.required]], 
      cuentanosdeti: ['', [Validators.required]]
    }); 

    this.createColabForm = this.fb.group({
      acronimo: ['', [Validators.required]],
      nombre_comercial: ['', [Validators.required]],
      url: ['', [Validators.required]],
      logotipo: ['null']
    }); 

    this.editColabForm = this.fb.group({
      acronimo: ['', [Validators.required]],
      nombre_comercial: ['', [Validators.required]],
      url: ['', [Validators.required]],
      logotipo: ['null']
    })
  }

  ngOnInit() {
    this.getAllCitas();
    this.getAllColabs(); 
  }

  getAllCitas(): void {
    this.http.get<any[]>('https://backend-resiliente.fly.dev/api/v1/cita').subscribe(
      response => {
        this.allcitas = response;
        //console.log('All citas: ', this.allcitas);
      },
      error => {
        console.error('Dashboard: Error al obtener las citas ', error);
      }
    );
  }

  editCita(cita: any){
    this.selectedCitaId = cita.id; 
    this.editForm.patchValue({
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
    if (this.editForm.valid && this.selectedCitaId !== null){
      const updatedCita = this.editForm.value; 
      this.http.put(`https://backend-resiliente.fly.dev/api/v1/cita/${this.selectedCitaId}`, updatedCita).subscribe(
        Response => {
          console.log('Cita actualizada: ', Response); 
          this.getAllCitas(); 
          this.editForm.reset(); 
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


  // colabs
  getAllColabs(): void{
    this.http.get<any[]>('https://backend-resiliente.fly.dev/api/v1/colab').subscribe(
      Response => {
        this.allColabs = Response; 
      }, 
      error => {
        console.error('Dashboard: Error al obtener las colaboraciones', error); 
      }
    ); 
  }

  crearColab(){
    if (this.createColabForm.valid){
      const formData = new FormData(); 
      formData.append('acronimo', this.createColabForm.get('acronimo')?.value);
      formData.append('nombre_comercial', this.createColabForm.get('nombre_comercial')?.value);
      formData.append('url', this.createColabForm.get('url')?.value);
      if(this.selectedFile){
        formData.append('logotipo', this.selectedFile); 
      }
      this.http.post('https://backend-resiliente.fly.dev/api/v1/colab', formData).subscribe(Response =>{
        console.log('colaborador agregado', Response); 
        this.getAllColabs(); 
        this.createColabForm.reset(); 
      }, 
      error => {
        console.error('Error al crear un colaborador', error);
        this.presentAlert('Error al crear un colaborador'); 
      }); 
    } else {
      this.presentAlert('Formulario no válido'); 
    }
  }

  editColab(colab: any){
    this.selectedColabId = colab.id; 
    this.editColabForm.patchValue({
      acronimo: colab.acronimo, 
      nombre_comercial: colab.nombre_comercial, 
      url: colab.url, 
      logotipo: colab.logotipo
    }); 
  }

  updateColab(){
    if (this.editColabForm.valid && this.selectedColabId !== null) {
      const formData = new FormData();
      formData.append('acronimo', this.editColabForm.get('acronimo')?.value);
      formData.append('nombre_comercial', this.editColabForm.get('nombre_comercial')?.value);
      formData.append('url', this.editColabForm.get('url')?.value);
      if(this.selectedFile) {
        formData.append('logotipo', this.selectedFile);
      }
  
      this.http.patch(`https://backend-resiliente.fly.dev/api/v1/colab/${this.selectedColabId}`, formData).subscribe(
        response => {
          console.log('Colaboración actualizada:', response);
          this.getAllColabs();
          this.editColabForm.reset();
          this.selectedColabId = null;
        },
        error => {
          console.error('Error al actualizar la colaboración', error);
          this.presentAlert('Error al actualizar la colaboración');
        }
      );
    } else {
      this.presentAlert('Formulario no válido o no hay colaboración seleccionada');
    }
  }

  async deleteColab(colab: any) {
    if (colab && colab.id) {
      this.selectedColabId = colab.id;
      const alert = await this.alertController.create({
        header: 'Confirmar Eliminación',
        message: `¿Estás seguro de que quieres eliminar al colaborador ${colab.acronimo}?`,
        cssClass: 'custom-alert', // Aplica tu clase personalizada aquí
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'alert-button-secondary', // Estilo para el botón secundario
            handler: () => {
              console.log('Eliminación cancelada');
            }
          },
          {
            text: 'Eliminar',
            cssClass: 'alert-button', // Estilo para el botón principal
            handler: () => {
              this.performDelete();
            }
          }
        ]
      });
      await alert.present();
    } else {
      console.error('No hay colaborador seleccionado');
      this.presentAlert('No hay colaborador seleccionado');
    }
  }
  
  performDelete() {
    this.http.delete(`https://backend-resiliente.fly.dev/api/v1/colab/${this.selectedColabId}`).subscribe(
      response => {
        console.log('Colaborador eliminado', response);
        this.getAllColabs(); 
        this.selectedColabId = null;
      }, 
      error => {
        console.error('Error al eliminar el colaborador', error);
        this.presentAlert('Error al eliminar el colaborador');
      }
    );
  }
  
  handleImageError(event: any){
    console.error('Image loading error', event); 
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

