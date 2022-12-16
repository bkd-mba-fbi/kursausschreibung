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