import { LightningElement } from "lwc";
import getWeather from "@salesforce/apex/WeatherController.getWeather";

export default class Weather extends LightningElement {
	zipcode = "";
	submittedZip = "";
	forecasts;
	spinner = false;
	icon = "";

	getWeather() {
		this.spinner = true;
		this.submittedZip = this.zipcode;

		getWeather({ zipcode: this.zipcode })
			.then((result) => {
				if (JSON.stringify(result) == "{}") {
					throw "Incorrect Zip Code";
				} else {
					this.forecasts = result;
					this.forecasts.daily.shift();

					this.forecasts.daily.splice(3);
					this.spinner = false;
				}
			})
			.catch((error) => {
				console.log(error);
				this.forecasts = null;
				this.spinner = false;
			});
	}

	handleChange(event) {
		this.zipcode = event.target.value;
	}
}