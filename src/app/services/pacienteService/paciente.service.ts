import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  public allPacientes: any = []; 


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllPacientes(); 
  }

  async getAllPacientes(){
    try {
      this.allPacientes = await this.http.get<any>(`${environment.apiUrl}paciente`).toPromise(); 
      console.log('Pacientes obtenidos: ', this.allPacientes); 
    } catch (error) {
      console.error('Error al obtener los pacientes', error); 
    }
  }

  async validarPaciente(pacientes: any) {
    if(this.allPacientes.length > 0){
      if(pacientes.nombre_completo === this.allPacientes[0].nombre_completo){
        return true; 
      } else {
        return false; 
      }
    } else {
      return false;
    }
  }

  
}
