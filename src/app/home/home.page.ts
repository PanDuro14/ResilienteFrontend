import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public cards = [
    { titulo: 'Terapia', class: 'card-terapia' },
    { titulo: 'Congresos', class: 'card-congresos' },
    { titulo: 'Consultoría', class: 'card-consultoria' },
  ]
  constructor() { }

}
