import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
    private nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public authService: AuthService
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = '';
    });
  }

  ngOnInit() {
  }

  navigatePageBack() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 500,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.fade(options);
    this.navCtrl.back();

  }

}
