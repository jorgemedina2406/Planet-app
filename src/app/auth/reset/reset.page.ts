import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormResetPassword } from '../../models/reset.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  forma: FormGroup;
  token;

  buttonText = 'Volver';
  buttonIcon = 'ios-arrow-back';

  constructor(
    private authService: AuthService,
    private router: Router,
    public route: ActivatedRoute,
    public toastCtrl: ToastController
  ) { 

    route.queryParams.subscribe( params => {

      let token = params['token'];
      this.token = token;

    });
  }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {

    // this.forma = new FormGroup({
    //   email: new FormControl( null, Validators.required ),
    //   password: new FormControl( null, [Validators.required, Validators.minLength(6)]),
    //   password_confirmation: new FormControl( null, Validators.required, )
    // }, { validators: this.sonIguales( 'password', 'password_confirmation' )  });
    
  }


  resetPassword(form) {

    if( form.value.password !== form.value.password_confirmation) {
      this.showToast('Las contraseñas no coinciden');
      return;
    }

    const formReset = new FormResetPassword(
      form.value.email,
      form.value.password,
      form.value.password_confirmation,
      this.token
    );

    this.authService.resetPassword( formReset )
              .subscribe( (resp: any) => {
                this.router.navigate(['']);
              });

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
