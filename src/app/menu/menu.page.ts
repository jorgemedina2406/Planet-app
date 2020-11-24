import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { stepper, routeTransitionAnimations } from '../route-animation';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  imagenSubir: File;
  imagenTemp;
  imageTempArray = [];

  fileData: File = null;

  pages = [
    {
      title: 'Inicio',
      url: '/menu/dashboard',
      icon: '',
      src: '/assets/icon/house.svg'
    },
    {
      title: 'Rastreo de guia',
      url: '/menu/search',
      icon: '',
      src: '/assets/icon/lupa.svg'
    },
    {
      title: 'Notificaciones',
      url: '/menu/notifications',
      icon: '',
      src: '/assets/icon/campana.svg'
    },
    {
      title: 'Mi Cuenta',
      url: '/menu/account',
      icon: '',
      src: '/assets/icon/avatar.svg'
    },
    {
      title: 'Contacto',
      url: '/menu/contact',
      icon: '',
      src: '/assets/icon/arroba.svg'
    },
    {
      title: 'Ayuda',
      url: '/menu/help',
      icon: '',
      src: '/assets/icon/pregunta.svg'

    },
    // {
    //   title: 'Propiedad',
    //   url: '/menu/property',
    //   icon: 'home'
    // }
  ];

  constructor( 
    public authService: AuthService,
    public router: Router,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions
  ) {
  }

  ngOnInit() {
  }

  navigatePage( url ) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.fade(options);
    this.navCtrl.navigateForward(url);
  }

  login() {
    this.router.navigate(['/login']);
  }

  callWithNumber(mobileNumber) {
    window.open("tel:" + mobileNumber);
  }

  logout() {
    this.authService.logout()
    .subscribe((resp) => {
      this.authService.menu = false;
      // this.router.navigate(['/login']);
      this.navCtrl.navigateRoot('/');
      this.showToast('Se cerro sesion con exito');
    });
  }

  seleccionImage( event ) {

    // this.fileData = <File>files;

    let archivo = event.target.files[0];

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      this.showToast('El archivo seleccionado no es una imagen');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

    let elem = event.target;
    if( elem.files.length > 0 ) {
      let formData = new FormData();
      formData.append('file', archivo);

      let userId = this.authService.user.id;

      this.authService.postImageProfile( formData ).subscribe(
        (response) => {          
          this.showToast('La imagen de perfil se ha guardado exitosamente');
        });
    }
    elem.value = "";
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      // showCloseButton: true,
      duration: 3000,
      buttons: [
        {
          side: 'end',
          icon: '',
          text: '',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
      // closeButtonText: 'Ok'
    });
    await toast.present();
  }

}
