window.kursausschreibung = window.kursausschreibung || {};
window.kursausschreibung.settings = {
    // only show hosts with one of these hostIds (optional)
    "initialListFilters": {
        "hostIds": null,
        "eventCategoryIds": null,
        "eventLevelIds": null,
        "eventTypeIds": null,
        "statusIds": null,
      },


    // items per page on the event-list (required)
    "itemsPerPage": 6,

    // title and fields to show on the event-list (required)
    // possible values in this array can be
    // * keys of the /Events API-endpoint
    // * keys of the /EventLocations API-endpoint
    // * one of the following constructed values:
    //  + "SubscriptionFrom" (combination of SubscriptionDateFrom and SubscriptionTimeFrom)
    //  + "SubscriptionTo" (combination of SubscriptionDateTo and SubscriptionTimeTo)
    //  + "From" (combination of dateFrom and timeFrom)
    //  + "To" (combination of dateTo and timeTo)
    // a translation has to be provided for each of the values
    // (the key of the translation has to be in camelCase)
    "eventListTitle": "Designation",
    "eventListFields": [
        "DateTo",
        "Leadership",
        "BuildingAddress",
        "Location",
        "SubscriptionDateTo"
    ],

    // same as the above but for the details-route (required)
    "eventDetailsTitle": "Designation",
    "eventDetailsFields": [
        "DateFrom",
        "Leadership",
        "Location",
        "BuildingAddress",
        "SubscriptionDateTo"
    ],

    // show breadcrumbs navigation (optional)
    "showBreadcrumbs": false,

    // show event-text on the details-route (optional)
    "showEventText": true,

    // enable freeSeats badge and set polling interval (optional)
    "badgeFreeSeats": {
        "enabled": true,
        "intervalSec": 10
    },

    // enable/disable subscription (required)
    "canDoSubscription": {
        "green": true,
        "chartreuse": true,
        "yellow": false,
        "red": true,
        "orange": false
    },

    // fields for the form (required)
    "formFields": {
        // can be specified per EventTypeId (fallback to default)
        "default": {
            "addressFields": [{
                    "id": "FormOfAddress",
                    "dataType": "dropdown",
                    "options": { "dropdownItems": "FormsOfAddress" }
                },
                {
                    "id": "FirstName",
                    "dataType": "string",
                    "options": { "required": true, "autocomplete": "given-name" }
                },
                {
                    "id": "LastName",
                    "dataType": "string",
                    "options": { "required": true, "autocomplete": "family-name" }
                },
               // { "id": "Birthdate", "dataType": "date", "options": { "required": true } },
                { "id": "Email2", "dataType": "email", "options": {"required": true} }
            ]
        }

    },



    // set this to true to add a button to change the langauge (optional)
    "showLanguageButton": false,

    // callback methods for status-lamps (optional)
    // every string gets evaluated using Function()
    // these get executed in order to determine the status of an event
    // the parameters of the callback are isInSubscriptionRange and event
    "lampIsGreen": null,
    "lampIsChartreuse": null,
    "lampIsYellow": null,
    "lampIsRed": null,

    // URL to a logo image (optional)
    "logoImage": null,

    // URL to which the logo should link (optional)
    "logoLink": null,

    // set this to true to show contact information (optional)
    // (key "contactContent" in de-CH.json and fr-CH.json)
    "showContact": false,

    // show a twitter-feed (optional)
    "twitterHandle": "https://twitter.com/SfGBB_Foto",

    // show the elements on the right side (required)
    "displayRightSide": true,

    // put event-categories in a dropdown menu (required)
    "eventCategoryDropdown": false,

    // property by which the event-list should be sorted (optional)
    "sortEventList": "SubscriptionDateTo",
	
	// when a field is optional or not in the form you can set a default value.
	// it will overwrite null values in the post to the person endpoint (optional)
	"personDefaultValue": {		"CountryId": "CH"	  },
    
    // Header Offset for scrolling
    "headerOffset": 5
};