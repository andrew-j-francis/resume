import { LightningElement } from "lwc";
import getOdds from "@salesforce/apex/SportsbookOddsController.getOdds"

export default class SportsbookOdds extends LightningElement {
    sportKey = "";
    odds;
    bookmakers = [
        {
            name: "Draft Kings",
            key: "draftkings"
        },
        {
            name: "MGM",
            key: "betmgm"
        },
        {
            name: "Fan Duel",
            key: "fanduel"
        },
        {
            name: "Bet Rivers",
            key: "betrivers"
        },
        {
            name: "Caesers",
            key: "williamhill_us"
        }
    ];

    handleSportSelect(event) {
        this.sportKey = event.detail;
    }

    retrieveOdds() {
        if (this.sportKey) {
            getOdds({ sportKey: this.sportKey })
                .then((result) => {
                    this.odds = JSON.parse(result);
                    if (this.odds === []) {
                        this.odds = null;
                    } else {
                        return this.odds;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

}
