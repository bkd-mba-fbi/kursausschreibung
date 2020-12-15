import { A } from '@ember/array';
import { get, set } from '@ember/object';
import Route from '@ember/routing/route';
import {
  getDropDownItems, getSubscriptionDetails, getUserSettings,
  SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE
} from 'kursausschreibung/framework/api';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { Promise } from 'rsvp';

// if these were loaded in the component an error
// would just cause the template to stop rendering
function loadDropdownItems(fields) {
  return Promise.all(
    fields
      .filter(item => item.dataType === 'dropdown')
      .map(item => getDropDownItems(item.options.dropdownItems)
        .then(options => {
          if (item.options.options === undefined)
            item.options.options = options;
        })
      )
  );
}

let dataTypeMappings = {
  ShortText: 'string',
  Text: 'textarea',
  Int: 'number',
  YesNo: 'checkbox',
  Currency: 'number',
  Date: 'date'
};

// convert subscriptionDetails to an array of input-components
// as they are used in the settings.js file
function getSubscriptionDetailFields(subscriptionDetails) {
  return subscriptionDetails.map(detail => {
    let dataType = dataTypeMappings[detail.VssType];

    if (dataType === undefined)
      dataType = 'string';

    if (detail.DropdownItems instanceof Object) {
      dataType = 'dropdown';

      if (detail.VssStyleDescription === 'DropDownWithText')
        dataType = 'freeform-dropdown';
    }

    if (detail.VssStyle === 'HE')
      return { isLegend: true, label: detail.VssDesignation };

    return {
      id: detail.VssId,
      label: detail.VssDesignation,
      dataType: dataType,
      options: {
        required: detail.Required || detail.VssInternet === 'M',
        autocomplete: 'off',
        options: detail.DropdownItems,
        showAsRadioButtons: dataType === 'dropdown' ? detail.ShowAsRadioButtons : undefined,
        tooltip: detail.Tooltip,
        disabled: detail.readOnly
      }
    };
  });
}

function addTranslations(fields) {
  fields.forEach(detail => {
    if (detail.label === undefined)
      detail.label = getString('form' + detail.id);

    if (detail.options !== undefined) {
      if (detail.options.showPlaceholder === true) {
        let key = detail.options.placeholderKey ? detail.options.placeholderKey : 'form' + detail.id + 'Placeholder';
        set(detail, 'placeholder', getString(key));
      }
      if (detail.options.showHint === true) {
        let key = detail.options.hintKey ? detail.options.hintKey : 'form' + detail.id + 'Hint';
        set(detail, 'hint', getString(key));
      }
    }
  });

  return fields;
}

function getFormFields(settings, eventTypeId) {
  if (eventTypeId in settings.formFields)
    return settings.formFields[eventTypeId];

  if (settings.formFields.default === undefined)
    throw new Error("config for eventTypeId " + eventTypeId + " not found and no default config is available");

  return settings.formFields.default;
}

export default Route.extend({
  model(_params, transition) {
    let model = this.modelFor('list.category.event');

    if (model.externalSubscriptionURL !== null) {
      this.replaceWith('list.category.event.index');
    }

    if (model.get('canDoSubscription') === false) {
      this.replaceWith('list.category.event');
      transition.abort();
      return;
    }

    // make sure the session is still active
    return autoCheckForLogin()
      .then(() => Promise.all([getUserSettings(), getSubscriptionDetails(model.Id)]))
      .then(([userSettings, subscriptionDetails]) => {

        // check if multiple people are allowed to subscribe at the same time
        let allowMultiplePeople = false;
        subscriptionDetails = subscriptionDetails.filter(function (subscriptionDetail) {
          if (subscriptionDetail.VssId === SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE) {
            allowMultiplePeople = true;
            return false;
          }
          return true;
        });
        set(model, 'allowMultiplePeople', allowMultiplePeople);

        // if userSettings.IdPerson is not 0 we can use it for the subscription
        userSettings.isLoggedIn = userSettings.IdPerson !== 0;

        set(model, 'userSettings', userSettings);
        set(model, 'subscriptionDetailFields', getSubscriptionDetailFields(A(subscriptionDetails).sortBy('Sort')));

        if (userSettings.isLoggedIn === false) {
          let fields = getFormFields(settings, model.EventTypeId).addressFields;
          let additionalPeopleFields = getFormFields(settings, model.EventTypeId).additionalPeopleFields;
          if (get(model, 'allowMultiplePeople' )){
            loadDropdownItems(additionalPeopleFields !== undefined ? additionalPeopleFields : fields);
          } 

          

          return loadDropdownItems(fields);
        }
      }).then(
        () => model
      );
  },

  setupController(controller, model) {
    this._super(...arguments);

    let formFields = getFormFields(settings, model.EventTypeId);

    // person fields
    controller.set('fields', addTranslations(formFields.addressFields));

    // company fields
    controller.set('companyFields', typeof formFields.companyFields === 'object' ? addTranslations(formFields.companyFields) : null);


    // subscriptionDetails
    controller.set('subscriptionDetailFields', get(model, 'subscriptionDetailFields'));

    // additional people
    controller.set('allowMultiplePeople', get(model, 'allowMultiplePeople'));
    let setAdditionalPeopleFields = formFields.additionalPeopleFields !== undefined ? formFields.additionalPeopleFields : formFields.addressFields;
    controller.set('additionalPeopleFields', setAdditionalPeopleFields);
      if (get(model, 'allowMultiplePeople')){
        controller.set('additionalPeopleFields', addTranslations(setAdditionalPeopleFields));
      }
    
  }
});
