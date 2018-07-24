import Route from '@ember/routing/route';
import { Promise } from 'rsvp';
import storage from 'kursausschreibung/framework/storage';
import { postPerson, putPerson, postAddress, postSubscription } from 'kursausschreibung/framework/api';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';

export default Route.extend({
  model(params, transition) {
    let dataToSubmit = storage.localStoreItem('kursausschreibung.dataToSubmit');
    let personId = null;
    let event = this.modelFor('list.category.event');

    if (dataToSubmit === null) {
      this.replaceWith('list.category.event');
      return;
    }

    let { eventId, useCompanyAddress, addressData, companyAddressData, subscriptionData, tableData } = dataToSubmit;

    // make sure the session is still active
    return Promise.resolve().then(() => autoCheckForLogin()).then(() => {

      storage.localStoreItem('kursausschreibung.dataToSubmit', null); // clear the data

      // get the current data of the event
      return event.update();
    }).then(() => {
      // make sure it's still possible to subscribe to the event
      if (event.get('canDoSubscription') === false)
        throw new Error('it\'s no longer possible to subscribe to this event');

      return new Promise(resolve => postPerson(addressData).then((data, status, xhr) => { resolve([xhr]); }));

    }).then(([xhr]) => {

      let isDuplicate = xhr.getResponseHeader('x-duplicate') !== null;

      if (isDuplicate)
        personId = xhr.getResponseHeader('x-duplicate').split('/').slice(-1)[0];
      else
        personId = xhr.getResponseHeader('location').split('/').slice(-1)[0];

      if (isDuplicate)
        return putPerson(addressData, personId);
    }).then(() => {
      if (!useCompanyAddress)
        return;

      // add default values
      companyAddressData.PersonId = parseInt(personId);
      companyAddressData.AddressType = 'Arbeitgeber';
      companyAddressData.AddressTypeId = 501;
      companyAddressData.Country = companyAddressData.Country === null ? 'Schweiz' : companyAddressData.Country;
      companyAddressData.CountryId = companyAddressData.CountryId === null ? 'CH' : companyAddressData.CountryId;

      return postAddress(companyAddressData);

    }).then(() => {
      subscriptionData.PersonId = personId;

      return postSubscription(subscriptionData);
    }).then(() => {
      return tableData;
    }).catch(error => {
      let message = '';

      try {
        console.log(error);
        message = error.responseJSON.Issues[0].Message;
      } catch (ignored) { }
      throw {message: message};
    });
  }
});
