import { getRootModulUrl } from "./url-helpers";

/**
 * create a json-ld element in head of document with schema.org course.
 * @param {object} allevents from getAllEvents()
 */
export function setJsonLd(allEvents) {

    let ld = [];
    let areas = Object.values(allEvents.areas);
    
    areas.forEach(area => {
        area.events.forEach(event => {
            let course = {};
            course['@context'] = 'https://schema.org/';
            course['@type'] = 'Course';
            course['name'] = event.Designation;
            course['description'] = getDescription(event);
            course['courseCode'] = event.Number;
            course['offers'] = [{type: 'Offer', category: event.Price > 0 ? 'Paid' : 'Free', price: event.Price}];
            course['hasCourseInstance'] = [{type: 'CourseInstance',courseMode: 'Blended', courseWorkload: millisecondsToISO8601Duration(Math.abs(event.From - event.To)) }];
            course['provider'] = {type: 'Organization', name: event.Host};
            course['url'] = getRootModulUrl() + '#/uid/' + event.Id;
    
            ld.push(course);
        });
    
    });

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(ld);
    document.getElementsByTagName('head')[0].appendChild(script);
}

function getDescription(event){
    let description = event.EventCategory + ';';
    event.texts.forEach(text => {
        description = description + text.label + ':' + text.memo + ';';
    });
    return description;
}

/**
 * https://github.com/wking/milliseconds-to-iso-8601-duration/tree/master
 * @param {*} milliseconds 
 * @returns 
 */
function millisecondsToISO8601Duration(milliseconds) {
		if (milliseconds == 0) {
			return 'P0D';
		}
		var offset = Math.floor(milliseconds);
		var days = 0;
		if (offset < 0) {
			days = Math.floor(offset % 86400000);
			offset -= 86400000 * days;
		}
		var milliseconds = offset % 1000;
		offset = Math.floor(offset / 1000);
		var seconds = offset % 60;
		offset = Math.floor(offset / 60);
		var minutes = offset % 60;
		offset = Math.floor(offset / 60);
		var hours = offset % 24;
		days += Math.floor(offset / 24);
		var parts = ['P'];
		if (days) {
			parts.push(days + 'D');
		}
		if (hours || minutes || seconds || milliseconds) {
			parts.push('T');
			if (hours) {
				parts.push(hours + 'H');
			}
			if (minutes) {
				parts.push(minutes + 'M');
			}
			if (seconds || milliseconds) {
				parts.push(seconds);
				if (milliseconds) {
					milliseconds = milliseconds.toString();
					while (milliseconds.length < 3) {
						milliseconds = '0' + milliseconds;
					}
					parts.push('.' + milliseconds);
				}
				parts.push('S');
			}
		}
		return parts.join('')
}
