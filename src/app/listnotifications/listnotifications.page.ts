import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { IonSelect, NavController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import { ImportsService } from '../services/import.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-listnotifications',
  templateUrl: './listnotifications.page.html',
  styleUrls: ['./listnotifications.page.scss'],
})
export class ListNotificationsPage implements OnInit {

  @ViewChild('sectionSelect', {static: false}) selectPop: any;

  showList = true;
  sort: string = 'asc';
  buttonText = 'Volver';
  buttonIcon = 'ios-arrow-back';
  notifications: any;
  isItemAvailable = false;
  val: string;
  loading = false;
  length;

  items = [];  

  constructor( 
    public route: ActivatedRoute,
    public router: Router,
    public notificationsService: NotificationService,
    public importsService: ImportsService,
    public loadingService: LoadingService,
    private nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public authService: AuthService
  ) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getNotifications();
      this.authService.activeClass = '';
    });

  }

  ngOnInit() {
    // this.loadingService.present();
    this.getNotifications();
  }

  navigatePageBack() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.slide(options);
    this.navCtrl.back();

  }

  navigatePageImport( url, id ) {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 100,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateForward([url, id]);

  }

  navigatePageNotification( url, id, estatus, notificacion) {
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
    this.navCtrl.navigateForward([url, id, estatus, notificacion]);
  }

  setFilter(event) {
    this.sort = event.detail.value;
  }

  searchByKeyword(event){
    this.router.navigate(['/menu/imports/'+ event]);
  }

  doRefresh(event) {
    this.getNotifications();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  initializeItems(search) {
    this.importsService.searchImports(search).subscribe( (resp: any) => {
      this.length = resp.length;
      this.items = resp;
    });
  }

  getNotifications() {

    this.loading = true;
    // this.loadingService.present();

    this.notificationsService.getNotificationsByUser().subscribe( (resp: any) => {

      // this.loadingService.dismiss();
      this.loading = false;
      this.notifications = resp;
      
    });

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    this.val = val.toLowerCase();

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.initializeItems(val);
      
    } else {
      this.isItemAvailable = false;
      // this.initializeItems();
    }
  }

}
