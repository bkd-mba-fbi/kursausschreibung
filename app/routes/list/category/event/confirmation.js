import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { Promise } from 'rsvp';
import { getDataToSubmit, setDataToSubmit } from 'kursausschreibung/framework/storage';
import { postPerson, putPerson, postAddress, postSubscription } from 'kursausschreibung/framework/api';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';
import settings from 'kursausschreibung/framework/settings';

export default Route.extend({
  model() {
    let dataToSubmit = getDataToSubmit();
    let event = this.modelFor('list.category.event');

    if (dataToSubmit === null) {
      this.replaceWith('list.category.event');
      return;
    }

    let { personId, useCompanyAddress, addressData, companyAddressData, subscriptionData, tableData } = dataToSubmit;

    // make sure the session is still active
    return Promise.resolve().then(() => autoCheckForLogin()).then(() => {

      // clear the data
      setDataToSubmit(null);

      // get the current data of the event
      return event.update();
    }).then(() => {
      // make sure it's still possible to subscribe to the event
      if (event.get('canDoSubscription') === false) {
        throw new Error('it\'s no longer possible to subscribe to this event');
      }

      if (personId === 0) {
        // no user is logged in, let's create a new one
        return createAddresses(useCompanyAddress, addressData, companyAddressData)
          .then(id => personId = id);
      }

    }).then(() => {
      subscriptionData.PersonId = personId;

      return postSubscription(subscriptionData);
    }).then(() => {
      return { tableData: tableData, statusIsRed: event.get('status') === 'red' };
    }).catch(error => {
      if (error instanceof Error) {
        console.error(error); // eslint-disable-line no-console
      }

      let message = '';

      try {
        message = error.responseJSON.Issues[0].Message;
      } catch (exception) {
        // ignore exception
      }
      throw { message: message };
    });
  }
});

// this function creates an address, a company adress (if requested) and returns a
// Promise returning a personId
function createAddresses(useCompanyAddress, addressData, companyAddressData) {
  let personId;

  // add default values to person
  if (settings.personDefaultValue instanceof Object) {
    Object.keys(settings.personDefaultValue).forEach(
      key => {
        if (isEmpty(addressData[key])) {
          addressData[key] = settings.personDefaultValue[key];
        }
      }
    );
  }

  return new Promise(resolve => postPerson(addressData).then((data, status, xhr) => { resolve([xhr]); }))
    .then(([xhr]) => {
      let duplicateHeader = xhr.getResponseHeader('x-duplicate');
      let locationHeader = xhr.getResponseHeader('location');

      if (duplicateHeader === null && locationHeader === null) {
        throw new Error('failed to read personId. neither x-duplicate nor location header could be read.');
      }

      if (duplicateHeader !== null) {
        // the person already exists and must get updated
        personId = duplicateHeader.split('/').slice(-1)[0];

        // delete keys with null-values
        Object.keys(addressData).forEach(key => {
          if (addressData[key] === null)
            delete addressData[key];
        });

        // add id
        addressData.Id = parseInt(personId);

        return putPerson(addressData, personId);
      }

      personId = locationHeader.split('/').slice(-1)[0];
    }).then(() => {
      if (!useCompanyAddress)
        return;

      // add default values to company-address
      companyAddressData.PersonId = parseInt(personId);
      companyAddressData.AddressType = 'Arbeitgeber';
      companyAddressData.AddressTypeId = 501;
      companyAddressData.Country = companyAddressData.Country === null ? 'Schweiz' : companyAddressData.Country;
      companyAddressData.CountryId = companyAddressData.CountryId === null ? 'CH' : companyAddressData.CountryId;

      return postAddress(companyAddressData);
    }).then(() => personId);
}
