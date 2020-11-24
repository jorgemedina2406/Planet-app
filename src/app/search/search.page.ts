import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavController, Platform } from '@ionic/angular';
import { ExportsService } from '../services/export.service';
import { ImportsService } from '../services/import.service';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchBar', {static: false}) myInput ;

  // public myTemplate: any = "";
  isItemAvailable = false;
  val: string;
  // refresh = false;
  importacion = false;
  exportacion = false;
  link = '/menu/export/';
  imports;
  buttonText = 'Volver';
  buttonIcon = 'ios-arrow-back';
  length;
  items = [];

  // public width: string = '40';

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public exportService: ExportsService,
    public importService: ImportsService,
    public platform: Platform,
    public route: ActivatedRoute,
    private nativePageTransitions: NativePageTransitions
  ) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = 'search';
    });
    
    this.isItemAvailable = false;

    // if ( this.platform.width() > 568 ) {
    //   this.width = '30';
    // } else {
    //   this.width = '50';
    // }

  }

  ngOnInit() {
    // this.initializeItems();
    this.isItemAvailable = false;
    // this.ionViewDidLoad();
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

  navigatePage( url, id ) {
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
    this.navCtrl.navigateForward([url, id]);

  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 1000);

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
      
    }else{
      this.isItemAvailable = false;
    }
  }

}
