import Route from '@ember/routing/route';
import { A } from '@ember/array';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { getDropDownItems, getSubscriptionDetails } from 'kursausschreibung/framework/api';
import { Promise } from 'rsvp';
import { get, set } from '@ember/object';

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
  Int: 'number',
  YesNo: 'checkbox',
  Currency: 'number',
  Date: 'date'
};

// convert subscriptionDetails to an array of input-components
// as they are used in the settings.json file
function getSubscriptionDetailFields(subscriptionDetails) {
  return subscriptionDetails.map(detail => {
    let dataType = dataTypeMappings[detail.VssType];

    if (dataType === undefined)
      dataType = 'string';

    if (detail.DropdownItems instanceof Object)
      dataType = 'dropdown';

    if (detail.VssStyle === 'HE')
      return { isLegend: true, label: detail.VssDesignation };

    return {
      id: detail.VssId,
      label: detail.VssDesignation,
      dataType: dataType,
      options: {
        required: detail.Required,
        autocomplete: 'off',
        options: dataType === 'dropdown' ? detail.DropdownItems : undefined,
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
  });

  return fields;
}

function getAddressFields(settings, eventTypeId) {
  if (eventTypeId in settings.formFields.addressFields)
    return settings.formFields.addressFields[eventTypeId];


  if (settings.formFields.addressFields.default === undefined)
    throw new Error("config for eventTypeId " + eventTypeId + " not found and no default config is available");

  return settings.formFields.addressFields.default;
}

export default Route.extend({
  model() {
    let model = this.modelFor('list.category.event');
    let fields = getAddressFields(settings, model.EventTypeId);

    return Promise.all([
      getSubscriptionDetails(model.Id),
      loadDropdownItems(fields),
    ]).then(results => {
      set(model, 'subscriptionDetailFields', getSubscriptionDetailFields(A(results[0]).sortBy('Sort')));
      return model;
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    // person fields
    controller.set('fields', addTranslations(getAddressFields(settings, model.EventTypeId)));

    // company fields
    controller.set('companyFields', addTranslations(settings.formFields.companyFields));

    // subscriptionDetails
    controller.set('subscriptionDetailFields', get(model, 'subscriptionDetailFields'));
  }
});
