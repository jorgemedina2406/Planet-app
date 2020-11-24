import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) { }

  sendMessage( message ) {

    let url = URL_SERVICIOS + 'messages';
    return this.http.post( url, message );

  }

  sendMessageContactUs( message ) {

    let url = URL_SERVICIOS + 'contact-us';
    return this.http.post( url, message );
  }

  getMessages() {

    let url = URL_SERVICIOS + 'mis-mensajes/' + this.authService.user.id;
    url += '?token=' + this.authService.token;

    return this.http.get( url );
  }

  getMessage( message ) {

    let url = URL_SERVICIOS + 'messages/' + message;
    url += '?token=' + this.authService.token;

    return this.http.get( url );

  }
}
