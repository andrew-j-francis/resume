import { LightningElement, wire } from "lwc";
import getSports from "@salesforce/apex/ArbitrageController.getSports";

export default class SportsLookup extends LightningElement {
	spinner = true;
	sports;
	filteredSports = [];

	searchInput = "";
	selectedSportKey;
	selectedSportLabel;

	inputFieldHasFocus = false;
	cancelBlur = false;

	@wire(getSports) wiredSports({ error, data }) {
		if (data) {
			this.sports = JSON.parse(data).filter((sport) => sport.has_outrights == false);
			this.filteredSports = this.sports;
			this.spinner = false;
		} else if (error) {
			console.log(error);
			this.spinner = false;
		}
	}

	handleInput(event) {
		this.searchInput = event.currentTarget.value;

		if (this.searchInput.length >= 1) {
			this.search();
		} else {
			this.filteredSports = this.sports;
		}
	}

	search() {
		this.filteredSports = [];

		this.sports.forEach((sport) => {
			let name = String(sport.title).toLowerCase();
			let group = String(sport.group).toLowerCase();

			if (name.includes(this.searchInput.toLowerCase()) || group.includes(this.searchInput.toLowerCase())) {
				this.filteredSports.push(sport);
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
		this.selectedSportKey = event.currentTarget.dataset.key;
		this.selectedSportLabel = event.currentTarget.dataset.label;

		this.dispatchEvent(new CustomEvent("select", { detail: this.selectedSportKey }));
	}

	remove() {
		this.searchInput = "";
		this.selectedSportKey = null;
		this.selectedSportLabel = null;
		this.cancelBlur = false;
		this.inputFieldHasFocus = false;
		this.filteredSports = this.sports;

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

		if (this.selectedSportKey) {
			classes.push("slds-has-selection");
		}

		return classes.join(" ");
	}

	get comboboxFormElementClasses() {
		const classes = ["slds-combobox__form-element", "slds-input-has-icon"];

		if (this.selectedSportKey) {
			classes.push("slds-input-has-icon_left-right");
		} else {
			classes.push("slds-input-has-icon_right");
		}

		return classes.join(" ");
	}

	get showListBox() {
		return this.inputFieldHasFocus && !Boolean(this.selectedSportKey);
	}
}