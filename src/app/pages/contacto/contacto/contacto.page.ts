import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  public numeros = [
    {numero: "4494638088"},
    {numero: "4495669242"},
];

public redes = [
  { icon: "logo-facebook", nombre: "Resiliente", link: "https://www.facebook.com/resilientepsicologia?mibextid=ZbWKwL"},
  { icon: "logo-instagram", nombre: "@resilientepsicologia", link: "https://www.instagram.com/resilientepsicologia?igsh=cnZueHhpNWlkZ3Fx"},
  { icon: 'logo-linkedin', nombre: "Resiliente Psicología y Consultoría", link: 'https://www.linkedin.com/company/resilientepsicologia/'},
  { icon: 'logo-youtube', nombre: "Youtube",  link: 'https://www.youtube.com' },
  { icon: 'logo-pinterest', nombre: "Pinterest",  link: 'https://www.pinterest.com' },
];

public correos = [
  { mail: "psic.resiliente@gmail.com" },
  { mail: "alex.diaz.oad@gmail.com" },
];


  constructor() { }

  ngOnInit() {
  }

}
