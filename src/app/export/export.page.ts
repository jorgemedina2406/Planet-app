import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ExportsService } from '../services/export.service';
import {map, catchError} from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { ToastController, NavController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {

  export: any;
  buttonText = 'Volver';
  buttonIcon = 'ios-arrow-back';
  loading = false;
  isItemAvailable = false;
  val: string;
  public width: string = '40';

  items = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public exportService: ExportsService,
    public authService: AuthService,
    public router: Router,
    public toastCtrl: ToastController,
    public loadingService: LoadingService,
    private nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController
  ) { 

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = '';
    });

    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      this.getExport( id );

    });
  }

  ngOnInit() {
    // this.loadingService.present();
  }

  navigatePageBack() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 500,
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

  searchByKeyword(event){
    this.router.navigate(['/menu/exports/'+ event]);
  }

  initializeItems(search) {
    // this.propertyService.getProperties().subscribe( (resp: any) => {
    //   this.items = resp;
    // });

    this.exportService.searchExports(search).subscribe( (resp: any) => {
      this.items = resp;
    });
  }

  getExport( id ) {
    this.loading = true;

    this.exportService.getExport( id )
          .subscribe( exp => {
            this.loading = false;
            // this.loadingService.dismiss();
            this.export = exp;
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
      // this.items = this.items.filter((item) => {
      //   return (
      //     item.propiedad.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
      //     item.descripcion.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
      //     item.ubicacion.municipio.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
      //     item.ubicacion.estado.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
      //     item.ubicacion.colonia.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
      //     item.ubicacion.cod_postal.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      //   );
      // });
    } else {
      this.isItemAvailable = false;
      // this.initializeItems();
    }
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
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
      // showCloseButton: true,
      // closeButtonText: 'Ok'
    });
    await toast.present();
  }

}
