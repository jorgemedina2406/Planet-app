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
export class ExportsService {

  export: any;
  labelAttribute = null;

  constructor(
    public http: HttpClient,
    public router: Router,
    public authService: AuthService,
    public toastCtrl: ToastController
  ) { }

  getExportsByUser() {

    const url = URL_SERVICIOS + 'exports-user/' + this.authService.user.client_id;

    return this.http.get( url ).pipe(
      map(exports => {
        return exports;
      })
    ).pipe(
      catchError( err => {
        this.showToast(err.message);
        // this.showToast('Contraseña o email invalido');
        return throwError( err );
      }));

  }

  getExport( id ) {

    const url = URL_SERVICIOS + 'exports/' + id;
    return this.http.get( url )
              .pipe(map( (resp: any) => this.export = resp ));
  }

  searchExports( search ) {

    const url = URL_SERVICIOS + 'search-exports/' + search + '/' + this.authService.user.client_id;

    return this.http.get( url ).pipe(map( (resp: any) => resp ));
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
