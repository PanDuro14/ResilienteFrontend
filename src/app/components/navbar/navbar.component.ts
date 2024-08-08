import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController, ModalController, IonPopover } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// imports para formularios; 
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

// imports de servicios 
import { AuthService } from 'src/app/services/authService/auth-service.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('serviciosPopover', { static: false }) serviciosPopover!: IonPopover;

  public isLoginModalOpen = false;
  public isSignUpMode = false;

  failedLoginAttemps: number = 0; 

  allUsers: any[] = []; 
  userSesion: any; 
  userData: any; 

  formSingup: FormGroup; 
  formLogin: FormGroup; 

  errorMessage: string = '';
  passwordFieldType: string = 'password';

  navbar = [
    { label: 'Inicio', link: '/home' },
    { label: 'Nosotros', link: '/nosotros' },
    { label: 'Servicios' },
    { label: 'Blog', link: '/blog' }, 
    { label: 'Contacto', link: '/contacto' },
    //{ label: 'Dashboard', link: '/dashboard' },
  ];

  sidebar = [
    { label: 'Inicio', link: '/home', icon: 'assets/icon/navBar/fill/home.svg' },
    { label: 'Nosotros', link: '/nosotros', icon: 'assets/icon/navBar/fill/nosotros.svg' },
    { label: 'Servicios', link: '/servicios', icon: 'assets/icon/navBar/fill/servicios.svg' },
    { label: 'Blog', link: '/blog', icon: 'assets/icon/navBar/fill/blog.svg' },
    { label: 'Contacto', link: '/contacto', icon: 'assets/icon/navBar/fill/contacto.svg' },
    { label: 'Dashboard', link: '/dashboard', icon: 'assets/icon/navBar/fill/dashboard.svg' },
  ];

  redes = [
    { name: 'logo-facebook', url: 'https://www.facebook.com/resilientepsicologia?mibextid=ZbWKwL' },
    { name: 'logo-instagram', url: 'https://www.instagram.com/resilientepsicologia?igsh=cnZueHhpNWlkZ3Fx' },
    { name: 'logo-linkedin', url: 'https://www.linkedin.com/company/resilientepsicologia/' },
    { name: 'logo-youtube', url: 'https://www.youtube.com' },
    { name: 'logo-pinterest', url: 'https://www.pinterest.com' }
  ];

  sidebarOpen = false;

  constructor(
    private modalController: ModalController,
    private animationCtrl: AnimationController,
    private router: Router,
     
    private userService: UserServiceService, 
    private authService: AuthService,
    private http: HttpClient,    
    private fb: FormBuilder, 
    private alertController: AlertController,
  ) {
    this.formSingup = this.fb.group({
      correo: ['',[ Validators.required, Validators.email ]],
      passw: ['', [ 
        Validators.required,
        Validators.minLength(6), 
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/),        
      ]],
      confirmPassw: ['', [Validators.required, this.confirmPasswordValidators.bind(this)]],
      username: ['', Validators.required],
    }); 

    this.formLogin = this.fb.group({
      'correo': new FormControl('', Validators.required), 
      'passw': new FormControl('', Validators.required)
    });           
   }

  ngOnInit():void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.dismissPopover();
    });

    this.userService.userData$.subscribe(userData => {
      this.userData = userData; 
    }, error => {
      console.error('Error al obtener datos del usuario ', error); 
    }); 
  
    this.userService.userSesion$.subscribe(userSesion => {
      this.userSesion = userSesion; 
    }, error => {
      console.error('Error al iniciar sesión del usuario', error); 
    }); 
  
    this.authService.checkAuthState(); 
    this.getUsuario(); 
  }
  // <------------------------------------------ Login y sing-up process -------------------------------------->
  // logica para crear mensajes
  public async mostrarAlerta(mensaje: string){
    const alert = await this.alertController.create({
      header: 'Alerta', 
      message: mensaje, 
      buttons: [{
        text: 'Ok', 
        handler:() =>{
          //this.router.navigate(['home']); 
        }
      }]
    });
    await alert.present(); 
  }

  // controlador de errores
  getErrorMessage(controlName: string){
    const control = this.formSingup.get(controlName);
    if(control?.hasError('required')){
      return 'Campo requerido'; 
    }
    if(control?.hasError('email')){
      return 'Correo electrónico inválido';     
    }
    if(control?.hasError('minlength')){
      return 'Debe tener al menos 6 carácteres'; 
    }
    if(control?.hasError('pattern')){
      return 'Debe contener al menos una mayúscula, un número y un signo especial "@$!%*?&"'; 
    }
    return ''; 
  }

  // Obtener usuarios; 
  getUsuario(){
    this.http.get<any>('https://backend-resiliente.fly.dev/api/v1/usuario').subscribe(
      (data) =>{
        this.allUsers = data; 
        console.log('getUsuario: ', data); 
      }, (error) => {
        console.error('Error al obtener ususarios', error); 
      }
    );
  }

  // Obtener un email
  getOneEmail(correo: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post<any>('https://backend-resiliente.fly.dev/api/v1/usuario/email', {correo})
      .subscribe(data => {
        this.userSesion = data[0]; 
        console.log('User sesion: ', this.userSesion); 
        if(Object.keys(this.userSesion).length > 0){
          console.log(':D'); 
        }
        resolve(this.userSesion); 
      }, (error) => {
        console.error('Error al obtener a el usuario ', error); 
        reject(error); 
      }); 
    }); 
  }

  // inicializar la sesión actual
  async initCurrentSesion(correo?: string){
    if(!correo){
      correo = this.userService.getUserData()?.email || this.formLogin.get('correo')?.value; 
      console.log('initCurrentSesion: correo encontrado: ', correo); 
    }
    if(!correo){
      console.error('initCurrentSesion: No se pudo obtener un correo valido'); 
      return; 
    }
    try{
      await this.getOneEmail(correo); 
      const dataSesion = this.userSesion; 
      console.log('initCurrentSesion: Data sesion: ', dataSesion); 

      if(dataSesion){
        this.userService.setCurrentSesion(dataSesion); 
        console.log('initCurrentSesion: Usuario en la sesión actual: ', dataSesion);         
      } else {
        console.error('initCurrentSesion: No se encontró ningún usuario con el correo proporcionado'); 
      }
    } catch( error ) {
      console.error('initCurrentSesion: Error al obtener usuario', error); 
    }
  }

  // almacernar usuario de google en la db
  async saveGoogleUser(){
    try {
      const Response = await this.getUsuario();    
      console.log('Datos del usuario obtenidos', Response); 
    } catch (error){
      console.error('Error al obtener usuarios: ', error); 
    }

    const userData = this.userService.getUserData(); 
    if(userData){
      const email = userData.email; 
      const emailExist = this.allUsers.some(user => user.correo === email); 
      if(emailExist){
        this.formLogin.controls['correo'].setErrors({ emailExist: true}); 
        console.log(email); 
      } else {
        console.log('Email válido', email);
      }

      if (!emailExist){
        const nuevoUsuarioGoogle = {
          correo: userData.email, 
          passw: 'GooglePass', 
          username: userData.displayName,          
        }; 

        console.log('Nuevo usuario de google ', nuevoUsuarioGoogle); 

        this.http.post<any>('https://backend-resiliente.fly.dev/api/v1/usuario', nuevoUsuarioGoogle).subscribe(Response => {
          console.log('Usuario de google agregado con éxito', Response); 
        }, (error) => {
          console.error('Error al agregar al usuario de google', error); 
        }); 
        this.authService.verifyEmail(); 
        console.log('Correo enviado'); 
        alert('Se envió al correo: '+ email + '. Confirma para verificar');
      }
    } else {
      console.error('No se encontraron datos del usuario'); 
    }
  }

  // Obtener datos del usuario
  getUserData(){
    return this.userService.getUserData(); 
  }

  //logica para iniciar sesión
  login(event: Event) {
    event.preventDefault(); 

    const correo = this.formLogin.value.correo;
    const passw = this.formLogin.value.passw;
  
    console.log('Intentando iniciar sesión con:', correo, passw);
  
    this.authService.login(correo, passw).then(response => {
      console.log('Respuesta del API de login:', response);
  
      if (response && response.success) { 
        localStorage.setItem('authToken', response.token); 
        
        this.userService.setUserData(response.data);
        this.userService.setCurrentSesion(response.data);                 
        this.mostrarAlerta('¡Bienvenid@, '+ response.data.username +'! :D');
        this.closeLoginModal(); 
      } else {
        this.failedLoginAttemps++;
        console.error('Correo o contraseña incorrectos');
      }
    }).catch(error => {
      this.failedLoginAttemps++;
      console.error('Error en el proceso de inicio de sesión', error);
    });
  }

  // desactivar formulario y timer
  disabledLoginForTime(seconds: number){
    this.formLogin.disable(); 
    setTimeout(()=>{
      this.formLogin.enable(); 
      this.failedLoginAttemps = 0; 
      this.errorMessage = ''; 
    }, seconds * 1000); 
  }

  // iniciar una sesión con google
  async loginGoogle(){
    try{
      await this.authService.loginWithGoogle(); 
      await this.saveGoogleUser(); 
      try {
        await this.initCurrentSesion(); 
      } catch(error: any){
        console.error('Error al establecer la sesión actual', error); 
      }
    } catch (error: any){
      console.error('Error al iniciar sesión con Google', error); 
    }
  }

  // logica para crear un usuario 
  getOneUsuario(idUsuario: number){
    this.http.get<any>('https://backend-resiliente.fly.dev/api/v1/usuario/' + idUsuario).subscribe(
      (data) => {
        console.log('Usuario: ', data); 
      }, 
      (error) => {
        console.error('Error al obtener usuario', error); 
      }
    ); 
  }

  // crear el usuario
  createOneUsuario(){
    if(this.formSingup.valid){
      const email = this.formSingup.value.correo; 
      const username = this.formSingup.value.username; 
      const emailExist = this.allUsers.some((user) => user.correo === email); 
      const usernameExist = this.allUsers.some((user) => user.username === username); 

      if(emailExist){
        this.formSingup.controls['correo'].setErrors({
          emailExist: true
        }); 
      }

      if(usernameExist){
        this.formSingup.controls['username'].setErrors({
          usernameExist: true
        }); 
      }

      if(!emailExist && !usernameExist){
        const nuevoUsuario = {
          correo: this.formSingup.value.correo, 
          passw: this.formSingup.value.passw, 
          username: this.formSingup.value.username,
        };         
        this.http.post<any>('https://backend-resiliente.fly.dev/api/v1/usuario', nuevoUsuario)
        .subscribe((Response) => {
          console.log(Response); 
          this.userService.setUserData(Response); 
          this.userData = Response; 
        }, 
        (error) => {
          console.error('Error al agregar un usuario', error.error); 
          }      
        );
        this.showLoginForm(); 
        this.mostrarAlerta('Cuenta creada :D');         
      }      
    }    
  }
  
  // borrar un usuario
  deleteUsuario(idUsuario: number){
    this.http.delete<any>('https://backend-resiliente.fly.dev/api/v1/usuario/' + idUsuario).subscribe((Response)=>{
      console.log('Usuario eliminado ', Response); 
    }, 
    (error) => {
      console.error('Error al eliminar el usuario ', error); 
    }
    ); 
  }

  // proceso para validar la contraseña
  confirmPasswordValidators(control: AbstractControl): {[key:string]: boolean } | null {
    if(!this.formSingup || !this.formSingup.get('passw')){
      return null; 
    } 

    const passw = this.formSingup.get('passw')?.value; 
    const confirmPassw = control.value; 
    return passw === confirmPassw ? null: {confirmPassw: true}; 
  }

  // drop sesion xd
  logout(){
    this.authService.logout(); 
  }

  // <---------------------------------------------- Fin de login y sing-up--------------------------------->

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'text' ? 'password' : 'text';
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  async openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.modalController.dismiss();
  }

  didDismissLoginModal() {
    this.isLoginModalOpen = false;
  }

  showLoginForm() {
    this.isSignUpMode = false;
  }

  showSignUpForm() {
    this.isSignUpMode = true;
  }

  async presentPopover(e: MouseEvent | TouchEvent) {
    await this.serviciosPopover.present(e);
  }

  async dismissPopover() {
    if (this.serviciosPopover) {
      await this.serviciosPopover.dismiss();
    }
  }

  async closePopover() {
    await this.dismissPopover();
  }
 
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot || baseEl;
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop') || root)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper') || root)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);
    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };
  
  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}