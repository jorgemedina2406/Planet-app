import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { LoginGuardGuard } from '../services/guards/login-guards.guard';
import { VerifyTokenGuard } from '../services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    // canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule',
        data: { animationState: 'Dashboard' }
      },
      { path: 'exports',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../listexports/listexports.module#ListExportsPageModule',
        data: { animationState: 'Exports' }
      },
      {
        path: 'imports',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../listimports/listimports.module#ListImportsPageModule',
        data: { animationState: 'Imports' }
      },
      {
        path: 'notifications',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../listnotifications/listnotifications.module#ListNotificationsPageModule',
        data: { animationState: 'Notifications' }
      },
      { 
        path: 'search',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../search/search.module#SearchPageModule'
      },
      { 
        path: 'export/:id',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../export/export.module#ExportPageModule' 
      },
      { 
        path: 'import/:id',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../import/import.module#ImportPageModule' 
      },
      { 
        path: 'account',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../account/account.module#AccountPageModule' 
      },
      { 
        path: 'contact',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../contact/contact.module#ContactPageModule' 
      },
      { 
        path: 'help',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../help/help.module#HelpPageModule' 
      },
      {
        path: 'profile',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      { 
        path: 'terms',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../terms/terms.module#TermsPageModule' 
      },
      { 
        path: 'info-app',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../info-app/info-app.module#InfoAppPageModule' 
      },
      { 
        path: 'question',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../question/question.module#QuestionPageModule' 
      },
      {
        path: 'second/:id/:status/:observation/:referencia',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../second/second.module#SecondPageModule'
      },
      // {
      //   path: 'messages',
      //   canActivate: [ LoginGuardGuard, VerifyTokenGuard ],
      //   loadChildren: '../messages/messages.module#MessagesPageModule'
      // },
      // {
      //   path: 'message/:id',
      //   canActivate: [ LoginGuardGuard, VerifyTokenGuard ],
      //   loadChildren: '../message/message.module#MessagePageModule'
      // },

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
