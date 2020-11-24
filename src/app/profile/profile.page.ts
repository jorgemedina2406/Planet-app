import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user.model';
import { ToastController, NavController } from '@ionic/angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('passwordEyeRegister', {static: false}) passwordEye;
  @ViewChild('passwordEyeRegisterRepeat', {static: false}) passwordEyeRepeat;

  user: any;
  forma: FormGroup;

  imagenSubir: File;
  imagenTemp;
  imageTempArray = [];
  passwordTypeInput  =  'password';
  passwordTypeInputRepeat  =  'password';
  iconpassword  =  'eye-off';
  iconpasswordRepeat  =  'eye-off';

  fileData: File = null;


  constructor( 
    public authService: AuthService,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions
  ) { 
    this.user = this.authService.user;
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

    this.forma = new FormGroup({
      name: new FormControl( null , Validators.required ),
      email: new FormControl( null , Validators.required ),
      password: new FormControl(),
      password2: new FormControl(),
    }, { validators: this.sonIguales( 'password', 'password2' )  } );
  }

  navigatePageBack() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 500,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.slide(options);
    this.navCtrl.back();

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

  updateUser() {

    const data = 
      {
        name: this.forma.value.name,
        email: this.forma.value.email,
        password: this.forma.value.password
      }
    
    this.authService.updateUser( data )
              .subscribe( resp => console.log(resp) );

  }

  seleccionImage( event ) {

    // this.fileData = <File>files;

    let archivo = event.target.files[0];

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      this.showToast('El archivo seleccionado no es una imagen');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

    let elem = event.target;
    if( elem.files.length > 0 ) {
      let formData = new FormData();
      formData.append('file', archivo);

      let userId = this.authService.user.id;

      this.authService.postImageProfile( formData ).subscribe(
        (response) => {          
          this.showToast('La imagen de perfil se ha guardado exitosamente');
        });
    }
    elem.value = "";
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
