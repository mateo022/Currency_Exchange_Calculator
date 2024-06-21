import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from "./shared/shared.module";
import { BasicLayoutComponent } from "./layouts/basic-layout/basic-layout.component";
import { InvoiceModule } from "./Invoices/invoices.module";


@NgModule({
  declarations: [
      AppComponent,
      BasicLayoutComponent
  ],
  providers: [
      provideAnimationsAsync()
  ],  
  bootstrap: [AppComponent],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
      InvoiceModule
  ]
})
export class AppModule { }