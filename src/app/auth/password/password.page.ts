import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  buttonText = 'Volver';
  buttonIcon = 'ios-arrow-back';

  constructor(
    private authService: AuthService,
    private router: Router,
    public toastCtrl: ToastController,
    public loading: LoadingService
  ) { }

  ngOnInit() {
  }


  recoverPass(form) {

    this.loading.present();
    const formData = new FormData();

    formData.append('email', form.value.email);

    // const user = new User(null, null, form.value.email, null);
    
    this.authService.recoverPass(formData).subscribe((res) => {
      this.loading.dismiss();
      this.showToast('Se ha enviado un correo a su bandeja de entrada para restablecer su contraseña');
      // this.router.navigateByUrl('home');
    });
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      // showCloseButton: true,
      // closeButtonText: 'Ok'
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
