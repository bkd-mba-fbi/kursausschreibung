import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  formatDate,
  getDMY,
  getYMD,
} from 'kursausschreibung/framework/date-helpers';
import { setDataToSubmit } from 'kursausschreibung/framework/storage';
import { getString } from 'kursausschreibung/framework/translate';
import uikit from 'uikit';

export default class SubscriptionFormComponent extends Component {
  @tracked useCompanyAddress = false;
  @tracked additionalPeopleCount = 0;
  @tracked paymentEnforced = false;

  constructor(owner, args) {
    super(owner, args);
    window.kursausschreibung = window.kursausschreibung || {};
    window.kursausschreibung.component = this;
  }

  get additionalPeople() {
    let count = this.additionalPeopleCount;
    let array = [];
    for (let i = 0; i < count; i++) {
      array.push(i + 1);
    }
    return array;
  }

  get thereAreAdditionalPeople() {
    return this.additionalPeopleCount > 0;
  }

  get showLoginHint() {
    return this.args.userSettings?.isLoggedIn === true;
  }

  @action
  submit(event) {
    event.preventDefault();
    subscribe(event.target, this);
    this.args.subscribe?.();
  }

  @action
  toggleCompanyAddress() {
    if (this.args.enableInvoiceAddress && this.paymentEnforced) {
      return;
    }
    this.useCompanyAddress = !this.useCompanyAddress;
  }

  @action
  addPerson() {
    if (this.args.event?.FreeSeats - 1 - this.additionalPeopleCount <= 0) {
      uikit.modal.alert(getString('noSeatsAvailable'));
      return;
    }
    this.additionalPeopleCount = this.additionalPeopleCount + 1;
  }

  @action
  removePerson() {
    const additionalPeopleCount = this.additionalPeopleCount;
    if (additionalPeopleCount < 1) {
      return;
    }
    uikit.modal
      .confirm(getString('confirmDeletion'), {
        labels: { ok: getString('yes'), cancel: getString('no') },
      })
      .then(() => {
        this.additionalPeopleCount = additionalPeopleCount - 1;
      });
  }
}

