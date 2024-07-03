import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

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
