import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ImportsService } from '../services/import.service';
import { LoadingService } from '../services/loading.service';
import { IonSelect, NavController } from '@ionic/angular';
import { slider, transformer, fader, stepper } from '../route-animation';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-listimports',
  templateUrl: './listimports.page.html',
  styleUrls: ['./listimports.page.scss'],
})
export class ListImportsPage implements OnInit {

  @ViewChild('sectionSelect', {static: false}) selectPop: any;

  search: String;
  type: String;
  import: String;
  imports: any;
  showList = true;
  sort: string = 'asc';
  buttonText = 'Volver';
  buttonIcon = 'ios-arrow-back';
  loading = false;

  isItemAvailable = false;
  val: string;

  items = [];  

  constructor( 
    public route: ActivatedRoute,
    public importsService: ImportsService, 
    public router: Router,
    public loadingService: LoadingService,
    public navCtrl: NavController,
    public nativePageTransitions: NativePageTransitions,
    public authService: AuthService, 

  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.authService.activeClass = '';
    });

      this.isItemAvailable = false;

      this.route.paramMap.subscribe( (params: ParamMap ) => {
      this.search = params.get('search');
      this.import = params.get('import');
  });
  }

  ngOnInit() {
    // this.loadingService.present();
    this.getImports();
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

  navigatePageImport( url, id ) {
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
    this.router.navigate(['/menu/imports/' + event]);
  }

  doFilter(){
    // this.showList = false;
    this.selectPop.open();
   }

   doRefresh(event) {
    this.getImports();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  initializeItems(search) {
    // this.propertyService.getProperties().subscribe( (resp: any) => {
    //   this.items = resp;
    // });

    this.importsService.searchImports(search).subscribe( (resp: any) => {
      this.items = resp;
    });
  }

  getImports() {

    this.loading = true;

    if ( this.search !== null ) {
      this.importsService.searchImports( this.search )
              .subscribe( (resp: any) => {
                // this.loadingService.dismiss();
                this.loading = false;
                this.imports = resp;
                this.imports.map( (imp: any) => {

                  if(imp.status_id === 1) {
                    imp.status_id = 'Nueva';
                    imp.color = 'warning';
                  }else if (imp.status_id === 2) {
                    imp.status_id = 'En Proceso';
                    imp.color = 'primary';
                  }else if (imp.status_id === 3) {
                    imp.status_id = 'Terminada';
                    imp.color = 'success';
                  }else if (imp.status_id === 4) {
                    imp.status_id = 'Cancelada';
                    imp.color = 'brand';
                  }else if (imp.status_id === 5) {
                    imp.status_id = 'Revalidado';
                    imp.color = 'info';
                  }else if (imp.status_id === 6) {
                    imp.status_id = 'Despacho';
                    imp.color = 'tertiary';
                  }else if (imp.status_id === 7) {
                    imp.status_id = 'Rojo';
                    imp.color = 'danger';
                  }else if (imp.status_id === 8) {
                    imp.status_id = 'Verde';
                    imp.color = 'success';
                  }else if (imp.status_id === 9) {
                    imp.status_id = 'Entregado';
                    imp.color = 'secondary';
                  }
                });
              });
    } else {

        this.importsService.getImportsByUser()
            .subscribe( (resp: any) => {
              // this.loadingService.dismiss();
              this.loading = false;
              this.imports = resp;
              this.imports.map( (imp: any) => {
                if(imp.status_id === 1) {
                  imp.status_id = 'Nueva';
                  imp.color = 'warning';
                }else if (imp.status_id === 2) {
                  imp.status_id = 'En Proceso';
                  imp.color = 'primary';
                }else if (imp.status_id === 3) {
                  imp.status_id = 'Terminada';
                  imp.color = 'success';
                }else if (imp.status_id === 4) {
                  imp.status_id = 'Cancelada';
                  imp.color = 'brand';
                }else if (imp.status_id === 5) {
                  imp.status_id = 'Revalidado';
                  imp.color = 'info';
                }else if (imp.status_id === 6) {
                  imp.status_id = 'Despacho';
                  imp.color = 'tertiary';
                }else if (imp.status_id === 7) {
                  imp.status_id = 'Rojo';
                  imp.color = 'danger';
                }else if (imp.status_id === 8) {
                  imp.status_id = 'Verde';
                  imp.color = 'success';
                }else if (imp.status_id === 9) {
                  imp.status_id = 'Entregado';
                  imp.color = 'secondary';
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
