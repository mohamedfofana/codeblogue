import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { LogoutComponent } from './auth/logout.component';
import { SocialAuthComponent } from './auth/social-auth.component';
import { ContactComponent } from './contact/contact.component';
import { ResultSearchComponent } from './search/result-search/result-search.component';

const appRoutes: Routes = [
      { path: 'home', component: HomeComponent },
      { path: 'signin', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'auth/:group', component: SocialAuthComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'resultSearch', component: ResultSearchComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]

})

export class AppRoutingModule{}
