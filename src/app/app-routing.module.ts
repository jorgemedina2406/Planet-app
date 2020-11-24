import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from './services/guards/login-guards.guard';
import { GuestGuardGuard } from './services/guards/guest-guards.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    // canActivate: [ GuestGuardGuard ],
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule', data: { animation: 'isRight' } },
  { path: 'forgot-password', loadChildren: './auth/password/password.module#PasswordPageModule', data: { animation: 'isLeft' } },
  { path: 'reset-password', loadChildren: './auth/reset/reset.module#ResetPageModule' },
  // { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  // {
  //   path: 'dashboard',
  //     canActivate: [ LoginGuardGuard ],
  //     loadChildren: './dashboard/dashboard.module#DashboardPageModule',
  //     data: { animationState: 'Dashboard' }
  // },
  // { path: 'exports',
  //   canActivate: [ LoginGuardGuard ],
  //   loadChildren: './listexports/listexports.module#ListExportsPageModule',
  //   data: { animationState: 'Exports' }
  // },
  // {
  //   path: 'imports',
  //   loadChildren: './listimports/listimports.module#ListImportsPageModule',
  //   data: { animationState: 'Imports' }
  // },
  // {
  //   path: 'notifications',
  //   loadChildren: './listnotifications/listnotifications.module#ListNotificationsPageModule',
  //   data: { animationState: 'Notifications' }
  // },
  // { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  // { path: 'export/:id', loadChildren: './export/export.module#ExportPageModule' },
  // { path: 'import/:id', loadChildren: './import/import.module#ImportPageModule' },
  // { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  // { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
  // {
  //   path: 'profile',
  //   // canActivate: [ LoginGuardGuard, VerifyTokenGuard ],
  //   loadChildren: './profile/profile.module#ProfilePageModule'
  // },
  // { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
  // { path: 'info-app', loadChildren: './info-app/info-app.module#InfoAppPageModule' },
  // { path: 'question', loadChildren: './question/question.module#QuestionPageModule' },
  {
    path: 'second/:id/:status/:observation/:referencia',
    canActivate: [ LoginGuardGuard ],
    loadChildren: './second/second.module#SecondPageModule'
  },
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginPageModule',
    // canActivate: [ GuestGuardGuard ]
  },
  { 
    path: 'menu', 
    loadChildren: './menu/menu.module#MenuPageModule' 
  },
  {
    path: 'second',
    loadChildren: () => import('./second/second.module').then( m => m.SecondPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
