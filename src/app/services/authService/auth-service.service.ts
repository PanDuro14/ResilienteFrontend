import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserServiceService } from '../userService/user-service.service';
import { Router } from '@angular/router';
;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  userData: any; 
  userSesion: any; 
  errorMessage: any; 
  private apiUrl = 'https://backend-resiliente.fly.dev/api/v1/usuario/login';

  constructor(
    private afAuth: AngularFireAuth, 
    private http: HttpClient, 
    private userService: UserServiceService, 
    private router: Router
  ) {
    // Restore user session on app start
    this.restoreSession();
  }

  private restoreSession() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.userService.setCurrentSesion(token);
      // Optionally, you could validate the token here
      // e.g., send a request to verify token validity
    }
  }

  async login(correo: string, passw: string): Promise<any> {
    try {
      const response = await this.http.post<any[]>(this.apiUrl, { correo, passw }).toPromise();
      console.log('Respuesta del API de login:', response);

      if(response && response.length > 0) {
        const token = response[0].token; // Adjust based on your actual response structure
        localStorage.setItem('authToken', token);
        this.userService.setCurrentSesion(token); 
        return { success: true, data: response[0] }; 
      } else {
        return { success: false }; 
      }
    } catch (error) {
      console.error('Error en el proceso de inicio de sesión', error);
      throw error; 
    }
  }

  async loginWithGoogle() {
    try {
      const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); 
      const user = res.user; 
      if (user) {
        this.userData = user; 
        console.log(user); 
        console.log("Inicio de sesión exitoso con Google");       
      }
    } catch (error: any) {
      this.errorMessage = error.message;
      console.error('Error al iniciar sesión con Google', error);
      throw error; 
    }
  }

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

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('authToken');
      this.userData = null;
      this.userService.setUserData(null); 
      this.userService.setCurrentSesion(null); 
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  async checkAuthState() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user; 
        this.userService.setUserData(user); 

      } else {
        this.userData = null; 
        this.userService.setCurrentSesion(null);
        this.userService.setUserData(null); 
      }
    }); 
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Example of how you might include the token in a request
  exampleApiCall() {
    return this.http.get('https://example.com/api/some-endpoint', { headers: this.getAuthHeaders() });
  }
}
