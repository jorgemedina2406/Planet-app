import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS_IMG } from './../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string, tipo: string = 'user', id): any {

    let url = URL_SERVICIOS_IMG;

    if ( !img ) {
      return url + 'no-foto.jpg';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch (tipo) {

      case 'user':
        url += 'user/' + id + '/' + img;
      break;

      case 'property':
        url += 'file/' + id + '/' + img;
      break;

      case 'config':
        url += 'config/' + img;
      break;

      default:
        url += 'no-foto.jpg';
    }

    return url;
  }

}
