import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from '../services/notification.service'
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  status: any = '';
  id: any = '';
  observation: any = '';
  referencia: any = '';

  constructor( 
    private route: ActivatedRoute,
    public notificationsService: NotificationService,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public authService: AuthService,

  ) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = '';
    });

    this.status = this.route.snapshot.params['status'];
    this.id = this.route.snapshot.params['id'];
    this.observation = this.route.snapshot.params['observation'];
    this.referencia = this.route.snapshot.params['referencia'];
  }

  ngOnInit() {
    this.notificationsService.markRead(this.id).subscribe( (resp: any) => {
      console.log(resp);
    });

  }

  navigatePageBack() {
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
    this.navCtrl.back();

  }

}
