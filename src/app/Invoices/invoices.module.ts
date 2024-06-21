import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MainViewPaymentComponent } from './components/main-view-payment/main-view-payment.component';
import { InvoiceRoutingModule } from './invoices-routing.module';



@NgModule({
  declarations: [
    MainViewPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InvoiceRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class InvoiceModule { }
