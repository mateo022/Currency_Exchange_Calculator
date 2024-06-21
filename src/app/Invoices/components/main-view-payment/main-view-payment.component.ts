import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  currencies: string[] = ['EUR', 'GBP', 'JPY', 'AUD'];
  result: CurrencyExchange | null = null;
  denominations: { [key: string]: number[] } = {};

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,private snackbarService: SnackBarService
  ) {}

  ngOnInit() {
    this.exchangeForm = this.fb.group({
      payableAmount: [''],
      givenAmount: [''],
      currency: ['EUR']
    });

    this.loadDenominations();
  }

// Uso de servicio para obtener la denaminaciones por cada pais
  loadDenominations() {
    this.paymentService.getDenominations().subscribe(data => {
      this.denominations = data;
    });
  }

  // Boton para enviar los datos
  onSubmit() {
    // Verifica si el formulario es inválido
    if (this.exchangeForm.invalid) {
      return;
    }
  
    // Obtiene los valores del formulario
    const payableAmount = this.exchangeForm.value.payableAmount;
    const givenAmount = this.exchangeForm.value.givenAmount;
    const currency = this.exchangeForm.value.currency;
  
    // Valida que el monto entregado sea mayor o igual al monto a pagar
    if (givenAmount < payableAmount) {
      // Muestra un mensaje de error utilizando un servicio de snackbar
      this.snackbarService.openSnackBar('El valor entregado debe ser mayor o igual al valor a pagar.');
      return; // Sale de la función si hay un error de validación
    }
  
    // Calcula el cambio en dólares
    const changeInUSD = givenAmount - payableAmount;
  
    // Llama al servicio para obtener la tasa de cambio para la moneda seleccionada
    this.paymentService.getExchangeRate(currency).subscribe((response: any) => {
      // Extrae la tasa de cambio desde la respuesta
      const exchangeRate = response.data[currency];
  
      // Calcula el cambio en la moneda seleccionada redondeando al entero más cercano
      const changeInCurrency = Math.round(changeInUSD * exchangeRate);
  
      // Calcula las denominaciones de billetes y monedas para el cambio
      const denominations = this.calculateDenominations(changeInCurrency, currency);
  
      // Asigna el resultado calculado al objeto 'result' para mostrar en la interfaz
      this.result = {
        changeInUSD,
        changeInCurrency,
        denominations,
        currency
      };
    });
  }
  // Funcipin para calcular los billetes a devolver segun el cambio y la moneda que llegan por parametros
  calculateDenominations(change: number, currency: string): Denomination[] {
    // Array donde se almacenarán las denominaciones y cantidades resultantes
    const result: Denomination[] = []; 
    // Obtener las denominaciones según la moneda seleccionada o usar USD por defecto
    const currencyDenominations = this.denominations[currency] || this.denominations['USD']; 
  
    // Iterar sobre cada denominación disponible para la moneda seleccionada
    for (const denom of currencyDenominations) {
      // Calcular cuántas veces cabe la denominación actual en el cambio restante
      const count = Math.floor(change / denom);
      
      // Si la cantidad de esta denominación es mayor que cero, agregarla al resultado
      if (count > 0) {
        result.push({ value: denom, count }); // Agregar objeto Denomination al resultado
        change -= count * denom; // Actualizar el cambio restante restando el valor total de esta denominación
      }
    }
  
    return result; // Retornar el array de denominaciones y cantidades calculadas
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