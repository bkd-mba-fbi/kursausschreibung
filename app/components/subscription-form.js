import Component from '@ember/component';
import { computed } from '@ember/object';
import jQuery from 'jquery';
import { formatDate, getDMY, getYMD } from 'kursausschreibung/framework/date-helpers';
import { setDataToSubmit } from 'kursausschreibung/framework/storage';
import { getString } from 'kursausschreibung/framework/translate';
import uikit from 'uikit';

export default Component.extend({
  useCompanyAddress: false,
  enableInvoiceAddress: false,
  paymentEnforced: false,



  additionalPeopleCount: 0,

  didInsertElement() {
  this._super(...arguments);
  window.kursausschreibung = window.kursausschreibung || {};
  window.kursausschreibung.component = this;
  },


  additionalPeople: computed('additionalPeopleCount', function () {
    // create an array so handlebars can iterate over it
    let count = this.get('additionalPeopleCount');
    let array = [];
    for (let i = 0; i < count; i++) {
      array.push(i + 1);
    }

    return array;
  }),

  thereAreAdditionalPeople: computed('additionalPeopleCount', function () {
    return this.get('additionalPeopleCount') > 0;
  }),

  actions: {
    submit(event) {
      event.preventDefault();

      subscribe(jQuery('form'), this);
      this.get('subscribe')();
    },

    useCompanyAddress() {
      if (this.get('enableInvoiceAddress') && this.get('paymentEnforced')) {
        return;
      }
      this.toggleProperty('useCompanyAddress');
    },



    addPerson() {
      if (this.get('event.FreeSeats') - 1 - this.get('additionalPeopleCount') <= 0) {
        uikit.modal.alert(getString('noSeatsAvailable'));
        return;
      }

      this.set('additionalPeopleCount', this.get('additionalPeopleCount') + 1);
    },

    removePerson() {
      const additionalPeopleCount = this.get('additionalPeopleCount');

      if (additionalPeopleCount < 1) {
        return;
      }

      const that = this;

      uikit.modal.confirm(getString('confirmDeletion'),
        {
          labels:
            { ok: getString('yes'), cancel: getString('no') }
        }).then(function () {
          that.set('additionalPeopleCount', additionalPeopleCount - 1);
        });
    }
  }
  
});

