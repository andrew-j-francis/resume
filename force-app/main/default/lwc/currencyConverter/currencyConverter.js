import { LightningElement } from "lwc";
import getExchangeRates from "@salesforce/apex/CurrencyConverterController.getExchangeRates";

export default class CurrencyConverter extends LightningElement {
	spinner = false;

	amount = 0;
	convertFrom = "";
	convertTo = "";
	selectedFrom = "";
	selectedTo = "";
	conversion;

	handleInputChange(event) {
		this.amount = event.target.value;
	}

	convertCurrency() {
		if (!this.amount || !this.convertFrom || !this.convertTo) {
			return;
		} else {
			this.spinner = true;
			getExchangeRates({ amount: this.amount, convertFrom: this.convertFrom, convertTo: this.convertTo })
				.then((result) => {
					this.selectedFrom = this.convertFrom;
					this.selectedTo = this.convertTo;
					this.conversion = JSON.parse(result);
					this.spinner = false;
				})
				.catch((error) => {
					console.log(error);
					this.spinner = false;
				});
		}
	}

	handleToSelect(event) {
		this.convertTo = event.detail;
	}

	handleFromSelect(event) {
		this.convertFrom = event.detail;
	}
}