import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { Promise } from 'rsvp';
import { getDataToSubmit, setDataToSubmit } from 'kursausschreibung/framework/storage';
import { postPerson, putPerson, postAddress, postSubscription, postSubscriptionDetailsFiles } from 'kursausschreibung/framework/api';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';
import settings from 'kursausschreibung/framework/settings';
import { SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE } from 'kursausschreibung/framework/api';

export default Route.extend({
  model() {
    let dataToSubmit = getDataToSubmit();
    let event = this.modelFor('list.category.event');

    if (dataToSubmit === null) {
      this.replaceWith('list.category.event');
      return;
    }

    let {
      personId, useCompanyAddress, addressData, companyAddressData,
      subscriptionData, additionalPeople, tableData, subscriptionFiles
    } = dataToSubmit;  

    // make sure the session is still active
    return autoCheckForLogin().then(() => {

      // clear the data
      setDataToSubmit(null);

      // get the current data of the event
      return event.update();
    }).then(() => {
      // make sure it's still possible to subscribe to the event
      if (event.get('canDoSubscription') === false) {
        throw new Error('it\'s no longer possible to subscribe to this event');
      }

      // Create people and subscriptions
      let promises = [];

      // handle main person
      if (personId === 0) {
        promises.push(createAddresses(useCompanyAddress, addressData, companyAddressData));
      } else {
        promises.push(Promise.resolve(personId));
      }

      // handle other people
      additionalPeople.forEach(person => {
        promises.push(createPerson(person));
      });

      // subscribe everyone
      promises = promises.map(promise => {
        return promise.then(id => {
          subscriptionData.PersonId = id;
          if(additionalPeople.length > 0 ){
            subscriptionData.SubscriptionDetails.push({VssId: SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE , Value: additionalPeople.length });
          }
          return postSubscription(subscriptionData).then(id => {
            subscriptionFiles.forEach(file => {
              
              let data = {
                SubscriptionDetail:  {
                    SubscriptionId: id,
                    VssId: file.IdVss
                },
                    FileStreamInfo: {
                    FileName: file.name
                }
            };
            promises.push(postSubscriptionDetailsFiles(data,file));

            });
          });
        });
      
      });
      
      return Promise.all(promises);
    
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

// this function creates an address, a company address (if requested) and returns a
// promise for a personId
function createAddresses(useCompanyAddress, addressData, companyAddressData) {
  let personId;

  return createPerson(addressData).then(id => {
    personId = id;

    if (!useCompanyAddress)
      return;

    // add default values to companyAddress
    companyAddressData.PersonId = parseInt(personId);
    companyAddressData.AddressType = 'Arbeitgeber';
    companyAddressData.AddressTypeId = 501;
    companyAddressData.Country = companyAddressData.Country === null ? 'Schweiz' : companyAddressData.Country;
    companyAddressData.CountryId = companyAddressData.CountryId === null ? 'CH' : companyAddressData.CountryId;

    return postAddress(companyAddressData);
  }).then(() => personId);
}

// this function creates a new person and returns a promise for a personId
function createPerson(addressData) {

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

  // delete keys with null-values
  Object.keys(addressData).forEach(key => {
    if (addressData[key] === null)
      delete addressData[key];
  });

  return new Promise(resolve => postPerson(addressData)
    .then((_data, _status, xhr) => { resolve([xhr]); }))
    .then(([xhr]) => { // xhr is in an array so it gets correctly passed along
      let duplicateHeader = xhr.getResponseHeader('x-duplicate');
      let locationHeader = xhr.getResponseHeader('location');

      if (duplicateHeader === null && locationHeader === null) {
        throw new Error('failed to read personId. neither x-duplicate nor location header could be read.');
      }

      if (duplicateHeader !== null) {
        // the person already exists and must get updated
        let personId = duplicateHeader.split('/').slice(-1)[0];

        // add id
        addressData.Id = parseInt(personId);
        return putPerson(addressData, personId)
          .then(() => personId)
          .catch(error => {
            // fail silently (see https://github.com/bkd-mba-fbi/kursausschreibung/issues/26)
            console.error('ignoring error while trying to update person', error); // eslint-disable-line no-console
          });
      }

      return locationHeader.split('/').slice(-1)[0];
    });
}
