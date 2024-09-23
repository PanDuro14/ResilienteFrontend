import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dedicatoria',
  templateUrl: './dedicatoria.page.html',
  styleUrls: ['./dedicatoria.page.scss'],
})
export class DedicatoriaPage implements OnInit {
  public ella=[
    {nombre: 'ella', img:"assets/img/dedicatoria/ella.jpg"}
  ]
  constructor() { }

  ngOnInit() {
    return;
  }

}
