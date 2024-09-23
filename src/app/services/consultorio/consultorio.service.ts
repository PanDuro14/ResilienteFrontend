import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {
  private storageKey = 'consultorios';
  private apiUrl = '${enviroment.apiUrl}/consultorios';

  constructor(private http: HttpClient) {
    if(!localStorage.getItem(this.storageKey)){
      this.initializeConsultorios();
    }
  }



  private initializeConsultorios(){
    const consultorios = [
      {
        id: 1,
        nombre: 'celeste',
        tipo:
          {tipo1:'adolescentes',
            tipo2: 'adultos'},
        modalidad: 'presencial',
        cpd: 6,
        citasUso: 0,
        estado: false,
        lastDateUpdate: new Date(),
      },
      {
        id: 2,
        nombre: 'rosa',
        tipo:
          {tipo1:'adolescentes',
            tipo2: 'adultos'},
        modalidad: 'presencial',
        cpd: 6,
        citasUso: 0,
        estado: false,
        lastDateUpdate: new Date(),
      },
      {
        id: 3,
        nombre: 'Consultorio niños',
        tipo: 'Infantil',
        modalidad: 'presencial',
        cpd: 6,
        citasUso: 0,
        estado: false,
        lastDateUpdate: new Date(),
      },
      {
        id: 4,
        nombre: 'Sala de juntas',
        tipo:
          {tipo1:'adolescentes',
            tipo2: 'adultos'},
        modalidad: 'online',
        cpd: 6,
        citasUso: 0,
        estado: false,
        lastDateUpdate: new Date(),
      }
    ];
    localStorage.setItem(this.storageKey, JSON.stringify(consultorios));
  }

  getConsultorios(): Consultorio[] {
    const consultorios = localStorage.getItem(this.storageKey);
    return consultorios ? JSON.parse(consultorios) : [];
  };

  getConsultorioById(id: number): Consultorio | undefined{
    const consultorios = this.getConsultorios();
    return consultorios.find(c => c.id === id);
  };

  updateConsultorio(id: number, cpd: number, citasUso: number, horario: 'mañana' | 'tarde' ):void{
    const consultorios = this.getConsultorios();
    const consultoriosIndex = consultorios.findIndex(c => c.id === id);

    if(consultoriosIndex !==-1){
      const consultorio = consultorios[consultoriosIndex];

      // Actualizar las variables  de cpd y citasUso;
      consultorio.cpd = cpd-1;
      consultorio.citaUso = citasUso +1;

      if (consultorio.citaUso >= 6 && consultorio.cpd <=0){
        consultorio.estado = false;
      } else {
        consultorio.estado = true;
      };

      consultorio.lastDateUpdate = new Date();
      localStorage.setItem(this.storageKey, JSON.stringify(consultorios));
    }
  }

  resetDailyCapacity(): void {
    const consultorios = this.getConsultorios();
    const today = new Date();

    consultorios.forEach(consultorio =>{
      const lastUpdate = new Date(consultorio.lastDateUpdate);

      if(lastUpdate.toDateString() !== today.toDateString()){
        consultorio.cpd = 6;
        consultorio.citaUso = 0;
        consultorio.estado = true;
        consultorio.lastDateUpdate = today;
      }
    });
    localStorage.setItem(this.storageKey, JSON.stringify(consultorios));
  }

  bookCita(consultorioId: number, horario: 'mañana' | 'tarde'): void {
    const consultorio = this.getConsultorioById(consultorioId);

    if(consultorio){
      if(horario === 'mañana' && consultorio.cpd > 0){
        this.updateConsultorio(consultorioId, consultorio.cpd, consultorio.citaUso, 'mañana');
      } else if (horario === 'tarde' && consultorio.cpd > 0)  {
        this.updateConsultorio(consultorioId, consultorio.cpd, consultorio.citaUso, 'tarde');
      } else {
        console.log('No hay citas disponibles');
      }
    }
  }


}

interface TipoConsultorio{
  tipo1: string;
  tipo2: string;
};

interface Consultorio{
  id: number;
  nombre: string;
  tipo: TipoConsultorio;
  modalidad: string,
  cpd: number,
  citaUso: number,
  estado: boolean,
  lastDateUpdate: Date
};
