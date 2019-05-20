import { NgModule, InjectionToken } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';

export let APP_CONFIG = new InjectionToken("app.config");

export class AppConfig {
    apiEndpoint: string;
    authOptions: any;
    options: any;

}

export const APP_DEV_CONFIG: AppConfig = {
    apiEndpoint: "http://localhost:8080/api/",
    authOptions: ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append('Access-Control-Allow-Origin', '*')}),
    options: ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  };

  export const APP_PROD_CONFIG: AppConfig = {
    apiEndpoint: "https://www.codeblogue.com/api/",
    authOptions: ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append('Access-Control-Allow-Origin', '*')}),
    options: ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_PROD_CONFIG
  }]
})
export class AppConfigModule { }
