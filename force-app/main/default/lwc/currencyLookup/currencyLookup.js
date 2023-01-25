import { LightningElement, api } from "lwc";

export default class CurrencyLookup extends LightningElement {
	@api label = "";

	searchInput = "";
	currencies = [
		{
			symbol: "AUD",
			name: "Australian Dollar"
		},
		{
			symbol: "CAD",
			name: "Canadian Dollar"
		},
		{
			symbol: "CHF",
			name: "Swiss Franc"
		},
		{
			symbol: "CNY",
			name: "Chinese Yen"
		},
		{
			symbol: "EUR",
			name: "Euro"
		},
		{
			symbol: "GBP",
			name: "British Pound"
		},

		{
			symbol: "JPY",
			name: "Japanese Yen"
		},
		{
			symbol: "USD",
			name: "US Dollar"
		}
	];
	filteredCurrencies = [];
	selectedCurrency;

	inputFieldHasFocus = false;
	cancelBlur = false;

	connectedCallback() {
		this.filteredCurrencies = this.currencies;
	}

	handleInput(event) {
		this.searchInput = event.currentTarget.value;

		if (this.searchInput.length >= 1) {
			this.search();
		} else {
			this.filteredCurrencies = this.currencies;
		}
	}

	search() {
		this.filteredCurrencies = [];

		this.currencies.forEach((currency) => {
			let name = String(currency.name).toLowerCase();
			let symbol = String(currency.symbol).toLowerCase();

			if (name.includes(this.searchInput.toLowerCase()) || symbol.includes(this.searchInput.toLowerCase())) {
				this.filteredCurrencies.push(currency);
			}
		});
	}

	handleBlur() {
		if (!this.cancelBlur) {
			this.inputFieldHasFocus = false;
		}
	}

	handleFocus() {
		this.inputFieldHasFocus = true;
	}

	handleMouseDown() {
		this.cancelBlur = true;
	}

	handleMouseUp() {
		this.cancelBlur = false;
	}

	handleSelect(event) {
		this.selectedCurrency = event.currentTarget.dataset.symbol;

		this.dispatchEvent(new CustomEvent("select", { detail: this.selectedCurrency }));
	}

	remove() {
		this.searchInput = "";
		this.selectedCurrency = null;
		this.cancelBlur = false;
		this.inputFieldHasFocus = false;
		this.filteredCurrencies = this.currencies;

		this.dispatchEvent(new CustomEvent("select", { detail: null }));
	}

	get comboboxClasses() {
		const classes = ["slds-combobox", "slds-dropdown-trigger", "slds-dropdown-trigger_click"];

		if (this.showListBox) {
			classes.push("slds-is-open");
		}

		return classes.join(" ");
	}

	get comboboxContainerClasses() {
		const classes = ["slds-combobox_container"];

		if (this.selectedCurrency) {
			classes.push("slds-has-selection");
		}

		return classes.join(" ");
	}

	get comboboxFormElementClasses() {
		const classes = ["slds-combobox__form-element", "slds-input-has-icon"];

		if (this.selectedCurrency) {
			classes.push("slds-input-has-icon_left-right");
		} else {
			classes.push("slds-input-has-icon_right");
		}

		return classes.join(" ");
	}

	get showListBox() {
		return this.inputFieldHasFocus && !Boolean(this.selectedCurrency);
	}
}