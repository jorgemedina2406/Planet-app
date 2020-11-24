import { Component, OnInit } from '@angular/core';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-info-app',
  templateUrl: './info-app.page.html',
  styleUrls: ['./info-app.page.scss'],
})
export class InfoAppPage implements OnInit {

  constructor( 
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public authService: AuthService, 
    public route: ActivatedRoute

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
