import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalculatorService} from "./services/calculator.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CardsDisplayComponent} from "./components/cards-display/cards-display.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/token.interceptor";
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";

@NgModule({
	declarations: [
		AppComponent,

		CalculatorComponent,
		CardsDisplayComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatButtonModule,
		HttpClientModule,
		FormsModule,
		MatListModule,
		MatCardModule
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
		CalculatorService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
