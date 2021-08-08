import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { Calculatrice2Component } from './calculatrice2/calculatrice2/calculatrice2.component';
import { TableComponent } from './blackjack/table/table.component';
import { PlayerComponent } from './blackjack/player/player.component';

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
    SoustratDirective,
    Calculatrice2Component,
    TableComponent,
    PlayerComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
