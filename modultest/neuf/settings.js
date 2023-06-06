window.kursausschreibung = window.kursausschreibung || {};
window.kursausschreibung.settings = {
  // only show matching events (expects array also if one value, [123]) (optional)
  "initialListFilters": {
    "hostIds": ["BME"],
    "eventCategoryIds": null,
    "eventLevelIds": null,
    "eventTypeIds": null,
    "statusIds": null,
    "codeIds": null
  },

  // show events which have already started, but not yet ended
  "showStartedEvents": false,

  // items per page on the event-list (required)
  "itemsPerPage": 10,

  // title and fields to show on the event-list (required)
  // possible values in this array can be
  // * keys of the /Events API-endpoint
  // * keys of the /EventLocations API-endpoint
  // * one of the following constructed values:
  //  + "SubscriptionFrom" (combination of SubscriptionDateFrom and SubscriptionTimeFrom)
  //  + "SubscriptionTo" (combination of SubscriptionDateTo and SubscriptionTimeTo)
  //  + "From" (combination of DateFrom and TimeFrom)
  //  + "To" (combination of DateTo and TimeTo)
  //  + "Time" (combination of TimeFrom and TimeTo)
  // a translation has to be provided for each of the values
  // (the key of the translation has to be in camelCase)
  "eventListTitle": "Designation",
  "eventListFields": [
  ],

  // same as the above but for the details-route (required)
  "eventDetailsTitle": "Designation",
  "eventDetailsFields": [
  ],

  // show breadcrumbs navigation (optional)
  "showBreadcrumbs": false,

  // show event-text on the details-route (optional)
  "showEventText": true,

  // enable freeSeats badge and set polling interval (optional)
  "badgeFreeSeats": {
    "enabled": true,
    "intervalSec": 5,
    "subscriptionYellowDisable": false
  },

  // enable/disable subscription (required)
  "canDoSubscription": {
    "green": true,
    "chartreuse": true,
    "yellow": false,
    "red": false,
    "orange": false
  },

  // when a field is optional or not in the form you can set a default value.
  // it will overwrite null values in the post to the person endpoint (optional)
  "personDefaultValue": {
    "CountryId": "CH",
  },

  // fields for the form (required)
  "formFields": {
      // can be specified per EventTypeId (fallback to default)
        // can be specified per EventTypeId (fallback to default)
        "1": {
          "addressFields": [{
              "id": "FormOfAddress",
              "dataType": "dropdown",
              "options": { "required": true, "dropdownItems": "FormsOfAddress" }
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
          {
              "id": "AddressLine1",
              "dataType": "string",
              "options": { "required": true, "autocomplete": "address-line1" }
          },
          {
              "id": "Zip",
              "dataType": "number",
              "options": { "required": true, "autocomplete": "postal-code" }
          },
          {
              "id": "Location",
              "dataType": "string",
              "options": { "required": true, "autocomplete": "address-level2" }
          },
          { "id": "HomeTown", "dataType": "string", "options": { "required": "true", "showHint": true, "hintClassNames": "uk-text-meta" } },
          { "id": "Birthdate", "dataType": "date", "options": { "required": "true" } },
          { "id": "SocialSecurityNumber", "dataType": "string", "options": { "required": "true" } },
          { "id": "Nationality","dataType": "dropdown", "options": { "dropdownItems": "Nationalities", "required": "true" } },
          { "id": "NativeLanguage", "dataType": "dropdown", "options": { "dropdownItems": "NativeLanguages", "required": "true" } },
          
          {
              "id": "PhoneMobile",
              "dataType": "telephone",
              "options": { "autocomplete": "tel-national", "required": "true" }
          },
          { "id": "Email2", "dataType": "email", "options": { "required": "true" } }
          

          ]
      },
      "4": {
        "addressFields": [{
                "id": "FormOfAddress",
                "dataType": "dropdown",
                "options": { "dropdownItems": "FormsOfAddress" }
            },
            {
                "id": "FirstName",
                "dataType": "string",
                "options": { "required": true, "autocomplete": "given-name", "showPlaceholder": true }
            },
            {
                "id": "LastName",
                "dataType": "string",
                "options": { "required": true, "autocomplete": "family-name", "showHint": true, "hintClassNames": "uk-text-meta" }
            },
            { "id": "Email2", "dataType": "email" }

        ]
      },

      "15": {
          "addressFields": [{
                  "id": "FormOfAddress",
                  "dataType": "dropdown",
                  "options": { "dropdownItems": "FormsOfAddress" }
              },
              {
                  "id": "FirstName",
                  "dataType": "string",
                  "options": { "required": true, "autocomplete": "given-name", "showPlaceholder": true }
              },
              {
                  "id": "LastName",
                  "dataType": "string",
                  "options": { "required": true, "autocomplete": "family-name", "showHint": true, "hintClassNames": "uk-text-meta" }
              },
              { "id": "Birthdate", "dataType": "date", "options": { "required": true, "showHint": true, "hintClassNames": "uk-text-meta" } },
              { "id": "Email2", "dataType": "email" }

          ],
          //Optional (Invoice address)
          "companyFields": [{
                  "id": "Company",
                  "dataType": "string",
                  "options": { "required": true, "showPlaceholder": true }
              },
              {
                  "id": "AddressLine1",
                  "dataType": "string",
                  "options": { "required": true, "showPlaceholder": true }
              },
              {
                  "id": "Zip",
                  "dataType": "number",
                  "options": { "required": true, "showPlaceholder": true }
              },
              {
                  "id": "Location",
                  "dataType": "string",
                  "options": { "required": true, "showPlaceholder": true }
              }
          ]
      },

      "default": {
          "addressFields": [
              {
                  "id": "FormOfAddress",
                  "dataType": "dropdown",
                  "options": { "dropdownItems": "FormsOfAddress", "required": true }
                },
                {
                  "id": "FirstName",
                  "dataType": "string",
                  "options": { "required": true, "autocomplete": "given-name", "showPlaceholder": true }
                },
                {
                  "id": "LastName",
                  "dataType": "string",
                  "options": { "required": true, "autocomplete": "family-name", "showPlaceholder": true }
                },
                {
                  "id": "AddressLine1",
                  "dataType": "string",
                  "options": { "required": true, "autocomplete": "address-line1", "showPlaceholder": true }
                },
                {
                  "id": "Zip",
                  "dataType": "number",
                  "options": { "required": true, "autocomplete": "postal-code", "showPlaceholder": true }
                },
                {
                  "id": "Location",
                  "dataType": "string",
                  "options": { "required": true, "autocomplete": "address-level2", "showPlaceholder": true }
                },
                {
                  "id": "PhoneMobile",
                  "dataType": "telephone",
                  "options": { "autocomplete": "tel-national", "showHint": true, "hintClassNames": "uk-text-meta"  }
                },
                {
                  "id": "Birthdate",
                  "dataType": "date",
                  "options": { "required": true, "showHint": true, "hintClassNames": "uk-text-meta" }
                },
                {
                  "id": "Email2",
                  "dataType": "email",
                  "options": { "required": true, "showHint": true, "hintClassNames": "uk-text-meta"  }
                }
          ],
          // if subscriptionsDetail 10893 on Event the User can subscribe additional People in the same subscripion.
          // It's possible for additional People different person fields as form main subscripion
          "additionalPeopleFields": [
            {
              "id": "FormOfAddress",
              "dataType": "dropdown",
              "options": { "dropdownItems": "FormsOfAddress" }
            },
            {
              "id": "FirstName",
              "dataType": "string",
              "options": { "required": true, "autocomplete": "given-name", "showPlaceholder": true }
            },
            {
              "id": "LastName",
              "dataType": "string",
              "options": { "required": true, "autocomplete": "family-name", "showPlaceholder": true }
            },
            { "id": "Email2", 
              "dataType": "email",
              "options": { "required": true, "autocomplete": "family-name", "showPlaceholder": true }
            }
          ]       
      }
  },

  // set this to true to add a button to change the langauge (optional)
  "showLanguageButton": true,

  // callback functions for status-lamps (optional)
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
  // (key "contactContent" in de-CH.js and fr-CH.js)
  "showContact": false,

  // show a twitter-feed (optional)
  "twitterHandle": null,

  // show the elements on the right side (required)
  "displayRightSide": true,

  // put event-categories in a dropdown menu (required)
  "eventCategoryDropdown": false,

  // property by which the event-list should be sorted (optional)
  "sortEventList": "Designation",

  // set this to true to only show events with matching language (optional)
  "languageOfInstructionFilter": false,

  // Header Offset for scrolling
  "headerOffset": 133
};
