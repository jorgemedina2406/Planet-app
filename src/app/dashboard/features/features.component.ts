import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ExportsService } from '../../services/export.service';
import { ImportsService } from '../../services/import.service';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnChanges {

  @Input()
  refresh;

  properties: any[] = [];
  imports;
  exports;

  constructor(
    public exportService: ExportsService,
    public importService: ImportsService,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions
  ) {

    if ( this.refresh ) {
      // this.getPropertiesFeatures();
    }
  }

  ngOnInit() {
    this.getImports();
    this.getExports();
  }

  navigatePage( url ) {
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
    this.navCtrl.navigateForward(url);

  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  getImports() {

    this.importService.getImportsByUser()
            .subscribe( (resp: any) => {
              this.imports = resp;
            });
  }

  getExports() {
    this.exportService.getExportsByUser()
            .subscribe( (resp: any) => {
              this.exports = resp;
            });
  }

  // doRefresh(event) {
  //   setTimeout(() => {
  //     event.target.complete();
  //   }, 2000);
  // }

}
