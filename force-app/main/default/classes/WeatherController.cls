public without sharing class WeatherController {
	private static List<Open_Weather_Maps__c> weatherMap = [SELECT Id, Key__c FROM Open_Weather_Maps__c LIMIT 1];

	private static Map<String, Object> getCoords(String zipcode) {
		try {
			String key = weatherMap.get(0).Key__c;
			String endpoint = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + zipcode + ',US&appid=' + key;

			Http http = new Http();
			HttpRequest request = new HttpRequest();
			request.setEndpoint(endpoint);
			request.setMethod('GET');
			HttpResponse response = http.send(request);

			if (response.getStatusCode() == 200) {
				Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
				return results;
			} else {
				System.debug(response.getStatus());
				return new Map<String, Object>();
			}
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}

	@AuraEnabled
	public static Map<String, Object> getWeather(String zipcode) {
		try {
			Map<String, Object> coords = WeatherController.getCoords(zipcode);
			String lat = JSON.serialize(coords.get('lat'));
			String lon = JSON.serialize(coords.get('lon'));

			String key = weatherMap.get(0).Key__c;
			String endpoint =
				'http://api.openweathermap.org/data/3.0/onecall?lat=' +
				lat +
				'&lon=' +
				lon +
				'&units=imperial&exclude=minutely,alerts&appid=' +
				key;

			Http http = new Http();
			HttpRequest request = new HttpRequest();
			request.setEndpoint(endpoint);
			request.setMethod('GET');
			HttpResponse response = http.send(request);

			if (response.getStatusCode() == 200) {
				Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
				return results;
			} else {
				System.debug(response.getStatus());
				return new Map<String, Object>();
			}
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}
}