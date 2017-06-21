import { NgModule, InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken("app.config");

export class AppConfig {
    apiEndpoint: string;
    
}

export const APP_DEV_CONFIG: AppConfig = {    
    apiEndpoint: "http://localhost:8080/api/"    
};

export const APP_PROD_CONFIG: AppConfig = {    
    apiEndpoint: "http://localhost:8080/api/"    
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DEV_CONFIG
  }]
})
export class AppConfigModule { }
