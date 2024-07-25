import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private userDataSubject = new BehaviorSubject<any>(null); 
  private userSesionSubject = new BehaviorSubject<any>(null); 

  userData$ = this.userDataSubject.asObservable(); 
  userSesion$ = this.userSesionSubject.asObservable(); 

  constructor() { }
  setCurrentSesion(userSesion: any){
    this.userDataSubject.next(userSesion); 
  }

  setUserData(userData: any){
    this.userDataSubject.next(userData); 
  }

  getUserData(){
    return this.userDataSubject.value; 
  }

  getCurrentSesion(){
    return this.userSesionSubject.value; 
  }
}
