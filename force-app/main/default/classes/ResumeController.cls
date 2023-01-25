public without sharing class ResumeController {
	@AuraEnabled(cacheable=true)
	public static List<Experience__c> getExperiences() {
		try {
			return [
				SELECT Id, Details__c, End_Date__c, Start_Date__c, Current_Employer__c, Company_Name__c, Name
				FROM Experience__c
				WITH SECURITY_ENFORCED
				ORDER BY Start_Date__c DESC
			];
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}

	@AuraEnabled(cacheable=true)
	public static List<Education__c> getEducation() {
		try {
			return [SELECT Id, Name, Date__c FROM Education__c WITH SECURITY_ENFORCED ORDER BY Date__c ASC];
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}
}