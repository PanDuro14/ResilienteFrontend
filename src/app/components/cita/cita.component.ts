import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router'; 
import { filter } from 'rxjs';

// imports de métodos 
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validator, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
})
export class CitaComponent implements OnInit {
  public isCitaModalOpen = false;
  public isCitaMode = false;
  public pacienteExist: boolean = false; 
  public nombreCompleto = ''; 

  formPaciente: FormGroup; 
  formCita: FormGroup; 
  errorMessage: string = ''; 

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
    {nombre: "Daniela Macias"},
    {nombre: "Victoria Díaz"},

  ];

  constructor(
    private modalController: ModalController, 
    private animationCtrl: AnimationController, 
    private router: Router,
    private http: HttpClient,    
    private fb: FormBuilder, 
    private alertController: AlertController,  
  ) { 
    this.formCita = this.fb.group({
      username: [''],
      nombrecompleto: ['', [Validators.required]], 
      correo: ['', [Validators.required, Validators.email]], 
      telefono: ['', [Validators.required, Validators.maxLength(10)]], 
      tipocita: ['', [Validators.required]], 
      fecha: ['', [Validators.required]],
      horario: ['', [Validators.required]], 
      psicologo: [''], 
      cuentanosdeti: ['', [Validators.required]]
    });     
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required]], 
      genero: ['', [Validators.required]], 
      modalidad: ['', [Validators.required]], 
      tipo: ['', [Validators.required]], 
      fecha_nacimiento: ['', [Validators.required]], 
      status: [''], 
      numero_contacto: ['', [Validators.required]], 
      frecuencia_sesiones: ['', [Validators.required]], 
      beca: [''], 
      contacto_tutor: [''], 
      calle: ['', [Validators.required]],
      numero: ['', Validators.required], 
      cp: ['', [Validators.required]], 
      municipio_estado_pais: ['', [Validators.required]]
    }); 
  }

  ngOnInit(): void {       

  }


  // <-- Cita modulo --> 
  // Verificar si existen los pacientes xd 
  async getNombrePaciente(nombre: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>('https://backend-resiliente.fly.dev/api/v1/paciente/nombre/', { nombre }).toPromise();
      return response && response.length > 0;
    } catch (error) {
      console.error('No se pudo obtener el paciente', error);
      return false;
    }
  }

  // Crea un nuevo paciente
  async createPaciente(): Promise<void> {
    const nuevoPaciente = {
      nombre: this.formPaciente.value.nombre,
      genero: this.formPaciente.value.genero,
      modalidad: this.formPaciente.value.modalidad,
      tipo: this.formPaciente.value.tipo,
      fecha_nacimiento: this.formPaciente.value.fecha_nacimiento,
      status: this.formPaciente.value.status,
      numero_contacto: this.formPaciente.value.numero_contacto,
      frecuencia_sesiones: this.formPaciente.value.frecuencia_sesiones,
      beca: this.formPaciente.value.beca,
      contacto_tutor: this.formPaciente.value.contacto_tutor,
      calle: this.formPaciente.value.calle,
      numero: this.formPaciente.value.numero,
      colonia: this.formPaciente.value.colonia,
      cp: this.formPaciente.value.cp,
      municipio_estado_pais: this.formPaciente.value.municipio_estado_pais
    };
    try {
      await this.http.post('https://backend-resiliente.fly.dev/api/v1/paciente', nuevoPaciente).toPromise();
      const data = Response;       
    } catch(error){
      console.error('No se pudo obtener el paciente'); 
    }
  }

  // Crea una nueva cita
  async createCita(): Promise<void> {
    if (this.formCita.valid) {
      const nombrecompleto = this.formCita.value.nombrecompleto;
      this.pacienteExist = await this.getNombrePaciente(nombrecompleto);

      if (!this.pacienteExist) {
        await this.createPaciente();
      }

      const nuevaCita = {
        username: this.formCita.value.username,
        nombrecompleto: this.formCita.value.nombrecompleto,
        correo: this.formCita.value.correo,
        telefono: this.formCita.value.telefono,
        tipocita: this.formCita.value.tipocita,
        fecha: this.formCita.value.fecha,
        horario: this.formCita.value.horario,
        psicologo: "sin asignar",
        cuentanosdeti: this.formCita.value.cuentanosdeti,
      };

      this.http.post('https://backend-resiliente.fly.dev/api/v1/cita', nuevaCita).subscribe(
        () => {
          console.log('Cita creada');
        },
        (error) => {
          console.error('Error al crear la cita', error);
        }
      );
    } else {
      this.errorMessage = 'Debe completar el formulario';
      console.error(this.errorMessage);
    }
  }

  // <-- Paciente modulo -->


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

  showCitaForm() {
    this.isCitaMode = true;
  }
  
  showPersonalesForm() {
    this.isCitaMode = false;
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