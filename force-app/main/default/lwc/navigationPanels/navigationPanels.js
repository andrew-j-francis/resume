import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class NavigationPanels extends NavigationMixin(LightningElement) {
	handleNavigate(event) {
		let button = event.currentTarget.dataset.button;
		let pageRef = null;

		switch (button) {
			case "resume":
				pageRef = {
					type: "comm__namedPage",
					attributes: {
						name: "Home"
					}
				};
				break;
			case "lookup":
				pageRef = {
					type: "comm__namedPage",
					attributes: {
						name: "lookup_component__c"
					}
				};
				break;
			case "weather":
				pageRef = {
					type: "comm__namedPage",
					attributes: {
						name: "weather__c"
					}
				};
				break;
			case "currency":
				pageRef = {
					type: "comm__namedPage",
					attributes: {
						name: "currency_converter__c"
					}
				};
				break;
			case "sportsbook":
				pageRef = {
					type: "comm__namedPage",
					attributes: {
						name: "sportsbook_odds__c"
					}
				};
				break;
			default:
				break;
		}

		if (pageRef) {
			this[NavigationMixin.Navigate](pageRef, true);
		}
	}
}