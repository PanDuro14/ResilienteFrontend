import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  public icons = [
    { name: 'logo-facebook',  url: 'https://www.facebook.com/PSIC.YOLANDAESPARZA?mibextid=LQQJ4d' },
    { name: 'logo-instagram', url: 'https://www.instagram.com/psic.resiliente_?igsh=Mmk4bWI2ZHd5anJp&utm_source=qr' },
    { name: 'logo-linkedin', url: 'https://www.linkedin.com'},
    { name: 'logo-youtube',  url: 'https://www.youtube.com' },
    { name: 'logo-pinterest',  url: 'https://www.pinterest.com' },
  ];

  public nav = [
    { link: '/home', icon: 'home', label: 'Home', style: {} },
    { link: '/nosotros', icon: 'people', label: 'Nosotros', style: { 'margin-right': '35px' } },
    { link: '/servicios', icon: 'list', label: 'Servicios', style: { 'margin-left': '35px' } },
    { link: '/contacto', icon: 'mail', label: 'Contacto', style: {} }
  ];

  constructor() { }

  ngOnInit() {}

}
