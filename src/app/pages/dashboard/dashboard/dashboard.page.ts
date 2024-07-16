import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public pruebas = [
    {
      userName: "AlanG",
      nombre: "Alan Yahir Garcia Bernal",
      fecha: "11-06-2023",
      tel: "4491889548",
      correo: "alangaber11@gmail.com",
      cita: "Presencial",
      psicologo: "***",
      horario: "Vespertino"
    },
    {
      userName: "YahirB",
      nombre: "Alan Yahir Garcia Bernal",
      fecha: "11-06-2023",
      tel: "4491889548",
      correo: "alangaber11@gmail.com",
      cita: "Presencial",
      psicologo: "***",
      horario: "Matutino"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
