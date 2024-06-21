import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainViewPaymentComponent } from './components/main-view-payment/main-view-payment.component';


const routes: Routes = [
  {
    path: 'payment',
    children: [
      {path: '', component: MainViewPaymentComponent , title: 'Payment'},
    { path: '', redirectTo: '', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
