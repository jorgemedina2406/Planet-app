import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  public myTemplate: any = "";

  constructor( 
    http: HttpClient,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions
  ) { 
    http.get('https://nikollrp.com/angular/terms.php', { responseType: 'text' })
        .subscribe(html => this.myTemplate = html);
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
