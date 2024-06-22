import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { CurrencyExchange, Denomination } from '../../models/payment.model';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-main-view-payment',
  templateUrl: './main-view-payment.component.html',
  styleUrl: './main-view-payment.component.css'
})
export class MainViewPaymentComponent implements OnInit {
  exchangeForm!: FormGroup;
  currencies: string[] = [];
  result: CurrencyExchange | null = null;
  denominations: { [key: string]: Denomination[] } = {};
  sufficientBills: boolean = true;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private snackbarService: SnackBarService // Asegúrate de importar y declarar correctamente el servicio de snackbar
  ) {}

  ngOnInit(): void {
    this.exchangeForm = this.fb.group({
      payableAmount: ['', [Validators.required, Validators.min(0.01)]],
      givenAmount: ['', [Validators.required, Validators.min(0.01)]],
      currency: ['', Validators.required]
    });

    this.loadDenominations();
  }

  loadDenominations() {
    this.paymentService.getDenominations().subscribe(data => {
      this.denominations = data;
      this.currencies = Object.keys(data);
    });
  }
  onSubmit() {
    if (this.exchangeForm.invalid) {
      return;
    }

    const payableAmount = this.exchangeForm.value.payableAmount;
    const givenAmount = this.exchangeForm.value.givenAmount;
    const currency = this.exchangeForm.value.currency;

    if (givenAmount < payableAmount) {
      this.snackbarService.openSnackBar('El valor entregado debe ser mayor o igual al valor a pagar.');
      return;
    }

    const changeInUSD = givenAmount - payableAmount;

    this.paymentService.getExchangeRate(currency).subscribe((response: any) => {
      const exchangeRate = response.data[currency];
      const changeInCurrency = Math.round(changeInUSD * exchangeRate);
      const denominations = this.calculateDenominations(changeInCurrency, currency);

      if (denominations.length > 0) {
        this.result = {
          changeInUSD,
          changeInCurrency,
          denominations,
          currency
        };
      } else {
        this.snackbarService.openSnackBar('No hay suficientes billetes disponibles para devolver el cambio exacto.');
        this.result = null; 
      }
    });
  }

  calculateDenominations(change: number, currency: string): Denomination[] {
    const result: Denomination[] = [];
    const currencyDenominations = this.denominations[currency] || [];

    for (const denom of currencyDenominations) {
      let count = Math.floor(change / denom.value);

      if (count > denom.available) {
        count = denom.available;
      }

      if (count > 0) {
        result.push({ value: denom.value, available: denom.available, count });
        change -= count * denom.value;
        denom.available -= count;
      }
    }

    return result;
  }

  resetForm() {
    this.exchangeForm.reset({
      payableAmount: '',
      givenAmount: '',
      currency: 'EUR'
    });
    this.result = null;
  }
}