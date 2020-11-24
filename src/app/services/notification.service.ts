import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification: any;
  labelAttribute = null;

  constructor(
    public http: HttpClient,
    public router: Router,
    public authService: AuthService,
    public toastCtrl: ToastController
  ) { }

  getNotificationsByUser() {

    const url = URL_SERVICIOS + 'notifications-user/' + this.authService.user.id;

    return this.http.get( url ).pipe(
      map(notifications => {
        return notifications;
      })
    ).pipe(
      catchError( err => {
        this.showToast(err.message);
        // this.showToast('Contraseña o email invalido');
        return throwError( err );
      }));

  }

  getNotification( id ) {

    const url = URL_SERVICIOS + 'notifications/' + id;
    return this.http.get( url )
              .pipe(map( (resp: any) => this.notification = resp ));
  }

  markRead( id ) {

    const url = URL_SERVICIOS + 'mark-read-notifications/' + id;
    return this.http.get( url )
              .pipe(map( (resp: any) => this.notification = resp ));
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
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
      // showCloseButton: true,
      // closeButtonText: 'Ok'
    });
    await toast.present();
  }

}
