import Controller from '@ember/controller';
import { postPerson } from 'kursausschreibung/framework/api';
import uikit from 'uikit';

export default Controller.extend({
  actions: {
    submit(event) {
      event.preventDefault();

      subscribe().then(() => alert('not yet implemented')).fail(() =>
        uikit.notification('FATAL ERROR: subscription failed', {
          status: 'danger'
        })
      );
    }
  }
});

function subscribe() {
  // TODO: use actual data
  let data = JSON.stringify(
    {
      Country: 'Schweiz',
      CountryId: 'CH',
      FormOfAddress: 'Herr',
      FormOfAddressId: 105,
      HomeCountry: 'Schweiz',
      HomeCountryId: 'CH',
      Nationality: 'Schweiz',
      NationalityId: 2008212,
      AddressLine1: 'Musterstrasse 1',
      AddressLine2: null,
      BillingAddress: null,
      Birthdate: '2000-04-23',
      CorrespondenceAddress: null,
      Email: 'm.muster@muster.com',
      Email2: null,
      FirstName: 'John',
      Gender: 'M',
      HomeTown: 'Bern',
      IsEmployee: false,
      LastName: 'Muster',
      Location: 'Bern',
      MiddleName: 'Michael',
      NativeLanguage: 'Deutsch',
      PhoneMobile: '079 000 00 00',
      PhonePrivate: '044 000 00 00',
      Profession: 'Maler',
      SocialSecurityNumber: '765.1289.1476.15',
      StayPermit: null,
      StayPermitExpiry: '2020-12-20',
      Zip: '3000'
    },
    null,
    '\t'
  );
  return postPerson(data);
}
