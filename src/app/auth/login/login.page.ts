import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { LoadingService } from '../../services/loading.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Storage } from '@ionic/storage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('passwordEyeRegister', {static: false}) passwordEye;

  tokenFcm: string;

  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';

  constructor(
    private authService: AuthService,
    private router: Router,
    public route: ActivatedRoute,
    public toastCtrl: ToastController,
    public loading: LoadingService,
    private storage: Storage,
    private fcm: FCM,
    private nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController
  ) { 
    this.authService.menu = false;

    this.route.paramMap.subscribe((params: ParamMap) => {
  
      this.storage.get('token').then((val) => {
        if ( val ) {
          this.navCtrl.navigateForward('/menu/dashboard');
          // this.router.navigateByUrl('/menu/dashboard');
        }
      });

      this.storage.get('user').then((val) => {
        if ( val ) {
          this.authService.user = JSON.parse(val);

        }
      });
    });

  }

  ngOnInit() {
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

  registerPage() {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 100,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateForward(['/register']);

  }

  login(form){

    this.loading.present();

    if( form.invalid ) {
      this.showToast('El correo o la contraseña es incorrecta');
      return;
    }

    // this.fcm.getToken().then(token => {
    //   this.tokenFcm = token;
    //   console.log(token);
    // });

    // this.fcm.subscribeToTopic('global');

    // this.fcm.onTokenRefresh().subscribe(token => {
    //   this.tokenFcm = token;
    //   console.log(token);
    // });

    // console.log('ya tengo el token: ' + this.tokenFcm);

    this.authService.login(form.value)
    .subscribe((res) => {
      this.showToast('Ingreso con exito');
      this.loading.dismiss();
      this.router.navigateByUrl('/menu/dashboard');
    });
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      // showCloseButton: false,
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
      ],
      duration: 3000
    });
    await toast.present();
  }

}
