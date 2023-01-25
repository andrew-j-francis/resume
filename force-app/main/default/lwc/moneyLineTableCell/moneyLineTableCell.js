import { LightningElement, api } from "lwc";

export default class OddsTableBookmakerOdds extends LightningElement {
    @api bookmaker;
    @api game;
    @api market;

    get homeTeamOdds() {
        try{
            let bookmakerOdds = this.game.bookmakers.find((bookmaker) => bookmaker.key === this.bookmaker);
            let homeTeamOdds;
            switch (this.market) {
                case "h2h":
                    homeTeamOdds = bookmakerOdds.markets[0].outcomes.find((team) => team.name === this.game.home_team);
                    return homeTeamOdds.price;
                case "spreads":
                    homeTeamOdds = bookmakerOdds.markets[1].outcomes.find((team) => team.name === this.game.home_team);
                    return homeTeamOdds.point + " - " + homeTeamOdds.price;
                case "totals":
                    homeTeamOdds = bookmakerOdds.markets[2].outcomes.find((over) => over.name === "Over");
                    return "O " + homeTeamOdds.point + " - " + homeTeamOdds.price;
                default:
                    return "";
            }
        } catch(error){
           return "";
        }
    }

    get awayTeamOdds() {
        try{
            let bookmakerOdds = this.game.bookmakers.find((bookmaker) => bookmaker.key === this.bookmaker);
            let awayTeamOdds;
            switch (this.market) {
                case "h2h":
                    awayTeamOdds = bookmakerOdds.markets[0].outcomes.find((team) => team.name === this.game.away_team);
                    return awayTeamOdds.price;
                case "spreads":
                    awayTeamOdds = bookmakerOdds.markets[1].outcomes.find((team) => team.name === this.game.away_team);
                    return awayTeamOdds.point + " - " + awayTeamOdds.price;
                case "totals":
                    awayTeamOdds = bookmakerOdds.markets[2].outcomes.find((under) => under.name === "Under");
                    return "U " + awayTeamOdds.point + " - " + awayTeamOdds.price;
                default:
                    return "";
            }

        } catch(error){
            return "";
        }
    }
}
