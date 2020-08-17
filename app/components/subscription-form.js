import Component from '@ember/component';
import { setDataToSubmit } from 'kursausschreibung/framework/storage';
import { getString } from 'kursausschreibung/framework/translate';
import { getDMY, getYMD, formatDate } from 'kursausschreibung/framework/date-helpers';

export default Component.extend({
  useCompanyAddress: false,
  actions: {
    submit(event) {
      event.preventDefault();

      subscribe(this.$('form'), this);
      this.get('subscribe')();
    }  
  }
});

// this function subscribes a person to an event using the information
// provided in the form
function subscribe(form, self) {
  let useCompanyAddress = self.get('useCompanyAddress') === true;
  let eventId = self.get('eventId');
  let userSettings = self.get('userSettings');

  // subscription
  let subscriptionData = {
    EventId: eventId,
    PersonId: null,
    SubscriptionDetails: []
  };

  let assocSubscriptionData = getFieldSetData(form, [], '.subscription-detail-fields'); // for confirmation values

  form.find('.subscription-detail-fields').find('input, select').each((_, element) => {
    let vssId = parseInt(element.name);
    let value = null;

    if (element.type === 'checkbox')
      value = element.checked ? 'Ja' : 'Nein';
    else if (element.value !== '' && element.dataset.type === 'date')
      value = getDMY(element.value); // this is the required format for subscriptionDetails
    else if ((element.value !== '' && element.type !== 'radio') || element.checked)
      value = element.value;

    if (value !== null)
      subscriptionData.SubscriptionDetails.push({ VssId: vssId, Value: value });
  });

  // values for dataToSubmit
  let personId = userSettings.IdPerson, tableData, addressData, companyAddressData;

  // read address and companyAddress if we don't know the personId yet
  if (userSettings.isLoggedIn !== true) {

    // main address
    let addressProperties = [
      'Country', 'CountryId', 'FormOfAddress', 'FormOfAddressId', 'HomeCountry', 'HomeCountryId',
      'Nationality', 'NationalityId', 'AddressLine1', 'AddressLine2', 'BillingAddress',
      'Birthdate', 'CorrespondenceAddress', 'Email', 'Email2', 'FirstName', 'Gender', 'HomeTown',
      'IsEmployee', 'LastName', 'Location', 'MiddleName', 'NativeLanguage', 'PhoneMobile', 'PhonePrivate',
      'Profession', 'SocialSecurityNumber', 'StayPermit', 'StayPermitExpiry', 'Zip'
    ];

    addressData = getFieldSetData(form, addressProperties, '.address-fields');

    let companyAddressProperties = [
      'PersonId', 'AddressType', 'AddressTypeId', 'Country', 'CountryId', 'FormOfAddress', 'FormOfAddressId',
      'AddressLine1', 'AddressLine2', 'Company', 'Department', 'FirstName', 'IsBilling', 'IsCorrespondence',
      'LastName', 'Location', 'Remark', 'ValidFrom', 'ValidTo', 'Zip'
    ];

    // company address
    companyAddressData = getFieldSetData(form, companyAddressProperties, '.company-address-fields');

    // get the values for the confirmation table
    tableData = {
      fields: getTableData(self.get('fields'), addressData),
      subscriptionDetailFields: getTableData(self.get('subscriptionDetailFields'), assocSubscriptionData)
    };

    if (useCompanyAddress)
      tableData.companyFields = getTableData(self.get('companyFields'), companyAddressData);
  }

  // save the data to submit
  setDataToSubmit({
    personId, eventId, useCompanyAddress, addressData, companyAddressData, subscriptionData, tableData
  });
}

// get data from a field set which is ready to get posted to Persons/Addresses
function getFieldSetData(form, properties, selector) {
  let data = {};

  properties.forEach(property => data[property] = null);

  form.find(selector).find('input, select').each((_, element) => setProperties(data, element));

  return data;
}

// sets one or two properties on data depending
// on whether element is a select-node
function setProperties(data, element) {
  if (element.nodeName === 'SELECT') {
    let text = element.options[element.selectedIndex].text;

    // skip if there is no selection
    if (text === '') return;

    data[element.name] = text;
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

      return { label, value };
    }).filter(field => field !== null);
}
