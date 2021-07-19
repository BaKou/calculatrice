import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { ButtonComponent } from './shared/button/button.component';

@NgModule({
  declarations: [AppComponent, CalculatriceComponent, ButtonComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
