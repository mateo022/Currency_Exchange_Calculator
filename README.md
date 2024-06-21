# Currency Converter Project

## Resumen

Este proyecto implementa un conversor de divisas interactivo utilizando Angular y varias tecnologías frontend para calcular el cambio entre diferentes monedas y determinar las denominaciones de billetes y monedas necesarias.

## Funcionalidades Principales

- **Conversión de Divisas:** Calcula el cambio de una moneda a otra utilizando tasas de cambio en tiempo real de la API de Free Currency API.
  
- **Cálculo de Denominaciones:** Determina la cantidad de cada denominación de billetes y monedas necesaria para representar el cambio devuelto en la moneda seleccionada.

- **Interfaz de Usuario Responsiva:** Diseño amigable y responsive utilizando Bootstrap y Angular Material para una experiencia de usuario intuitiva.

## Modelos Utilizados

### Denomination

Representa una denominación específica de billete o moneda con su valor (`value`) y la cantidad (`count`) necesaria.

### CurrencyExchange

Contiene la información detallada del intercambio de divisas, incluyendo el cambio en dólares, el cambio en la moneda seleccionada y las denominaciones calculadas.

## Tecnologías Utilizadas

- **Angular:** Framework de desarrollo frontend.
  
- **Bootstrap y Angular Material:** Para el diseño y componentes de la interfaz de usuario.
  
- **Free Currency API:** Para obtener tasas de cambio en tiempo real.
  
- **TypeScript:** Lenguaje de programación principal.

## Uso

1. Ingresa el monto a pagar en dólares.
2. Ingresa el monto entregado en dólares.
3. Selecciona la moneda de salida para el cambio.
4. Obtén el cambio en la moneda seleccionada y las denominaciones correspondientes.

## Configuración del Proyecto

1. Clona este repositorio.
2. Instala las dependencias utilizando `npm install`.
3. Inicia el servidor de desarrollo con `ng serve`.
4. Accede a la aplicación desde `http://localhost:4200`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar esta aplicación, realiza un fork del repositorio y envía tus pull requests.

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).
