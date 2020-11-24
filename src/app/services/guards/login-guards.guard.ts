import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  token;

  constructor(
    public authService: AuthService,
    public router: Router,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {

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

  canActivate(): boolean {
    if ( this.authService.isAuthenticated() ) {
        return true;
      } else {
        this.showToast('Debes iniciar sesión para ingresar a esta sección');
        this.router.navigate(['']);
        return false;
      }
    // return this.authService.isAuthenticated();
  }

    // if ( this.authService.token ) {
    //   return true;
    // } else {
    //   this.showToast('Debes iniciar sesión para ingresar a esta sección');
    //   this.router.navigate(['']);
    //   return false;
    // }

}
