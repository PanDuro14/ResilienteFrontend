import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../userService/user-service.service';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any> = new Observable<any>();
  private  userData = new BehaviorSubject(null);

  private adminSubject = new BehaviorSubject<boolean>(false);
  public $admin = this.adminSubject.asObservable();

  errorMessage: any;
  private apiUrl = 'https://backend-resiliente-fly.fly.dev/api/v1/usuario/login';

  superUsuarios = [
    {correo: 'resiliente02@gmail.com'},
    {correo: 'resiliente01@gmail.com'},
    {correo: 'alex.diaz.oad@gmail.com'}
  ]

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    //private userService: UserServiceService,
    private router: Router,
    private storage: Storage,
    private ptl: Platform,
  ) {
    this.ptl.ready().then(() => {
      this.inicializateStorage();
    });
    this.loadStoredToken();
  }

  private async inicializateStorage(){
    await this.storage.create();
  }

  getAdmin(): boolean{
    return this.adminSubject.getValue();
  }

  loadStoredToken(){
    let platformObs = from(this.ptl.ready());
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if(token){
          let decoded = helper.decodeToken(token);
          this.userData.next(decoded);
          console.log('token ready:', decoded);
          return true;
        } else {
          console.log('token false');
          return false;
        }
      })
    )
  };

  async testStorage() {
    try {
      await this.storage.set('test_key', 'test_value');
      const value = await this.storage.get('test_key');
    } catch (error) {
      console.error('Error al probar el Storage', error);
    }
  }

  async login(correo: string, passw: string): Promise<any>{
    try{
      const response = await this.http.post<any>(`${environment.apiUrl}/usuario/login`, {correo, passw}).toPromise();
      //console.log('Respuesta de la api', response);

      if(response && response.token){
        const token = response.token;
        const decoded = helper.decodeToken(token);

        //Almacenar el token y los datos del usuario;
        await this.storage.set(TOKEN_KEY, token);
        this.userData.next(decoded);

        //super usuario:
        const isSuperUser = this.superUsuarios.some(user => user.correo === correo);
        this.adminSubject.next(isSuperUser);

        return { success: true, data: response.result, token: response.token};
      } else {
        return { success: false};
      }
    } catch(error){
      console.error('Error al proceso de iniciar sesión', error);
      throw error;
    }
  }

  getUse(){
    return this.userData.asObservable();
  }

  async logout(){
    try{
      await this.storage.remove(TOKEN_KEY);
      this.userData.next(null);
      await this.afAuth.signOut();
      console.log('Sesión cerrada');

      window.location.reload();
    } catch(error: any){
      console.error('Error al cerrar la sesión', error);
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      const data = res.user;
      if (data) {
        //this.user = data;
        console.log(data);
        console.log("Inicio de sesión exitoso con Google");
      }
    } catch (error: any) {
      this.errorMessage = error.message;
      console.error('Error al iniciar sesión con Google', error);
      throw error;
    }
  }


  // Método para verificar el correo electrónico
  async verifyEmail() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.sendEmailVerification();
        console.log('Correo de verificación enviado');
      } else {
        console.error('Usuario no autentificado');
      }
    } catch (error: any) {
      this.errorMessage = error.message;
      console.error('Error al enviar correo de verificación', error);
      throw error;
    }
  }

  // Método para restablecer la contraseña
  async resetPass(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo de restauración enviado');
    } catch (error: any) {
      this.errorMessage = error.message;
      console.error('Error al enviar correo de restauración', error);
      throw error;
    }
  }


}
