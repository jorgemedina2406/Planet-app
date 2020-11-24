import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  public myTemplate: any = "";

  constructor( 
    http: HttpClient,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public authService: AuthService,
    public route: ActivatedRoute

  ) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = '';
    });

    http.get('https://nikollrp.com/angular/question.php', { responseType: 'text' })
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
