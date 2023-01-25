public with sharing class SportsbookOddsController {
	private static List<Sports_Odds__c> sportsOdds = [SELECT Id, Key__c FROM Sports_Odds__c LIMIT 1];

	@AuraEnabled(Cacheable=true)
	public static String getSports() {
		try {
			String key = sportsOdds.get(0).Key__c;
			String endpoint = 'https://api.the-odds-api.com/v4/sports/?apiKey=' + key;
			System.debug(endpoint);

			Http http = new Http();
			HttpRequest request = new HttpRequest();
			request.setEndpoint(endpoint);
			request.setMethod('GET');
			HttpResponse response = http.send(request);

			if (response.getStatusCode() == 200) {
				System.debug('Success');
				return response.getBody();
			} else {
				System.debug('No Results Returned');
				return '';
			}
		} catch (Exception e) {
			System.debug('Error');
			System.debug(e.getMessage());
			throw new AuraHandledException(e.getMessage());
		}
	}

	@AuraEnabled
	public static String getOdds(String sportKey) {
		try {
			String key = sportsOdds.get(0).Key__c;
			String endpoint =
				'https://api.the-odds-api.com/v4/sports/' +
				sportKey +
				'/odds/?apiKey=' +
				key +
				'&bookmakers=draftkings,betmgm,fanduel,pointsbetus,betrivers,williamhill_us&markets=h2h,spreads,totals';
			System.debug(endpoint);

			Http http = new Http();
			HttpRequest request = new HttpRequest();
			request.setEndpoint(endpoint);
			request.setMethod('GET');
			HttpResponse response = http.send(request);

			if (response.getStatusCode() == 200) {
				System.debug('Success');
				return response.getBody();
			} else {
				System.debug('No Results Returned');
				return '';
			}
		} catch (Exception e) {
			System.debug('Error');
			throw new AuraHandledException(e.getMessage());
		}
	}
}