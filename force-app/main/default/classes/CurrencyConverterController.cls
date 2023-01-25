public without sharing class CurrencyConverterController {
	private static List<Exchange_Rates__c> erc = [SELECT Id, Key__c FROM Exchange_Rates__c LIMIT 1];

	@AuraEnabled
	public static String getExchangeRates(Double amount, String convertFrom, String convertTo) {
		try {
			String key = erc.get(0).Key__c;
			String endpoint = 'https://api.apilayer.com/exchangerates_data/convert?to=' + convertTo + '&from=' + convertFrom + '&amount=' + amount;

			System.debug(endpoint);
			Http http = new Http();
			HttpRequest request = new HttpRequest();
			request.setEndpoint(endpoint);
			request.setMethod('GET');
			request.setHeader('apikey', key);
			HttpResponse response = http.send(request);

			if (response.getStatusCode() == 200) {
				System.debug(response.getBody());
				return response.getBody();
			} else {
				System.debug(response.getStatus());
				return '';
			}
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}
}