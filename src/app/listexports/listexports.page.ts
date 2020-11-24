import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ExportsService } from '../services/export.service';
import { LoadingService } from '../services/loading.service';
import { IonSelect, NavController } from '@ionic/angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-listexports',
  templateUrl: './listexports.page.html',
  styleUrls: ['./listexports.page.scss'],
})
export class ListExportsPage implements OnInit {

  @ViewChild('sectionSelect', {static: false}) selectPop: any;

  search: String;
  type: String;
  export: String;
  exports: any;
  showList = true;
  sort: string = 'asc';
  buttonText = 'Volver';
  buttonIcon = 'ios-arrow-back';

  isItemAvailable = false;
  val: string;

  items = [];  

  constructor( 
    public route: ActivatedRoute,
    public exportsService: ExportsService, 
    public router: Router,
    public loadingService: LoadingService,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public authService: AuthService

  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = '';
    });

      this.isItemAvailable = false;

      this.route.paramMap.subscribe( (params: ParamMap ) => {
      this.search = params.get('search');
      this.export = params.get('export');
  });
  }

  ngOnInit() {
    this.loadingService.present();
    this.getExports();
    this.isItemAvailable = false;
  }

  navigatePageBack() {
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 500,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 100,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.slide(options);
    this.navCtrl.back();

  }

  navigatePageExport( url, id ) {
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

  setFilter(event) {
    this.sort = event.detail.value;
  }

  searchByKeyword(event){
    this.router.navigate(['/menu/exports/'+ event]);
  }

  doFilter(){
    // this.showList = false;
    this.selectPop.open();
   }

   doRefresh(event) {
    this.getExports();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  initializeItems(search) {
    // this.propertyService.getProperties().subscribe( (resp: any) => {
    //   this.items = resp;
    // });

    this.exportsService.searchExports(search).subscribe( (resp: any) => {
      this.items = resp;
    });
  }

  getExports() {

    // this.loading = true;

    // let vip = this.vip;

    if ( this.search !== null ) {
      this.exportsService.searchExports( this.search )
              .subscribe( (resp: any) => {
                this.loadingService.dismiss();
                this.exports = resp;
                this.exports.map( (exp: any) => {

                  if(exp.status_id === 1) {
                    exp.status_id = 'Nueva';
                    exp.color = 'warning';
                  }else if (exp.status_id === 2) {
                    exp.status_id = 'En Proceso';
                    exp.color = 'primary';
                  }else if (exp.status_id === 3) {
                    exp.status_id = 'Terminada';
                    exp.color = 'success';
                  }else if (exp.status_id === 4) {
                    exp.status_id = 'Cancelada';
                    exp.color = 'brand';
                  }else if (exp.status_id === 5) {
                    exp.status_id = 'Revalidado';
                    exp.color = 'info';
                  }else if (exp.status_id === 6) {
                    exp.status_id = 'Despacho';
                    exp.color = 'tertiary';
                  }else if (exp.status_id === 7) {
                    exp.status_id = 'Rojo';
                    exp.color = 'danger';
                  }else if (exp.status_id === 8) {
                    exp.status_id = 'Verde';
                    exp.color = 'success';
                  }else if (exp.status_id === 9) {
                    exp.status_id = 'Entregado';
                    exp.color = 'secondary';
                  }
                });
              });
    } else {

        this.exportsService.getExportsByUser()
            .subscribe( (resp: any) => {
              this.loadingService.dismiss();
              this.exports = resp;
              this.exports.map( (exp: any) => {
                if(exp.status_id === 1) {
                  exp.status_id = 'Nueva';
                  exp.color = 'warning';
                }else if (exp.status_id === 2) {
                  exp.status_id = 'En Proceso';
                  exp.color = 'primary';
                }else if (exp.status_id === 3) {
                  exp.status_id = 'Terminada';
                  exp.color = 'success';
                }else if (exp.status_id === 4) {
                  exp.status_id = 'Cancelada';
                  exp.color = 'brand';
                }else if (exp.status_id === 5) {
                  exp.status_id = 'Revalidado';
                  exp.color = 'info';
                }else if (exp.status_id === 6) {
                  exp.status_id = 'Despacho';
                  exp.color = 'tertiary';
                }else if (exp.status_id === 7) {
                  exp.status_id = 'Rojo';
                  exp.color = 'danger';
                }else if (exp.status_id === 8) {
                  exp.status_id = 'Verde';
                  exp.color = 'success';
                }else if (exp.status_id === 9) {
                  exp.status_id = 'Entregado';
                  exp.color = 'secondary';
                }
              });
            });
      }
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
