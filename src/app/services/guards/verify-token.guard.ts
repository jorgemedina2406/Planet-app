import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class VerifyTokenGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    // this._sharedService.loader = true;
   }

  canActivate(): Promise<boolean> | boolean {

    const token = this.authService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ));

    const expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this.authService.logout();
      return false;
    }

    return true;

  }


  verificaRenueva( fechaExp: number ): Promise<boolean>  {

    return new Promise( (resolve, reject) => {

      const tokenExp = new Date( fechaExp * 1000 );
      const now = new Date();

      now.setTime( now.getTime() + ( 1 * 60 * 60 * 1000 ) );

      if ( tokenExp.getTime() > now.getTime() ) {
        resolve(true);
      } else {

        this.authService.renuevaToken()
              .subscribe( () => {
                // this._sharedService.loader = false;
                resolve(true);
              }, () => {
                this.authService.logout();
                // this._sharedService.loader = false;
                this.router.navigate(['']);
                reject(false);
              });

      }

    });

  }


  expirado( fechaExp: number ) {

    const now = new Date().getTime() / 1000;

    if ( fechaExp < now ) {
      return true;
    } else {
      return false;
    }


  }



}