// this function subscribes a person to an event using the information
// provided in the form
function subscribe($form, self) {
  let useCompanyAddress = self.get('useCompanyAddress') === true;
  let eventId = self.get('event.Id');
  let userSettings = self.get('userSettings');

  // subscription
  let subscriptionData = {
    EventId: eventId,
    PersonId: null,
    SubscriptionDetails: []
  };

  let assocSubscriptionData = getFieldSetData([], $form.find('.subscription-detail-fields')); // for confirmation values

  $form.find('.subscription-detail-fields').find('input, select, textarea').each((_, element) => {
    let vssId = parseInt(element.name);
    let value = null;

    if (element.type === 'checkbox')
      value = element.checked ? 'Ja' : 'Nein';
    else if (element.type === 'file') 
      value = element.files[0] !== undefined ? element.files[0].name :null;
    else if (element.value !== '' && element.dataset.type === 'date')
      value = getDMY(element.value); // this is the required format for subscriptionDetails
    else if ((element.value !== '' && element.type !== 'radio') || element.checked)
      value = element.value;

    if (value !== null)
      subscriptionData.SubscriptionDetails.push({ VssId: vssId, Value: value });
  });

  //made a array of Files for upload to server
  let subscriptionFiles = [];
  for (const [key, value] of Object.entries(assocSubscriptionData)) {
    if (value instanceof Object) {
      subscriptionFiles.push({IdVss: key, fileAsBase64: value.imgDev === null ? value.data : value.imgDev, name: value.name, size: value.size, type: value.type});
    }
  }

  // values for dataToSubmit
  let personId = userSettings.IdPerson, tableData = {}, addressData, companyAddressData, additionalPeople;

  const addressProperties = [
    'Country', 'CountryId', 'FormOfAddress', 'FormOfAddressId', 'HomeCountry', 'HomeCountryId',
    'Nationality', 'NationalityId', 'AddressLine1', 'AddressLine2', 'BillingAddress',
    'Birthdate', 'CorrespondenceAddress', 'Email', 'Email2', 'FirstName', 'Gender', 'HomeTown',
    'IsEmployee', 'LastName', 'Location', 'MiddleName', 'NativeLanguage', 'PhoneMobile', 'PhonePrivate',
    'Profession', 'SocialSecurityNumber', 'StayPermit', 'StayPermitExpiry', 'Zip'
  ];

  const companyAddressProperties = [
    'PersonId', 'AddressType', 'AddressTypeId', 'Country', 'CountryId', 'FormOfAddress', 'FormOfAddressId',
    'AddressLine1', 'AddressLine2', 'Company', 'Department', 'FirstName', 'IsBilling', 'IsCorrespondence',
    'LastName', 'Location', 'Remark', 'ValidFrom', 'ValidTo', 'Zip'
  ];

  // read address and companyAddress if we don't know the personId yet
  if (userSettings.isLoggedIn !== true) {

    // main address
    addressData = getFieldSetData(addressProperties, $form.find('.address-fields'));

    // company address
    companyAddressData = getFieldSetData(companyAddressProperties, $form.find('.company-address-fields'));

    // set tableData for the main person
    tableData.fields = getTableData(self.get('fields'), addressData);

    // set tableData for the company address
    if (useCompanyAddress) {
      tableData.companyFields = getTableData(self.get('companyFields'), companyAddressData);
    }
  }

  // set tableData for subscriptionDetails
  tableData.subscriptionDetailFields = getTableData(self.get('subscriptionDetailFields'), assocSubscriptionData);

  // read addresses for additional people
  additionalPeople = $form.find('.additional-person-fields').toArray().map(fieldset =>
    getFieldSetData(addressProperties, $(fieldset))
  );

  // set tableData for additional people
  tableData.additionalPeopleFields = additionalPeople.map((data, index) =>
    ({ index: index + 1, data: getTableData(self.get('additionalPeopleFields'), data) })
  );

  if (useCompanyAddress) {
    subscriptionData.SubscriptionDetails.push({
      VssId: 10895,
      Value: "1"
    });
  }

  // save the data to submit
  setDataToSubmit({
    personId, eventId, useCompanyAddress, addressData, companyAddressData, subscriptionData,
    additionalPeople, tableData, subscriptionFiles
  });
}

// get data from a fieldset in the format expected by the REST-API
function getFieldSetData(properties, $fieldset) {
  let data = {};

  properties.forEach(property => data[property] = null);

  $fieldset.find('input, select, textarea').each((_, element) => setProperties(data, element));

  return data;
}

// add input data of element to data object
function setProperties(data, element) {
  if (element.nodeName === 'SELECT') {
    let text = element.options[element.selectedIndex].text;

    // skip if there is no selection
    if (text === '') return;

    data[element.name] = element.name === 'StayPermit' ? parseInt(element.value) : text;
    data[element.name + 'Id'] = parseInt(element.value);
    return;
  }

  if (element.type === 'radio') {
    if (element.checked) {
      data[element.name] = element.dataset.humanReadable;
      data[element.name + 'Id'] = parseInt(element.value);
    }
    return;
  }

  if (element.type === 'checkbox') {
    data[element.name] = element.checked;
    return;
  }

  if (element.dataset.type === 'date') {
    data[element.name] = element.value === '' ? null : getYMD(element.value);
    return;
  }

  if (element.type === 'file') {
    data[element.name] =  element.files[0] !== undefined ? element.files[0] : null;
    return;
  }

  data[element.name] = element.value === '' ? null : element.value;
}

// return a list of key-value pairs for the confirmation table
function getTableData(fields, data) {
  return fields
    .map(field => {
      let label = field.label;
      let value = data[field.id];

      // skip empty values
      if (value === null || value === '' || value === undefined)
        return null;

      // localize true/false
      if (field.dataType === 'checkbox')
        value = getString(value ? 'yes' : 'no');

      // localize dates
      if (field.dataType === 'date')
        value = formatDate(value, 'LL');
      
      if (field.dataType === 'file')
        value = value.name;

      return { label, value };
    }).filter(field => field !== null);
}
