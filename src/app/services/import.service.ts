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
export class ImportsService {

  import: any;
  filterBy: string = '';
  filterByCity: string = '';
  filterByMunicipio: string = '';
  labelAttribute = null;

  constructor(
    public http: HttpClient,
    public router: Router,
    public authService: AuthService,
    public toastCtrl: ToastController
  ) { }

  getImportsByUser() {

    const url = URL_SERVICIOS + 'imports-user/' + this.authService.user.client_id;

    return this.http.get( url ).pipe(
      map(imports => {
        return imports;
      })
    ).pipe(
      catchError( err => {
        this.showToast(err.message);
        // this.showToast('Contraseña o email invalido');
        return throwError( err );
      }));

  }

  getImport( id ) {

    const url = URL_SERVICIOS + 'imports/' + id;
    return this.http.get( url )
              .pipe(map( (resp: any) => this.import = resp ));
  }

  searchImports( search ) {

    const url = URL_SERVICIOS + 'search-imports/' + search + '/' + this.authService.user.client_id;

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