// this function subscribes a person to an event using the information
// provided in the form
function subscribe(form, self) {
  let useCompanyAddress = self.useCompanyAddress === true;
  let eventId = self.args.event?.Id;
  let userSettings = self.args.userSettings;
  let showCompanyButtonOnly = self.args.showCompanyButtonOnly;

  // subscription
  let subscriptionData = {
    EventId: eventId,
    PersonId: null,
    SubscriptionDetails: [],
  };

  let subscriptionDetailFieldset = form.querySelector(
    '.subscription-detail-fields'
  );
  let assocSubscriptionData = getFieldSetData([], subscriptionDetailFieldset);

  subscriptionDetailFieldset
    .querySelectorAll('input, select, textarea')
    .forEach((element) => {
      let vssId = parseInt(element.name);
      let value = null;

      if (element.type === 'checkbox') value = element.checked ? 'Ja' : 'Nein';
      else if (element.type === 'file')
        value = element.files[0] !== undefined ? element.files[0].name : null;
      else if (element.value !== '' && element.dataset.type === 'date')
        value = getDMY(element.value);
      // this is the required format for subscriptionDetails
      else if (
        (element.value !== '' && element.type !== 'radio') ||
        element.checked
      )
        value = element.value;

      if (value !== null)
        subscriptionData.SubscriptionDetails.push({
          VssId: vssId,
          Value: value,
        });
    });

  //made a array of Files for upload to server
  let subscriptionFiles = [];
  for (const [key, value] of Object.entries(assocSubscriptionData)) {
    if (value instanceof Object) {
      subscriptionFiles.push({
        IdVss: key,
        fileAsBase64: value.imgDev === null ? value.data : value.imgDev,
        name: value.name,
        size: value.size,
        type: value.type,
      });
    }
  }

  // values for dataToSubmit
  let personId = userSettings.IdPerson,
    tableData = {},
    addressData,
    companyAddressData,
    additionalPeople;

  const addressProperties = [
    'Country',
    'CountryId',
    'FormOfAddress',
    'FormOfAddressId',
    'HomeCountry',
    'HomeCountryId',
    'Nationality',
    'NationalityId',
    'AddressLine1',
    'AddressLine2',
    'BillingAddress',
    'Birthdate',
    'CorrespondenceAddress',
    'Email',
    'Email2',
    'FirstName',
    'Gender',
    'HomeTown',
    'IsEmployee',
    'LastName',
    'Location',
    'MiddleName',
    'NativeLanguage',
    'PhoneMobile',
    'PhonePrivate',
    'Profession',
    'SocialSecurityNumber',
    'StayPermit',
    'StayPermitExpiry',
    'Zip',
  ];

  const companyAddressProperties = [
    'PersonId',
    'AddressType',
    'AddressTypeId',
    'Country',
    'CountryId',
    'FormOfAddress',
    'FormOfAddressId',
    'AddressLine1',
    'AddressLine2',
    'Company',
    'Department',
    'FirstName',
    'IsBilling',
    'IsCorrespondence',
    'LastName',
    'Location',
    'Remark',
    'ValidFrom',
    'ValidTo',
    'Zip',
  ];

  // read address and companyAddress if we don't know the personId yet
  if (showCompanyButtonOnly) {
    // main address
    addressData = getFieldSetData(
      addressProperties,
      form.querySelector('.address-fields')
    );

    // company address
    companyAddressData = getFieldSetData(
      companyAddressProperties,
      form.querySelector('.company-address-fields')
    );

    // set tableData for the main person
    tableData.fields = getTableData(self.args.fields, addressData);

    // set tableData for the company address
    if (useCompanyAddress) {
      tableData.companyFields = getTableData(
        self.args.companyFields,
        companyAddressData
      );
    }
  }

  // set tableData for subscriptionDetails
  tableData.subscriptionDetailFields = getTableData(
    self.args.subscriptionDetailFields,
    assocSubscriptionData
  );

  // read addresses for additional people
  additionalPeople = Array.from(
    form.querySelectorAll('.additional-person-fields')
  ).map((fieldset) => getFieldSetData(addressProperties, fieldset));

  // set tableData for additional people
  tableData.additionalPeopleFields = additionalPeople.map((data, index) => ({
    index: index + 1,
    data: getTableData(self.args.additionalPeopleFields, data),
  }));

  // save the data to submit
  setDataToSubmit({
    personId,
    eventId,
    useCompanyAddress,
    addressData,
    companyAddressData,
    subscriptionData,
    additionalPeople,
    tableData,
    subscriptionFiles,
  });
}

// get data from a fieldset in the format expected by the REST-API
function getFieldSetData(properties, fieldset) {
  let data = {};

  properties.forEach((property) => (data[property] = null));

  fieldset
    .querySelectorAll('input, select, textarea')
    .forEach((element) => setProperties(data, element));

  return data;
}

// add input data of element to data object
function setProperties(data, element) {
  if (element.nodeName === 'SELECT') {
    let text = element.options[element.selectedIndex].text;

    // skip if there is no selection
    if (text === '') return;

    data[element.name] =
      element.name === 'StayPermit' ? parseInt(element.value) : text;
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
    data[element.name] =
      element.files[0] !== undefined ? element.files[0] : null;
    return;
  }

  data[element.name] = element.value === '' ? null : element.value;
}

// return a list of key-value pairs for the confirmation table
function getTableData(fields, data) {
  return fields
    .map((field) => {
      let label = field.label;
      let value = data[field.id];

      // skip empty values
      if (value === null || value === '' || value === undefined) return null;

      // localize true/false
      if (field.dataType === 'checkbox')
        value = getString(value ? 'yes' : 'no');

      // localize dates
      if (field.dataType === 'date') value = formatDate(value, 'LL');

      if (field.dataType === 'file') value = value.name;

      return { label, value };
    })
    .filter((field) => field !== null);
}
