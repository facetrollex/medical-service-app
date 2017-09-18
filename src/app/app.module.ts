import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './services/local-storage.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
