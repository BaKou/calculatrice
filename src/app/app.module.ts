import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { ButtonComponent } from './shared/button/button.component';
import { LogDirective } from './tdd-calculatrice/directives/log.directive';
import { AdditionDirective } from './tdd-calculatrice/directives/addition.directive';
import { MultiplyDirective } from './tdd-calculatrice/directives/multiply.directive';
import { DiviseDirective } from './tdd-calculatrice/directives/divise.directive';
import { SoustratDirective } from './tdd-calculatrice/directives/soustrat.directive';
import { CalculatriceTddComponent } from './tdd-calculatrice/calculatrice/calculatrice.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatriceComponent,
    CalculatriceTddComponent,
    ButtonComponent,
    LogDirective,
    AdditionDirective,
    MultiplyDirective,
    DiviseDirective,
    SoustratDirective
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
