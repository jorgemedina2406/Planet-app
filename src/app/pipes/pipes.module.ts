import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ImagePipe } from './image.pipe';
import { SlugifyPipe } from './slugify.pipe';
import { SafePipe } from './safe.pipe';
import { SortByPipe } from './sortBy.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    SlugifyPipe,
    SafePipe,
    SortByPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ImagePipe,
    SlugifyPipe,
    SafePipe,
    SortByPipe
  ]
})
export class PipesModule { }
