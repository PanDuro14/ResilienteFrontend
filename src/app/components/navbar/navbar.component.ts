import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbar = [
    { label: 'Inicio', link: '/home' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Nosotros', link: '/nosotros' },
    { label: 'Servicios', link: '/servicios' },
    { label: 'Blog', link: '#blog' },
    { label: 'Contacto', link: '/contacto' },
    /* { label: 'Login', link: '#login' } */
  ];

  sidebar = [
    { label: 'Inicio', link: '/home', icon: 'assets/icon/navBar/fill/corazon-casero.svg' },
    { label: 'Dashboard', link: '/dashboard', icon: 'assets/icon/navBar/fill/aplicaciones-anadir.svg' },
    { label: 'Nosotros', link: '/nosotros', icon: 'assets/icon/navBar/fill/mano-sosteniendo-corazon.svg' },
    { label: 'Servicios', link: '/servicios', icon: 'assets/icon/navBar/fill/corazon-de-lista-de-deseos.svg' },
    { label: 'Blog', link: '#blog', icon: 'assets/icon/navBar/fill/lapiz-blog.svg' },
    { label: 'Contacto', link: '/contacto', icon: 'assets/icon/navBar/fill/corazon-sobre.svg' }
  ];

  redes = [
    { name: 'logo-facebook', url: 'https://www.facebook.com/resilientepsicologia?mibextid=ZbWKwL' },
    { name: 'logo-instagram', url: 'https://www.instagram.com/resilientepsicologia?igsh=cnZueHhpNWlkZ3Fx' },
    { name: 'logo-linkedin', url: 'https://www.linkedin.com/company/resilientepsicologia/' },
    { name: 'logo-youtube', url: 'https://www.youtube.com' },
    { name: 'logo-pinterest', url: 'https://www.pinterest.com' }
  ];

  sidebarOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
