import { Component, OnInit } from '@angular/core';
import { ConsultorioService } from 'src/app/services/consultorio/consultorio.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
})
export class CitaComponent implements OnInit {
  public isCitaModalOpen = false;
  public isCitaMode = false;

  public checkConsultorioValue: Boolean = false;
  public pacienteExist: Boolean = false;
  captchaResolved: boolean = false;

  public formPaciente: FormGroup;
  public formCita: FormGroup;

  private allPacientes: any[] = [];
  public allCitas: any[] = [];
  public cita: any;

  public serviciosPsicologia = [
    {tipo: "Atención para niños",           tipocita:'ninos'},
    {tipo: "Atención para adolescentes",    tipocita: 'adolescentes'},
    {tipo: "Atención para adultos",         tipocita: 'adultos' },
    {tipo: "Atención para adultos mayores", tipocita: 'adultos'},
    {tipo: "Psicoterapia de pareja",        tipocita: 'adultos'},
    {tipo: "Acompañamiento tanatológico",   tipocita: 'adultos'},
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
    private consultorio: ConsultorioService,
    private http: HttpClient,
    private fb: FormBuilder,
    private modalController: ModalController,
    private animationCtrl: AnimationController,
  ) {
    this.formPaciente = this.fb.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      numero_contacto: ['', Validators.required],
      contacto_tutor: ['', Validators.required],
      comentarios: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      cp: ['', Validators.required],
      municipio_estado_pais: ['', Validators.required],
    });
    this.formCita = this.fb.group({
      nombrecompleto: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      tipocita: ['', Validators.required],
      modalidad: ['', Validators.required],
      fecha: ['', Validators.required],
      horario: ['', Validators.required],
      psicologo: ['', Validators.required],
      cuentanosdeti: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.consultorio.resetDailyCapacity();
    this.getAllCitas();
  }

  getAllCitas() {
    try {
      this.http.get<any>('https://backend-resiliente.fly.dev/api/v1/cita').subscribe((data) => {
        this.allCitas = data;
        return this.cita = this.allCitas;
      });
    } catch (error) {
      console.log('error al obtener las citas');
    }
  }

  createPaciente(){
    if(this.formPaciente.valid){
      const nuevoPaciente = {
        nombre: this.formPaciente.value.nombre,
        genero: this.formPaciente.value.genero,
        tipo: this.formPaciente.value.tipo,
        fecha_nacimiento: this.formPaciente.value.fecha_nacimiento,
        status: this.formPaciente.value.status,
        numero_contacto: this.formPaciente.value.numero_contacto,
        comentarios: this.formPaciente.value.comentarios,
        calle: this.formPaciente.value.calle,
        numero: this.formPaciente.value.numero,
        colonia: this.formPaciente.value.colonia,
        cp: this.formPaciente.value.cp,
        municipio_estado_pais: this.formPaciente.value.municipio_estado_pais,
      }
      const paciente = this.getOnePaciente(nuevoPaciente.nombre);
      if(paciente === nuevoPaciente.nombre){
        this.pacienteExist = true;
        console.log('El paciente ya existe :D ');
      } else {
        this.http.post<any>('https://backend-resiliente.fly.dev/api/v1/paciente', nuevoPaciente).subscribe((Response) => {
          console.log(Response);
        });
      }
    }
  }

  async crearCita() {
    if (this.formCita.valid && this.pacienteExist===true) {
      const nuevaCita = {
        nombrecompleto: this.formCita.value.nombrecompleto,
        correo: this.formCita.value.correo,
        telefono: this.formCita.value.telefono,
        tipocita: this.formCita.value.tipocita,
        fecha: this.formCita.value.fecha,
        horario: this.formCita.value.horario,
        psicologo: this.formCita.value.psicologo,
        cuentanosdeti: this.formCita.value.cuentanosdeti,
      };
      const modalidad = this.formCita.value.modalidad;
      const disponibilidad = this.checkConsultorio(
        nuevaCita.tipocita,
        modalidad,
        nuevaCita.fecha,
        nuevaCita.horario
      );

      if (disponibilidad) {
        console.log(disponibilidad);

        this.http.post<any>('https://backend-resiliente.fly.dev/api/v1/cita', nuevaCita).subscribe((response) => {
          console.log(response);
        });
      } else {
        console.log('No hay consultorio disponibles');
      }
    }
  }

  getPacientes(){
    this.http.get<any>('https://backend-resiliente.fly.dev/api/v1/paciente').subscribe((Response) => {
      this.allPacientes = Response;
    }, (error) =>{
      console.log('Error al obtener pacientes', error);
    });
  }

  getOnePaciente(nombreCompleto: string){
    const paciente = this.allPacientes.find((p) => p.nombre_completo === nombreCompleto);
    return paciente ? paciente: null;
  }


  checkConsultorio(tipocita: string, modalidad: 'presencial' | 'online', fecha: string, horario: 'matutino' | 'tarde'): boolean | null {
    const fechaExist = this.allCitas.filter((cita) => cita.fecha === fecha && cita.horario === horario);

    // 1. Niños en modalidad presencial, siempre en consultorio 3
    if (tipocita === 'ninos' && modalidad === 'presencial') {
      const citasConsultorio3 = fechaExist.filter((cita) => cita.consultorioId === 3);

      if (citasConsultorio3.length >= 2) {
        console.log('El consultorio 3 no tiene más disponibilidad para esa fecha y horario.')
        return this.checkConsultorioValue = false;
      }
      console.log('Disponibilidad en el consultorio 3');
      return this.checkConsultorioValue = true;
    }

    // 2. Modalidad online, siempre en consultorio 4
    if (modalidad === 'online') {
      if (tipocita === 'ninos') {
        console.log('No se permiten citas para niños en modalidad online.');
        return this.checkConsultorioValue=false;
      }
      const citasConsultorio4 = fechaExist.filter((cita) => cita.consultorioId === 4);

      if (citasConsultorio4.length >= 2) {
        console.log('El consultorio 4 no tiene más disponibilidad para esa fecha y horario.');
        return this.checkConsultorioValue = false;
      }
      console.log('Disponibilidad en el consultorio 4');
      return this.checkConsultorioValue = true;
    }

    // 3. Adultos o adolescentes, en consultorio 1 o 2
    if (tipocita === 'adultos' || tipocita === 'adolescentes') {
      const consultoriosDisponibles = [1, 2];

      for (let i = 0; i < consultoriosDisponibles.length; i++) {
        const consultorioId = consultoriosDisponibles[i];
        const citasConsultorio = fechaExist.filter((cita) => cita.consultorioId === consultorioId);

        if (citasConsultorio.length < 2) {
          console.log(`Disponibilidad en el consultorio ${i}`);
          return this.checkConsultorioValue = true;
        }
      }
      console.log(`No hay disponibilidad en el consultorio 1 o 2 para esa fecha y horario`);
      return this.checkConsultorioValue = false;
    }
    console.log('No se encontró un consultorio disponible para los criterios proporcionados.');
    return this.checkConsultorioValue = false;
  }

  onCaptchaResolved(captchaResponse: string) {
    console.log('Captcha resuelto con respuesta: ', captchaResponse);
    this.captchaResolved = true;  // Activa la validación de CAPTCHA
  }


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

