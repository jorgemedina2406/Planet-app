import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController, NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {


  imagenSubir: File;
  imagenTemp;
  imageTempArray = [];
  href;
  user: any;

  fileData: File = null;

  constructor( 
    public navCtrl: NavController, 
    public authService: AuthService, 
    public toastCtrl: ToastController,
    public route: ActivatedRoute,
    private nativePageTransitions: NativePageTransitions
    ) { 

      this.user = this.authService.user;

      this.route.paramMap.subscribe((params: ParamMap) => {
        this.authService.activeClass = 'account';
      });

    }

  ngOnInit() {
  }

  navigatePageBack() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: 3,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.fade(options);
    this.navCtrl.back();

  }

  navigatePage( url ) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateForward(url);

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
    });
    await toast.present();
  }


}
