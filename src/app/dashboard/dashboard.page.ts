import { Component, OnInit, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { ExportsService } from '../services/export.service';
import { ImportsService } from '../services/import.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  // backButtonSubscription;
  isItemAvailable = false;
  val: string;
  refresh = false;
  importacion = false;
  exportacion = false;
  link = '/menu/export/';
  imports;
  length;
  qtyNotification;
  private backbuttonSubscription: Subscription;

  // subscribe: any;
  // private backButtonSub: Subscription;
  // public unsubscribeBackEvent: any;

  public width: string = '40';

  items = [];

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public navCtrl: NavController,
    public exportService: ExportsService,
    public importService: ImportsService,
    public platform: Platform,
    public toastCtrl: ToastController,
    private nativePageTransitions: NativePageTransitions
  ) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = 'dashboard';
    });

    this.authService.menu = true;

    this.isItemAvailable = false;

    if ( this.platform.width() > 568 ) {
      this.width = '30';
    } else {
      this.width = '40';
    }

  }

  // @HostListener('document:ionBackButton', ['$event'])


  // overrideHardwareBackAction(event: any) {
  //   console.log('back button');
  //   navigator['app'].clearHistory();
  //   event.detail.register(100, async () => {
  //     event.stopImmediatePropagation();
  //     event.stopPropagation();
  //     event.preventDefault();
  //   });
  // }

  // ionViewWillLeave() {
  //   // Unregister the custom back button action for this page
  //   this.unsubscribeBackEvent;
  // }
 
  // initializeBackButtonCustomHandler(): void {
  //   this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
  //       alert("back pressed home" + this.constructor.name);
  //   });
  //   /* here priority 101 will be greater then 100 
  //   if we have registerBackButtonAction in app.component.ts */
  // }

  // ionViewDidEnter(){

  //   this.platform.backButton.subscribeWithPriority(666666, () => {

  //     console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  //     if( this.constructor.name == 'DashboardPage' ) {
  //       console.log('poooooooooooooooooooooooooooo');

  //       if( window.confirm("Esta seguro de salir?") ){
  //         console.log('myyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
          
  //         // navigator['app'].exitApp();
  //       }
  //     }

  //   });
    // navigator['app'].clearHistory();


  // }

  ngOnInit() {
    // this.initializeBackButtonCustomHandler();
    // this.initializeItems();
    this.isItemAvailable = false;
    this.route.paramMap.subscribe(() => {
      this.authService.getNotifications(this.authService.user.id).subscribe( (resp: any) => {
        this.qtyNotification = resp.length;
      });
    });

    // const event = fromEvent(document, 'backbutton');
    // this.backbuttonSubscription = event.subscribe(async () => {
    //   // this.showToast('salir del app');
    //   this.showToast('Presione atras de nuevo para salir');
    //   navigator['app'].exitApp();
    // });

    
  }

  navigatePage( url ) {
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

    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateForward(url);

  }

  navigatePageType( url, id ) {
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

  doRefresh(event) {
    this.refresh = true;

    setTimeout(() => {
      this.refresh = false;
      event.target.complete();
    }, 2000);
  }

  initializeItems(search) {

    // this.propertyService.getProperties().subscribe( (resp: any) => {
    //   this.items = resp;
    // });

    this.exportService.searchExports(search).subscribe( (resp: any) => {
      if( resp.length > 0) {
        this.length = resp.length;
        this.items = resp;
        this.exportacion = true;
        this.importacion = false;
        this.link = '/menu/export/';
      }else {
        this.importService.searchImports(search).subscribe( (imp: any) => {
          this.length = imp.length;
          this.items = imp;
          this.exportacion = false;
          this.importacion = true;
          this.link = '/menu/import/';
        });
      }
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
      // this.initializeItems('');
    }
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      // showCloseButton: true,
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
      ],
      duration: 3000,
      // closeButtonText: 'Ok'
    });
    await toast.present();
  }

  ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
  }

}
