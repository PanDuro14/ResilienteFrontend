import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsicologosService {

  private apiUrl = `${environment.apiUrl}/psicologos`;

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de psicólogos desde la API
  getPsicologos(): Observable<Psicologo[]> {
    return this.http.get<Psicologo[]>(`${this.apiUrl}`);
  }

  // Método para agregar un psicólogo
  addPsicologo(psicologo: Psicologo): Observable<Psicologo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Psicologo>(this.apiUrl, psicologo, { headers });
  }

  // Método para obtener la disponibilidad de psicólogos para una fecha y horario específico
  getDisponibilidad(fecha: string, horario: string): Psicologo[] {
    const diaSemana = this.getDiaSemana(fecha);

    // Filtrar psicólogos internos que atienden en ese día y horario
    return this.initializePsicologos().filter(psicologo =>
      psicologo.diasAtencion.includes(diaSemana) &&
      psicologo.horariosDisponibles.includes(horario) &&
      psicologo.pertenece === 'interno' // Si solo quieres los internos
    );
  }

  // Función auxiliar para convertir una fecha a un día de la semana
  private getDiaSemana(fecha: string): string {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date(fecha);
    return dias[date.getDay()];
  }

  // Método para inicializar algunos psicólogos de ejemplo (puedes sustituir este método por una llamada a la API si los psicólogos vienen del backend)
  private initializePsicologos(): Psicologo[] {
    const psicologos: Psicologo[] = [
      {
        id: 1,
        nombre: 'Yolanda Esparza',
        diasAtencion: ['Lunes', 'Miércoles', 'Viernes'],
        horariosDisponibles: ['10:00', '12:00', '14:00'],
        pertenece: 'interno'
      },
      {
        id: 2,
        nombre: 'Andrea Zaragoza ',
        diasAtencion: ['Martes', 'Jueves'],
        horariosDisponibles: ['11:00', '13:00', '15:00'],
        pertenece: 'interno'
      },
      {
        id: 3,
        nombre: 'Mariana Hernandez',
        diasAtencion: ['Lunes'],
        horariosDisponibles: ['11:00'],
        pertenece: 'interno'
      },
      {
        id: 4,
        nombre: 'Salvador Rubalcava',
        diasAtencion: ['Lunes'],
        horariosDisponibles: ['11:00'],
        pertenece: 'interno'
      },
      {
        id: 5,
        nombre: 'Nestor Calderon',
        diasAtencion: ['Lunes'],
        horariosDisponibles: ['11:00'],
        pertenece: 'interno'
      },
      {
        id: 6,
        nombre: 'Guadalupe Pina',
        diasAtencion: ['Lunes'],
        horariosDisponibles: ['11:00'],
        pertenece: 'interno'
      },
    ];
    return psicologos;
  }
}

interface Psicologo {
  id: number;
  nombre: string;
  diasAtencion: string[];
  horariosDisponibles: string[];
  pertenece: string;
}
