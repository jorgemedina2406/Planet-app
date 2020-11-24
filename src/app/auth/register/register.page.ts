import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('passwordEyeRegister', {static: false}) passwordEye;
  @ViewChild('passwordEyeRegisterRepeat', {static: false}) passwordEyeRepeat;

  buttonText = 'Volver';
  buttonIcon = 'ios-arrow-back';
  passwordTypeInput  =  'password';
  passwordTypeInputRepeat  =  'password';
  iconpassword  =  'eye-off';
  iconpasswordRepeat  =  'eye-off';
  forma: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public loading: LoadingService,
    public toastCtrl: ToastController,
    private nativePageTransitions: NativePageTransitions
  ) { }

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
    this.forma = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, Validators.required ),
      street: new FormControl( null, Validators.required ),
      nro_ext: new FormControl( null, Validators.required ),
      nro_int: new FormControl( null, Validators.required ),
      colony: new FormControl( null, Validators.required ),
      municipality: new FormControl( null, Validators.required ),
      federal_entity: new FormControl( null, Validators.required ),
      postal: new FormControl( null, Validators.required ),
      password: new FormControl( null , Validators.required ),
      password2: new FormControl( null , Validators.required ),
    }, { validators: this.sonIguales( 'password', 'password2' )  });
  }

  register() {

    this.loading.present();

    if ( this.forma.invalid ) {
      if(this.forma.value.password !== this.forma.value.password2 ) {
        this.showToast('Las contraseñas no coinciden');
        return;
      }

      this.showToast('Por favor ingrese todos los datos requeridos');

      return;
    }

    // if( this.forma.value.password !== this.forma.value.password2) {
    //   this.showToast('Las contraseñas no coinciden');
    //   return;
    // }

    this.authService.createUser(this.forma).subscribe((res) => {
      this.showToast('El usuario se ha creado exitosamente');
      this.loading.dismiss();
      this.router.navigateByUrl('');
    });
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

  togglePasswordModeRepeat() {
    this.passwordTypeInputRepeat  =  this.passwordTypeInputRepeat  ===  'text'  ?  'password'  :  'text';
    this.iconpasswordRepeat  =  this.iconpasswordRepeat  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEyeRepeat.el.setFocus();
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      // showCloseButton: true,
      // closeButtonText: 'Ok',
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
