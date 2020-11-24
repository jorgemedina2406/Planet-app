import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, ToastController, NavController, MenuController, ActionSheetController, PopoverController, ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FCM } from '@ionic-native/fcm/ngx';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';
import { slider, transformer, fader, stepper } from './route-animation';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  private backbuttonSubscription: Subscription;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  imagenSubir: File;
  imagenTemp;
  imageTempArray = [];
  url;

  fileData: File = null;

  pages = [
    {
      title: 'Inicio',
      url: '/dashboard',
      icon: '',
      src: '/assets/icon/house.svg'
    },
    {
      title: 'Rastreo de guia',
      url: '/search',
      icon: '',
      src: '/assets/icon/lupa.svg'
    },
    {
      title: 'Mi Cuenta',
      url: '/account',
      icon: '',
      src: '/assets/icon/avatar.svg'
    },
    {
      title: 'Contacto',
      url: '/contact',
      icon: '',
      src: '/assets/icon/arroba.svg'
    },
    {
      title: 'Ayuda',
      url: '/help',
      icon: '',
      src: '/assets/icon/pregunta.svg'

    },
  ];
  
  constructor(
    public authService: AuthService,
    private platform: Platform,
    public route: ActivatedRoute,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private nativePageTransitions: NativePageTransitions

  ) {
    
    this.initializeApp();
    this.backButtonEvent();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#3576c2");
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        this.authService.tokenFcm = token;
      });

      this.fcm.subscribeToTopic('global');

      this.fcm.onTokenRefresh().subscribe(token => {
        this.authService.tokenFcm = token;
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log('Received in background');
          this.authService.qtyNotification = this.authService.qtyNotification + 1;
          this.router.navigate([data.landing_page, data.status, data.id, data.observation]);
        } else {
          console.log('Received in foreground');
          this.authService.qtyNotification = this.authService.qtyNotification + 1;
          this.showToast('Ha recibido una nueva notificacion');
          location.reload();
          this.router.navigate(['/menu/dashboard']);

        }
      });
    });

  }

  backButtonEvent() {
    const event = fromEvent(document, 'backbutton');
    this.backbuttonSubscription = event.subscribe(async () => {
      // this.showToast('salir del app');
      if (this.router.url === '/menu/dashboard' ) {
                if( window.confirm("Esta seguro de salir?") ){
                  this.authService.logout().subscribe( resp => {
                    navigator['app'].exitApp();
                  });
                }
              }  else {
               this.navCtrl.navigateBack('/menu/dashboard');
              }
    });
  }

  // backButtonEvento() {
  //   console.log('backButtonEventobackButtonEventobackButtonEventobackButtonEventobackButtonEvento');
  //   if (this.platform.is('android')) {
  //     console.log('platform adnroidplatform adnroidplatform adnroidplatform adnroidplatform adnroid');
  //       this.platform.backButton.subscribeWithPriority(9999, () => {
  //       console.log('this.router.url', this.router.url);
  //       if (this.router.url === '/menu/dashboard' ) {
  //         this.showToast('Presione atras de nuevo para salir');
  //          navigator['app'].exitApp();
  //       }  else {
  //        this.navCtrl.navigateBack('/menu/dashboard');
  //       }
  //     });
  //   }
  // }
  

  // active hardware back button
  // backButtonEvent() {
  //   this.platform.backButton.subscribe(async () => {
  //       // close action sheet
  //       try {
  //           const element = await this.actionSheetCtrl.getTop();
  //           if (element) {
  //               element.dismiss();
  //               return;
  //           }
  //       } catch (error) {
  //       }

  //       // close popover
  //       try {
  //           const element = await this.popoverCtrl.getTop();
  //           if (element) {
  //               element.dismiss();
  //               return;
  //           }
  //       } catch (error) {
  //       }

  //       // close modal
  //       try {
  //           const element = await this.modalCtrl.getTop();
  //           if (element) {
  //               element.dismiss();
  //               return;
  //           }
  //       } catch (error) {
  //           console.log(error);

  //       }

  //       // close side menua
  //       try {
  //           const element = await this.menu.getOpen();
  //           if (element !== null) {
  //               this.menu.close();
  //               return;

  //           }

  //       } catch (error) {

  //       }

  //       this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
  //           if (outlet && outlet.canGoBack()) {

  //             console.log('outlet.canGoBack');
  //             outlet.pop();

  //           } else if (this.router.url === '/menu/dashboard') {
  //               console.log('outlet.asdasdasdsad');

  //               if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {

  //                   console.log('outlet.canGoBack');
  //                   // this.platform.exitApp(); // Exit from app
  //                   navigator['app'].exitApp(); // work for ionic 4

  //               } else {
  //                   this.showToast('Presione atras de nuevo para salir');

  //                   this.lastTimeBackPress = new Date().getTime();
  //               }
  //           }
  //       });
  //   });
  // }

  // navigatePage( url ) {
  //   let options: NativeTransitionOptions = {
  //     direction: 'up',
  //     duration: 500,
  //     slowdownfactor: -1,
  //     slidePixels: 20,
  //     iosdelay: 100,
  //     androiddelay: 150,
  //     fixedPixelsTop: 0,
  //     fixedPixelsBottom: 60,
  //   }

  //   this.nativePageTransitions.slide(options);
  //   this.navCtrl.navigateForward(url);
  // }

  // login() {
  //   this.router.navigate(['/login']);
  // }

  // callWithNumber(mobileNumber) {
  //   window.open("tel:" + mobileNumber);
  // }

  // logout() {
  //   this.authService.logout()
  //   .subscribe((resp) => {
  //     console.log('looooogoooout');
  //     console.log(resp);
  //     this.authService.menu = false;
  //     // this.router.navigate(['/login']);
  //     this.navCtrl.navigateRoot('/');
  //     this.showToast('Se cerro sesion con exito');
  //   });
  // }

  // seleccionImage( event ) {

  //   // this.fileData = <File>files;

  //   let archivo = event.target.files[0];

  //   if ( !archivo ) {
  //     this.imagenSubir = null;
  //     return;
  //   }

  //   if ( archivo.type.indexOf('image') < 0 ) {
  //     this.showToast('El archivo seleccionado no es una imagen');
  //     this.imagenSubir = null;
  //     return;
  //   }

  //   this.imagenSubir = archivo;

  //   let reader = new FileReader();
  //   let urlImagenTemp = reader.readAsDataURL( archivo );

  //   reader.onloadend = () => this.imagenTemp = reader.result;

  //   let elem = event.target;
  //   if( elem.files.length > 0 ) {
  //     let formData = new FormData();
  //     formData.append('file', archivo);

  //     let userId = this.authService.user.id;

  //     this.authService.postImageProfile( formData ).subscribe(
  //       (response) => {          
  //         this.showToast('La imagen de perfil se ha guardado exitosamente');
  //       });
  //   }
  //   elem.value = "";
  // }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      // showCloseButton: true,
      duration: 3000,
      // closeButtonText: 'Ok'
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
    });
    await toast.present();
  }

}
