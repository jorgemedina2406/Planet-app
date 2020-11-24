import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import {map, catchError, tap} from 'rxjs/operators';
import {Observable, throwError, ReplaySubject, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  token: string;
  admin;
  authState = new BehaviorSubject(false);
  tokenFcm: string;
  qtyNotification: number;
  menu;
  activeClass;

  OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };


  constructor(
    public http: HttpClient,
    public router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastCtrl: ToastController
  ) {
    
    this.platform.ready().then(() => {
      this.isLogin();
    });

    this.loadStorage();

  }

  getNotifications(user) {

    let url = URL_SERVICIOS + 'users/notifications/' + user;

    return this.http.get( url )
    .pipe(map( (resp: any) => {
      this.qtyNotification = resp.length;
      return resp;
    })).pipe(
      catchError( err => {
      // swal.fire( err.error.mensaje, err.error.errors.message, 'error' );
      return throwError( err );
    }));
  }

  async loadStorage() {

    await this.storage.get('token').then((val) => {
        if ( val ) {
          this.token = val;
          this.authState.next(true);
        } else {
          this.token = '';
        }
      });

    await this.storage.get('user').then((val) => {
        if ( val ) {
          this.user = JSON.parse(val);

        } else {
          this.user = null;
        }
      });

  }

  renuevaToken() {

    let url: string = URL_SERVICIOS + 'users/refresh';
    url += '?token=' + this.token;

    return this.http.post( url, '' )
                .pipe(map( (resp: any) => {

                  this.token = resp.access_token;
                  this.saveStorage( resp.user.id, resp.access_token, resp.user);
                  return true;
                }))
                .pipe(
                  catchError( err => {
                  this.router.navigate(['/']);
                  return throwError( err );
                }));
  }

  isLogin() {
    this.storage.get('token').then((val) => {
      if ( val ) {
        this.authState.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authState.value;
    
  }


  createUser( user ) {

    const url = URL_SERVICIOS + 'users';

    const formData = new FormData();

    formData.append('name', user.value.name);
    formData.append('email', user.value.email);
    formData.append('street', user.value.street);
    formData.append('nro_ext', user.value.nro_ext);
    formData.append('nro_int', user.value.nro_int);
    formData.append('colony', user.value.colony);
    formData.append('municipality', user.value.municipality);
    formData.append('federal_entity', user.value.federal_entity);
    formData.append('postal', user.value.postal);
    formData.append('password', user.value.password);

    return this.http.post( url, formData )
      .pipe(map( (resp: any) => {
        return true;
      })).pipe(
      catchError( err => {
        this.showToast('Ocurrio un error creando el usuario, es posible que el correo ya este registrado');
        return throwError( err );
      }));

  }

  login( form ) {

    let url = URL_SERVICIOS + 'ingresar';

    const formData = new FormData();

    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('tokenFcm', this.tokenFcm);

    return this.http.post( url, formData )
                .pipe(map( (resp: any) => {
                  this.token = resp.access_token;
                  this.saveStorage( resp.user.id, resp.access_token, resp.user );
                  this.user = resp.user;
                  this.authState.next(true);

                  return true;
                })).pipe(
                catchError( err => {
                  this.showToast('Contraseña o email invalido');
                  return throwError( err );
                }));

  }

  saveStorage( id, token: string, user ) {

    this.storage.set('id', id );
    this.storage.set('token', token );
    this.storage.set('user', JSON.stringify(user) );

    this.token = token;
  }

  logout() {

    let url = URL_SERVICIOS + 'logout-user';

    const formData = new FormData();

    formData.append('user', this.user.id);

    return this.http.post( url, formData )
                .pipe(map( (resp: any) => {
                  this.user = null;
                  this.token = '';

                  this.storage.remove('token').then(() => {
                      this.authState.next(false);
                  });

                  this.storage.remove('user');

                  return true;

                })).pipe(
                catchError( err => {
                  this.showToast('No se pudo cerrar sesion');
                  return throwError( err );
                }));
  }

  me( user ) {

    let url = URL_SERVICIOS + 'users/me/' + user;
    // url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(map( (resp: any) => {
      this.admin = resp.admin;
      return resp;
    })).pipe(
      catchError( err => {
      // swal.fire( err.error.mensaje, err.error.errors.message, 'error' );
      return throwError( err );
    }));
  }

  updateUser( user ) {

    let url = URL_SERVICIOS + 'users/' + this.user.id;
    url += '?token=' + this.token;

    return this.http.put( url, user )
                .pipe(map( (resp: any) => {
                  this.user = resp;
                  if ( resp.id === this.user.id ) {
                    let userDB = resp;
                    this.saveStorage( userDB.id, this.token, userDB );
                  }

                  this.showToast('Usuario actualizado');

                  return resp;
                }))
                .pipe(catchError( err => {
                  this.showToast('Ha ocurrido un error');
                  return throwError( err );
                }));

  }

  recoverPass( user ) {

    let url = URL_SERVICIOS + 'reset-password';
    url += '?token=' + this.token;

    return this.http.post( url, user )
                    .pipe(map( (resp: any) => {
                    }))
                    .pipe(catchError( err => {
                      console.log(err);
                      this.showToast('No se ha podido enviar el correo');

                      return throwError( err );
                    }));

  }

  resetPassword( formReset ) {

    let url = URL_SERVICIOS + 'password/reset';
    url += '?token=' + this.token;

    return this.http.post( url, formReset )
                    .pipe(map( (resp: any) => {
                      this.showToast('La contraseña se restauró con exito');
                    }))
                    .pipe(catchError( err => {

                      this.showToast('No se ha podido restaurar la contraseña');

                      return throwError( err );
                    }));
  }

  postImageProfile( formData ) {

    let url = URL_SERVICIOS + 'users/picture-profile/' + this.user.id;
    url += '?token=' + this.token;

    return this.http.post(url, formData)
    .pipe(map( (resp: any) => {
        this.user = resp;
        this.saveStorage( resp.id, this.token, resp );
      }))
      .pipe(catchError( err => {
        console.log('Error subiendo imagen');
        // swal( err.error.mensaje, err.error.errors.message, 'error' );
        return throwError( err );
      }));

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
