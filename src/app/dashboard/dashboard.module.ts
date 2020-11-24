import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { FeaturesComponent } from './features/features.component';
import { PipesModule } from '../pipes/pipes.module';


const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    // AutoCompleteModule
  ],
  declarations: [
    DashboardPage,
    FeaturesComponent,
    
  ],
  providers: []
})
export class DashboardPageModule {}
