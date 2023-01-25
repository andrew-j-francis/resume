import { LightningElement, api } from "lwc";

export default class DailyWeather extends LightningElement {
	@api forecast;
	get icon() {
		return "https://openweathermap.org/img/wn/" + this.forecast.weather[0].icon + "@2x.png";
	}

	get date() {
		let date = new Date(this.forecast.dt * 1000);

		return date.getMonth() + 1 + "/" + date.getDate();
	}
}