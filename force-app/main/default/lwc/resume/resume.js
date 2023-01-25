import { LightningElement, wire, track } from "lwc";
import getExperiences from "@salesforce/apex/ResumeController.getExperiences";
import getEducation from "@salesforce/apex/ResumeController.getEducation";
import { NavigationMixin } from "lightning/navigation";

export default class Resume extends NavigationMixin(LightningElement) {
	@track experiences = [];
	@track education = [];
	showSpinner = true;

	skills = [
		"Apex",
		"Lightning Web Componets",
		"Aura Components",
		"Sales Cloud",
		"Experience Cloud",
		"Service Cloud",
		"Salesforce CPQ",
		"JavaScript",
		"SOQL",
		"Visualforce",
		"CSS",
		"HTML",
		"Git",
		"DemandTools",
		"Mediafly",
		"Salesforce DX",
		"Jenkins Deployment Software",
		"Flosum Deployment Software"
	];

	@wire(getExperiences) wiredExperiences({ error, data }) {
		if (data) {
			this.processExperiences(data);
		} else if (error) {
			console.log(error);
		}
	}

	@wire(getEducation) wiredEducations({ error, data }) {
		if (data) {
			this.processEducation(data);
		} else if (error) {
			console.log(error);
		}
	}

	processExperiences(experienceList) {
		experienceList.forEach((experience) => {
			let exp = new Object();
			exp.Name = experience.Name;
			exp.StartDate = this.getDate(experience.Start_Date__c);
			exp.EndDate = this.getDate(experience.End_Date__c);
			exp.Details = experience.Details__c;
			exp.CurrentEmployer = experience.Current_Employer__c;
			exp.Company = experience.Company_Name__c;
			this.experiences.push(exp);
		});

		this.showSpinner = false;
	}

	processEducation(educationList) {
		educationList.forEach((education) => {
			let edu = new Object();
			edu.Name = education.Name;
			edu.Date = this.getDate(education.Date__c);
			this.education.push(edu);
		});
		this.showSpinner = false;
	}

	getDate(dateToProcess) {
		if (dateToProcess != null) {
			let processedDate = "";
			switch (dateToProcess.substring(5, 7)) {
				case "01":
					processedDate = "January";
					break;
				case "02":
					processedDate = "February";
					break;
				case "03":
					processedDate = "March";
					break;
				case "04":
					processedDate = "April";
					break;
				case "05":
					processedDate = "May";
					break;
				case "06":
					processedDate = "June";
					break;
				case "07":
					processedDate = "July";
					break;
				case "08":
					processedDate = "August";
					break;
				case "09":
					processedDate = "September";
					break;
				case "10":
					processedDate = "October";
					break;
				case "11":
					processedDate = "November";
					break;
				case "12":
					processedDate = "December";
					break;
			}
			processedDate = processedDate + " " + dateToProcess.substring(0, 4);
			return processedDate;
		} else {
			return "";
		}
	}

	handleDownload() {
		this[NavigationMixin.Navigate](
			{
				type: "standard__webPage",
				attributes: {
					url: "https://andrew-francis-resume-dev-ed.develop.my.salesforce.com/sfc/p/Dn000005J73I/a/Dn000000GnQH/9CfALwmCUyNEigVs51SY2v6xg3pyRpK5yWKP.4xykmg"
				}
			},
			false
		);
	}

	navigateToGithub() {
		this[NavigationMixin.Navigate](
			{
				type: "standard__webPage",
				attributes: {
					url: "https://github.com/andrew-j-francis/resume"
				}
			},
			false
		);
	}
}