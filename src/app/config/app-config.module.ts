import { NgModule, InjectionToken } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';

export let APP_CONFIG = new InjectionToken("app.config");

export class AppConfig {
    apiEndpoint: string;
    options: any;
    
}

export const APP_DEV_CONFIG: AppConfig = {    
    apiEndpoint: "http://localhost:8080/api/",
    options: ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' })}) 
};

export const APP_PROD_CONFIG: AppConfig = {    
    apiEndpoint: "https://www.codeblogue.com/api/",
    options: ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DEV_CONFIG
  }]
})
export class AppConfigModule { }
