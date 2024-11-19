import { Component, OnInit } from '@angular/core';
import { ConsultorioService } from 'src/app/services/consultorio/consultorio.service';
import { PsicologosService } from 'src/app/services/psicologosService/psicologos.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimationController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


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
    private psicologosService: PsicologosService,
    private http: HttpClient,
    private fb: FormBuilder,
    private modalController: ModalController,
    private animationCtrl: AnimationController,
  ) {
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      modalidad: [''], // No definido
      tipo: [''], // No definido
      fecha_nacimiento: ['', [Validators.required]],
      status: [''], // No definido
      numero_contacto: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      frecuencia_sesiones: [''], // No definido
      beca: [''], // No definido
      contacto_tutor: [''],
      comentarios: [''],
      calle: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],  // Código postal de 5 dígitos
      municipio_estado_pais: ['', [Validators.required]],
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
    console.log('Pacientes: ', this.allPacientes);
    this.consultorio.resetDailyCapacity();
    this.getAllCitas();
  }

  getAllCitas() {
    try {
      this.http.get<any>(`${environment.apiUrl}/cita`).subscribe((data) => {
        this.allCitas = data;
        return this.cita = this.allCitas;
      });
    } catch (error) {
      console.log('error al obtener las citas');
      alert('No se pudieron encontrar las citas');
    }
  }

  async createPaciente() {
    if (this.formPaciente.valid) {
      const nuevoPaciente = {
        nombre: this.formPaciente.value.nombre,
        genero: this.formPaciente.value.genero,
        modalidad: 'No definido',
        tipo: 'No definido',
        fecha_nacimiento: this.formPaciente.value.fecha_nacimiento,
        status: 'No definido',
        numero_contacto: this.formPaciente.value.numero_contacto,
        frecuencia_sesiones: 'No definido',
        beca: 'No definido',
        contacto_tutor: this.formPaciente.value.contacto_tutor || 'No definido',
        comentarios: this.formPaciente.value.comentarios || 'No definido',
        calle: this.formPaciente.value.calle,
        numero: this.formPaciente.value.numero,
        colonia: this.formPaciente.value.colonia,
        cp: this.formPaciente.value.cp,
        municipio_estado_pais: this.formPaciente.value.municipio_estado_pais,
      };

      try {
        const pacienteExistente = this.allPacientes.find(
          paciente => paciente.nombre === nuevoPaciente.nombre
        );

        if (pacienteExistente) {
          this.pacienteExist = true;
          console.log('El paciente ya existe');
        } else {
          this.pacienteExist = false;
          this.http.post<any>(`${environment.apiUrl}/paciente`, nuevoPaciente).subscribe((response) => {
            console.log('Paciente creado:', response);
            this.pacienteExist = true; // Ahora ya existe
          });
        }
        console.log('Datos insertados paciente = ', nuevoPaciente);
      } catch (error) {
        console.error('Error al crear el paciente:', error);
      }
    } else {
      console.error('Formulario no válido, paciente no creado');
    }

    console.log(this.formPaciente.controls);
    if (!this.formPaciente.valid) {
      const invalidControls = Object.keys(this.formPaciente.controls).filter(
        key => this.formPaciente.controls[key].invalid
      );
      console.error('Campos inválidos:', invalidControls);
    }
  }




  async crearCita() {
    if (this.formCita.valid && this.pacienteExist === true) {
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

      console.log('Datos insertados para cita = ', nuevaCita);

      const modalidad = this.formCita.value.modalidad;
      const disponibilidad = this.checkConsultorio(
        nuevaCita.tipocita,
        modalidad,
        nuevaCita.fecha,
        nuevaCita.horario
      );

      const psicologoDisponible = this.psicologosService.getDisponibilidad(nuevaCita.fecha, nuevaCita.horario);

      if (disponibilidad.disponible) {
        if (psicologoDisponible.length > 0) {
          nuevaCita.psicologo = psicologoDisponible[0];
          console.log('Psicólogo asignado: ', nuevaCita.psicologo);

          this.http.post<any>(`${environment.apiUrl}/cita`, nuevaCita).subscribe((response) => {
            console.log('Cita creada:', response);
          });
        } else {
          console.log('No hay psicólogos disponibles');
        }
      } else {
        console.log('No hay consultorios disponibles');
      }
    }

  }


  getPacientes(){
    this.http.get<any>(`${environment.apiUrl}/paciente`).subscribe((Response) => {
      this.allPacientes = Response;
    }, (error) =>{
      console.log('Error al obtener pacientes', error);
    });
  }

  async getOnePaciente(nombreCompleto: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/paciente?nombre=${nombreCompleto}`).subscribe(
        (paciente) => {
          if (paciente) {
            this.formPaciente.patchValue(paciente); // Si existe, carga los datos del paciente
            resolve(true); // El paciente existe
          } else {
            resolve(false); // No existe el paciente
          }
        },
        (error) => {
          console.log('Error al buscar paciente', error);
          reject(false);
        }
      );
    });
  }


  getPacienteNombre(nombre: string): boolean | null{
    const currentPaciente = nombre;
    const pacientes = this.allPacientes.find((p) => p.nombre_completo === currentPaciente);
    if (pacientes === currentPaciente){
      return true;
    } else {
      return false;
    }
  }

  checkConsultorio(tipocita: string, modalidad: 'presencial' | 'online', fecha: string, horario: 'matutino' | 'tarde'): { disponible: boolean, consultorio?: number} {
    const fechaExist = this.allCitas.filter((cita) => cita.fecha === fecha && cita.horario === horario);

    // 1. Niños en modalidad presencial, siempre en consultorio 3
    if (tipocita === 'ninos' && modalidad === 'presencial') {
      const citasConsultorio3 = fechaExist.filter((cita) => cita.consultorioId === 3);

      if (citasConsultorio3.length >= 2) {
        console.log('El consultorio 3 no tiene más disponibilidad para esa fecha y horario.')
        return { disponible: false, consultorio: 3};
      }
      console.log('Disponibilidad en el consultorio 3');
      return { disponible: true, consultorio: 3};
    }

    // 2. Modalidad online, siempre en consultorio 4
    if (modalidad === 'online') {
      if (tipocita === 'ninos') {
        console.log('No se permiten citas para niños en modalidad online.');
        return { disponible: false}
      }
      const citasConsultorio4 = fechaExist.filter((cita) => cita.consultorioId === 4);

      if (citasConsultorio4.length >= 2) {
        console.log('El consultorio 4 no tiene más disponibilidad para esa fecha y horario.');
        return { disponible: false, consultorio: 4};
      }
      console.log('Disponibilidad en el consultorio 4');
      return { disponible: true, consultorio: 4};
    }

    // 3. Adultos o adolescentes, en consultorio 1 o 2
    if (tipocita === 'adultos' || tipocita === 'adolescentes') {
      const consultoriosDisponibles = [1, 2];

      for (let i = 0; i < consultoriosDisponibles.length; i++) {
        const consultorioId = consultoriosDisponibles[i];
        const citasConsultorio = fechaExist.filter((cita) => cita.consultorioId === consultorioId);

        if (citasConsultorio.length < 2) {
          console.log(`Disponibilidad en el consultorio ${consultorioId}`);
          return { disponible: true, consultorio: consultorioId};
        }
      }
      console.log(`No hay disponibilidad en el consultorio 1 o 2 para esa fecha y horario`);
      return { disponible: false};
    }
    console.log('No se encontró un consultorio disponible para los criterios proporcionados.');
    return { disponible: false};
  }


  onFechaHoraChange() {
    const fechaControl = this.formCita.get('fecha');
    const horaControl = this.formCita.get('hora');

    if(fechaControl && horaControl){
      const fecha = fechaControl.value;
      const hora = horaControl.value;

      const psicologosDisponibles = this.psicologosService.getDisponibilidad(fecha, hora);
      this.psicologos = psicologosDisponibles;
    } else {
      console.log('Los controles de fecha no están disponibles');
    }
  }

  handleContinue(){
    if(this.formPaciente.valid){
      this.showCitaForm();
      this.createPaciente();
    } else {
      console.error('El formulario del paciente no es válido ');
    }
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
    this.isCitaModalOpen = false;
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

