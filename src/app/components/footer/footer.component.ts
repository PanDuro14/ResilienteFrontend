import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  public icons = [
    { name: 'logo-facebook',  url: 'https://www.facebook.com/PSIC.YOLANDAESPARZA?mibextid=LQQJ4d' },
    { name: 'logo-instagram', url: 'https://www.instagram.com/psic.resiliente_?igsh=Mmk4bWI2ZHd5anJp&utm_source=qr' },
    { name: 'logo-linkedin', url: 'https://www.linkedin.com'},
    { name: 'logo-youtube',  url: 'https://www.youtube.com' },
    { name: 'logo-pinterest',  url: 'https://www.pinterest.com' },
  ];

  constructor() { }


  ngOnInit() {}

}
