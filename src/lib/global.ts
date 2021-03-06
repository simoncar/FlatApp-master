import _ from "lodash";
const moment = require("moment");
import "moment/min/locales";

export function isValue(input) {
	if (undefined !== input && input !== null && input.length > 0) {
		return true;
	} else {
		return false;
	}
}

export function isURL(str: string) {
	if (!str) return false;
	var pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
		"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
		"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
		"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
		"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
		"(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
	return pattern.test(str);
}

export function formatTime(startTime: string, endTime: string) {
	var ret = "";

	if (startTime === null && typeof startTime === "object") {
		ret = "";
	} else {
		if (undefined != startTime && startTime.length > 0) {
			ret = startTime
			if (undefined != endTime && endTime.length > 0) {
				ret = ret + " - " + endTime;
			}
		} else {
			ret = "";
		}
	}

	ret = _.isNil(ret) ? "" : ret;
	return ret;
}

export function formatMonth(eventDate: string) {
	var ret = "";

	if (eventDate === null && typeof eventDate === "object") {
		ret = "";
	} else {
		if (undefined != eventDate && eventDate.length > 1) {
			ret = moment(eventDate, "YYYY-MM-DD").format("MMMM Do YYYY");
		} else {
			ret = "";
		}
	}

	return ret;
}

export function getAbbreviations(eventDetails: string, domain: string) {

	var ret = "";
	if (eventDetails == undefined || domain != "sais_edu_sg") {
		return ret;
	}

	if (eventDetails.includes("UE")) {
		ret = ret + "\nUE - Upper Elementary (Grade 3 to Grade 5) ";
	}

	if (eventDetails.includes("LE")) {
		ret = ret + "\nLE - Lower Elementary (Kindergarten 2 to Grade 2) ";
	}

	if (eventDetails.includes("EY")) {
		ret = ret + "\nEY - Early Years (Pre-Nursery to Kindergarten 1)  ";
	}

	if (eventDetails.includes("SS")) {
		ret = ret + "\nSS - Senior School (Grade 6 and up) ";
	}

	if (eventDetails.includes("HS")) {
		ret = ret + "\nHS - High School (Grades 9 - 12) ";
	}

	if (eventDetails.includes("MS")) {
		ret = ret + "\nMS - Middle School (Grades 6- 8)";
	}

	if (eventDetails.includes("AP") && !eventDetails.includes("MAP")) {
		ret = ret + "\nAP - Advanced Placement ";
	}

	if (eventDetails.includes("DP")) {
		ret = ret + "\nDP - Diploma Program ";
	}

	if (eventDetails.includes("CCA")) {
		ret = ret + "\nCCA - Co Curricular activities ";
	}

	if (eventDetails.includes("PTA")) {
		ret = ret + "\nPTA - Parent Teacher Association  ";
	}

	if (eventDetails.includes("PYP")) {
		ret = ret + "\nPYP - Primary Years Program ";
	}

	if (eventDetails.includes("MYP")) {
		ret = ret + "\nMYP - Middle Years Program ";
	}

	if (eventDetails.includes("PTC")) {
		ret = ret + "\nPTC - Parent Teacher Conferences ";
	}

	if (eventDetails.includes("CIS")) {
		ret = ret + "\nCIS - Community Information Session ";
	}

	if (eventDetails.includes("MAP")) {
		ret = ret + "\nMAP - Measure of Academic Progress ";
	}

	if (eventDetails.includes("ELV")) {
		ret = ret + "\nELV - Early Learning Village ";
	}
	if (eventDetails.includes("SEASAC")) {
		ret = ret + "\nSEASAC - South East Asia Student Activities Conference ";
	}

	if (eventDetails.includes("S.E.A")) {
		ret = ret + "\nSEA - South East Asia";
	}

	return ret;
}

export function getParameterByName(name, url) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getLanguageString(language, object, field) {
	language = language ? language : "en";
	const fieldName = field + language.toUpperCase();
	return object[fieldName] || object[field];
}
