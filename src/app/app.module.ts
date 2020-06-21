import {NgModule, Provider} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {SharedModule} from './shared/shared.module'

import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component'
import {HomePageComponent} from './home-page/home-page.component'
import {PostPageComponent} from './post-page/post-page.component'
import {PostComponent} from './shared/components/post/post.component'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {AuthInterceptor} from './shared/auth.interceptor'

import {registerLocaleData} from '@angular/common'
import ruLocale from '@angular/common/locales/ru';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'


registerLocaleData(ruLocale, 'ru')

const HTTP_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HTTP_INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule {
}
