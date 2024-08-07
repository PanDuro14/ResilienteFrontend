import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {
  private apiUrl = '${enviroment.apiUrl}/consultorios'; 

  constructor(private http: HttpClient) { }

  checkDisponibilidad(fecha: string, horario: string): Observable<any> {
    return this.http.get(''); 
  }
}
