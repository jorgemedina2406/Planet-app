import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor( 
    public authService: AuthService,
    public route: ActivatedRoute,
    private nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController
  ) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = '';
    });
  }

  ngOnInit() {
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

    this.nativePageTransitions.fade(options);
    this.navCtrl.navigateForward(url);
  }

}
