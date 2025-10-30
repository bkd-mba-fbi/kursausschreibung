import { A } from '@ember/array';
import { get, set } from '@ember/object';
import Route from '@ember/routing/route';
import {
  getDropDownItems, getSubscriptionDetails, getSubscriptionDetailDependencies, getUserSettings,
  SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE, SUBSCRIPTION_DETAIL_INVOICE_ADRESS
} from 'kursausschreibung/framework/api';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { Promise } from 'rsvp';

function loadDropdownItems(fields) {
  return Promise.all(
    fields
      .filter(item => item.dataType === 'dropdown')
      .map(item => getDropDownItems(item.options.dropdownItems)
        .then(options => {
          if (item.id === 'Nationality') {
            options.forEach(element => {
              element.Value = element.Value.split(':')[1].trim();
            });
            let setDefaultLand = options;
            let defaultLand = options.findIndex(nationality => nationality.Key === 2008100);
            setDefaultLand.splice(0, 0, options[defaultLand]);
          }
          if (item.id === 'Profession') {
            item.dataType = 'freeform-dropdown'
          }

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
  Currency: 'number',
  Date: 'date',
  Yes: 'checkbox'
};

let fileTypeMapping = {
  DA: 'application/zip,application/x-zip-compressed',
  PD: 'application/pdf',
  PF: 'image/jpeg'
};

// convert subscriptionDetails to an array of input-components
// as they are used in the settings.js file
function getSubscriptionDetailFields(subscriptionDetails) {
  return subscriptionDetails.map(detail => {
    let dataType = dataTypeMappings[detail.VssType];
    let fileType = fileTypeMapping[detail.VssStyle];

    if (dataType === undefined)
      dataType = 'string';

    if (detail.DropdownItems instanceof Object) {
      dataType = 'dropdown';

      if (detail.VssStyleDescription === 'DropDownWithText')
        dataType = 'freeform-dropdown';
    }

    if (detail.VssStyle === 'HE')
      return { isLegend: true, label: detail.VssDesignation };

    if (detail.VssStyle === 'DA' || detail.VssStyle === 'PD' || detail.VssStyle === 'PF') {
      dataType = 'file';
    }

    if (detail.VssType === 'YesNo') {
      dataType = 'dropdown';
      detail.ShowAsRadioButtons = true;
      let yes = {
        Key: "Ja",
        Value: getString('yes')
      };
      let no = {
        Key: "Nein",
        Value: getString('no')
      };
      let items = [];
      items.push(yes);
      items.push(no);
      detail.DropdownItems = items;
    }

    return {
      id: detail.VssId,
      label: detail.VssDesignation,
      dataType: dataType,
      acceptFileType: fileType,
      fileTypeLabel: getString('fileType' + detail.VssStyle),
      fileLabelBevorFileChoose: getString('fileType' + detail.VssStyle),
      maxFileSize: detail.MaxFileSize,
      fileObject: null,
      options: {
        required: detail.VssInternet === 'M',
        autocomplete: 'off',
        options: detail.DropdownItems,
        showAsRadioButtons: dataType === 'dropdown' ? detail.ShowAsRadioButtons : undefined,
        tooltip: detail.Tooltip,
        disabled: detail.readOnly,
        hidden: '',
        dependencyItems: []
      }
    };
  });
}

function addSubscriptionDetailDependencies(subscriptionDetailDependencies, subscriptionDetails) {
  subscriptionDetails.map(item => {
    subscriptionDetailDependencies.find(dependency => {
      if (dependency.IdVss === item.id) {
        item.options.hidden = 'uk-hidden';
        dependency.required = item.options.required
        item.options.required = false;
      }
      if (dependency.IdVssInfluencer === item.id) {
        item.options.dependencyItems.push(dependency);
      }
    });
  });
  return subscriptionDetails;
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

function getFormFields(settings, eventTypeId, eventCategoryId) {
  if (eventTypeId in settings.formFields) {
    if (eventCategoryId in settings.formFields[eventTypeId]) {
      return settings.formFields[eventTypeId][eventCategoryId];
    } else if (settings.formFields[eventTypeId].addressFields !== undefined) {
      return settings.formFields[eventTypeId];
    }
  }

  if (settings.formFields.default === undefined)
    throw new Error("config for eventTypeId " + eventTypeId + " not found and no default config is available");

  return settings.formFields.default;
}

export default Route.extend({
  model(_params, transition) {
    let model = this.modelFor('list.category.event');

    if (model.externalSubscriptionURL !== null) {
      transition.abort();
    }

    if (model.get('canDoSubscription') === false) {
      transition.abort();
      return;
    }

    return autoCheckForLogin()
      .then(() => Promise.all([
        getUserSettings(),
        getSubscriptionDetails(model.Id),
        getSubscriptionDetailDependencies(model.Id)
      ]))
      .then(([userSettings, subscriptionDetails, subscriptionDetailDependencies]) => {
        let allowMultiplePeople = false;
        let enableInvoiceAddress = false;

        if (subscriptionDetails !== null) {
          subscriptionDetails = subscriptionDetails.filter(detail => {
            if (detail.VssId === SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE) {
              allowMultiplePeople = true;
              return false;
            }
            if (detail.VssId === SUBSCRIPTION_DETAIL_INVOICE_ADRESS) {
              enableInvoiceAddress = true;
              return false;
            }
            return true;
          });

          subscriptionDetails = subscriptionDetails.filter(det => det.VssInternet !== 'H');
        }

        set(model, 'allowMultiplePeople', allowMultiplePeople);
        set(model, 'enableInvoiceAddress', enableInvoiceAddress);

        userSettings.isLoggedIn = userSettings.IdPerson !== 0;
        set(model, 'userSettings', userSettings);

        const sortedDetails = A(subscriptionDetails).sortBy('Sort');
        set(model, 'subscriptionDetailFields', addSubscriptionDetailDependencies(
          subscriptionDetailDependencies,
          getSubscriptionDetailFields(sortedDetails)
        ));

        const formFields = getFormFields(settings, model.EventTypeId, model.EventCategoryId);
        const fields = formFields.addressFields || [];
        const additionalPeopleFields = formFields.additionalPeopleFields || [];
        const companyFields = formFields.companyFields || [];

        if (!userSettings.isLoggedIn || (userSettings.isLoggedIn && !enableInvoiceAddress)) {
          if (allowMultiplePeople || enableInvoiceAddress) {
            loadDropdownItems([...fields, ...additionalPeopleFields, ...companyFields]);
          }
          return loadDropdownItems(fields);
        } else {
          // Wenn eingeloggt: auch Dropdowns für Rechnungsadresse laden, wenn vorhanden
          if (enableInvoiceAddress && companyFields.length > 0) {
            return loadDropdownItems(companyFields);
          }
        }
      })
      .then(() => model);
  },

  setupController(controller, model) {
    this._super(...arguments);

    const formFields = getFormFields(settings, model.EventTypeId, model.EventCategoryId);

    controller.set('fields', addTranslations(formFields.addressFields));

    controller.set('enableInvoiceAddress', model.enableInvoiceAddress === true);
    controller.set('companyFields', addTranslations(formFields.companyFields || []));
    controller.set('showAddressInputs', !model.userSettings.isLoggedIn);
    controller.set('showCompanyButtonOnly', !model.userSettings.isLoggedIn || (model.userSettings.isLoggedIn || model.enableInvoiceAddress) );


    controller.set('subscriptionDetailFields', get(model, 'subscriptionDetailFields'));

    controller.set('allowMultiplePeople', get(model, 'allowMultiplePeople'));
    const peopleFields = formFields.additionalPeopleFields || formFields.addressFields;
    controller.set('additionalPeopleFields', get(model, 'allowMultiplePeople') ? addTranslations(peopleFields) : peopleFields);
  }
});