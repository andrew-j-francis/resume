import { LightningElement, api } from "lwc";

export default class OddsTable extends LightningElement {
    marketIndex = 0;
    markets = [
        {
            key: "h2h",
            name: "Moneyline"
        },
        {
            key: "spreads",
            name: "Spreads"
        },
        {
            key: "totals",
            name: "Over/Under"
        }
    ];
    @api odds;
    @api bookmakers;

    get market(){
        return this.markets[this.marketIndex].key;
    }

    cycleOddsForwards(){
        this.marketIndex = (this.marketIndex + 1) % 3;
    }

    cycleOddsBackwards(){
        this.marketIndex = (((this.marketIndex - 1) % 3) + 3) % 3;
    }

    get tableLabel(){
       return this.markets[this.marketIndex].name;
    }
}