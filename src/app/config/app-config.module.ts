import { NgModule, InjectionToken } from "@angular/core";
import { Headers, RequestOptions } from '@angular/http';

export let APP_CONFIG = new InjectionToken("app.config");

export class AppConfig {
    apiEndpoint: string;
   // headers: Headers;
    //options: RequestOptions;
    
}

export const APP_DEV_CONFIG: AppConfig = {    
    apiEndpoint: "http://localhost:8080/api/"
  /*  headers: new Headers({ 'Content-Type': 'application/json' }),
    options: new RequestOptions(new Headers({ 'Content-Type': 'application/json',
                                              'Access-Control-Allow-Origin': '*',
                                              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                                              'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept' }))   
*/
};

export const APP_PROD_CONFIG: AppConfig = {    
    apiEndpoint: "https://www.codeblogue.com/api/"
  /*  headers: new Headers({ 'Content-Type': 'application/json' }),
    options: new RequestOptions({ headers: this.headers })     
*/
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DEV_CONFIG
  }]
})
export class AppConfigModule { }
