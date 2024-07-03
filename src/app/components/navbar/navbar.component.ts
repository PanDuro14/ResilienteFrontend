import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
  public icons = [
    { name: 'logo-instagram', url: 'https://www.instagram.com' },
    { name: 'logo-youtube',  url: 'https://www.youtube.com' },
    { name: 'logo-pinterest',  url: 'https://www.pinterest.com' },
    { name: 'logo-tiktok',  url: 'https://www.tiktok.com' },
    { name: 'logo-facebook',  url: 'https://www.facebook.com' },
  ];

  constructor() { }

  ngOnInit() {}

}
