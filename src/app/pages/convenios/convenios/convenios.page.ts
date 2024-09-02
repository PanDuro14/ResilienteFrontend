import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.page.html',
  styleUrls: ['./convenios.page.scss'],
})
export class ConveniosPage implements OnInit {
  public allColabs: any = [];
  public slides = [
    { name: "Slide 1", img: "assets/gif/gif1.gif" }
  ];

  public imgsCon = [
    { name: 'Img1', img: "assets/logo2.png" }
  ];


  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getAllColabs();
  }

  // colaboradores
  getAllColabs():void {
    this.http.get<any[]>('https://backend-resiliente.fly.dev/api/v1/colab').subscribe(
      Response => {
        this.allColabs = Response;
      },
      error => {
        console.error('Dashboard: Error al obtener las colaboraciones', error);
      }
    );
  }

  openUrl(url: string) {
    window.open(url, '_blank');
  }

}
