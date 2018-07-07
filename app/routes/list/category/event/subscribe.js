import Route from '@ember/routing/route';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { loadDropDownItems, getSubscriptionDetails } from 'kursausschreibung/framework/api';
import { Promise } from 'rsvp';
import { get, set } from '@ember/object';

// if these were loaded in the component an error
// would just cause the template to stop rendering
function preloadDropdownItems(config) {
  return Promise.all(
    config
      .filter(item => item.dataType === 'dropdown')
      .map(item => loadDropDownItems(item.options.dropdownItems)
        .then(options => item.options.options = options)
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

function getSubscriptionDetailFields(subscriptionDetails) {
  return subscriptionDetails.map(detail => {
    let dataType = dataTypeMappings[detail.VssType];

    if (dataType === undefined)
      dataType = 'string';

    if (detail.DropdownItems instanceof Object)
      dataType = 'dropdown';

    return {
      id: detail.VssId,
      label: detail.VssDesignation,
      dataType: dataType,
      options: {
        required: detail.Required,
        autocomplete: 'off',
        options: dataType === 'dropdown' ? detail.DropdownItems : undefined
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

export default Route.extend({
  model() {
    // TODO
    // assertConfigIsValid();

    let model = this.modelFor('list.category.event');
    let config = settings.formFields[model.AreaOfEducationId];

    return Promise.all([
      getSubscriptionDetails(model.Id),
      preloadDropdownItems(config),
    ]).then(results => {
      set(model, 'subscriptionDetailFields', getSubscriptionDetailFields(results[0]));
      return model;
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    // person fields
    let area = model.AreaOfEducationId;
    controller.set('fields', addTranslations(settings.formFields[area]));

    // company fields
    controller.set('companyFields', addTranslations(settings.formFields.companyFields));

    // subscriptionDetails
    controller.set('subscriptionDetailFields', get(model, 'subscriptionDetailFields'));
  }
});
