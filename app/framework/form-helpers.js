import { getString } from 'kursausschreibung/framework/translate';
import { SUBSCRIPTION_DETAIL_INVOICE_ADRESS } from 'kursausschreibung/framework/api';

/**
 * set custom validity of a form element
 * @param {object} element
 * @param {boolean} valid
 * @param {string} message
 */
export function formFieldError(element, valid, message = 'invalidInput') {
  if (valid) {
    element.setCustomValidity(getString(message));
  } else {
    element.setCustomValidity('');
  }
}

/**
 * Remove a File from filelist
 * @param {string} elementId 
 */
export function removeFile(elementId) {
  document.getElementById(elementId).value = '';
}

/**
 * input helper
 * set delimiter "."
 * check is digit 0-9
 *
 * validation
 * check format correct nnn.nnnn.nnnn.nn
 * @param {object} element
 */
export function helperSocialSecurityNumber(that) {
  formFieldError(that, true);
  let number = that.value;

    //set delimiter "."
  if (number.length === 3) {
    that.value = number + '.';
  } else if (number.length === 8) {
    that.value = number + '.';
  } else if (number.length === 13) {
    that.value = number + '.';
  }

  //Check is digit 0-9
  let lastCharacter = number.slice(-1);
  if (number.length === 4 || number.length === 9 || number.length === 14) {
    lastCharacter = '.';
    that.value = number.substr(0, number.length - 1) + lastCharacter;
  }
  else if (lastCharacter.match(/[0-9]/) === null) {
    that.value = number.substr(0, number.length - 1);
  }

  //final Check format correct nnn.nnnn.nnnn.nn
  if (number.length >= 16) {
    that.value = number.substr(0, 16);
    if (that.value.match(/[0-9]{3}\.[0-9]{4}\.[0-9]{4}\.[0-9]{2}/)) {
      if ('000.0000.0000.00' !== number) {
        let numberString = number.replace(/\./g, '');
        let valid = ean13checkNumber(numberString);
        valid ? formFieldError(that, false) : formFieldError(that, true);
      }
    } else {
      formFieldError(that, true);
    }
  }
}


function ean13checkNumber(number) {
  if (number.length === 13) {
    let numberReverse = number.substr(0, 12);
    numberReverse = numberReverse.split('').join('');
    let sum = 0;
    for (let i = 0; i < numberReverse.length; i++) {
      let int = numberReverse.charAt(i);
      sum = (int * (i & 1 === 1 ? 3 : 1)) + sum;
    }
    let checkNumber = 10 - (sum % 10);
    checkNumber = checkNumber === 10 ? 0 : checkNumber;
    return Number(number.slice(-1)) === checkNumber ? true : false;
  }
  return false;
}


/**
 * Check if vssDependency available
 * @param {string} formValue
 * @param {object} field
 */
export function vssDependency(formValue, field) {

  if (field.options?.dependencyItems?.length) {
    let hiddenClass = 'uk-hidden';
    field.options.dependencyItems.forEach(element => {
      let values = element.Values;
      let operator = element.Operator;

      let vssId = element.IdVss;

      let dependency = vssDependencyCheck(formValue, operator, values);
      invoiceDependencyCheck(vssId, dependency);
      
      let hidden = document.getElementById('hidden' + vssId);
      let requiredElement = document.getElementById('file' + vssId) || document.getElementById('vss' + vssId);

      if (!hidden || !requiredElement) return;

      if (dependency) {
        hidden.classList.remove(hiddenClass);
        requiredElement.required = element.required;
      } else {
        hidden.classList.add(hiddenClass);
        requiredElement.required = false;
      }

    });

  }

}
/***
 * Check if vssDependency true and SUBSCRIPTION_DETAIL_INVOICE_ADRESS on event. Display useCompanyAddress 
 * @param {number} vssId
 * @param {boolean} dependency
 */
function invoiceDependencyCheck(vssId, dependency) {

    const comp = window.kursausschreibung?.component;
    const button = document.querySelector('button[name="useCompanyAddress"]');
    const fieldset = document.querySelector('.company-address-fields');

    if (!comp || !button || !fieldset || !comp.get('enableInvoiceAddress')) return;
    if (vssId === SUBSCRIPTION_DETAIL_INVOICE_ADRESS && dependency) {
      comp.set('paymentEnforced', true);
      comp.set('useCompanyAddress', true);
      button.disabled = true;
      fieldset.hidden = false;
      fieldset.disabled = false;
      fieldset.querySelectorAll('input, select, textarea').forEach(el => el.required = true);
    } else {
      comp.set('paymentEnforced', false);
      comp.set('useCompanyAddress', false);
      button.disabled = false;
      fieldset.hidden = true;
      fieldset.disabled = true;

      const fields = comp.get('companyFields') || [];
      // für jedes Input/Select/Textarea
      fieldset.querySelectorAll('input, select, textarea').forEach(el => {
        // finde das zugehörige Field-Objekt nach dem Name-Attribut
        const def = fields.find(f => String(f.id) === el.name);
        // setze required wie in der config
        el.required = def?.options.required === true;
      });
    }

}

/**
  * Check if vssDependency true
 * @param {string} formValue
 * @param {number} operator
 * @param {Array} values
 */
function vssDependencyCheck(formValue, operator, values) {

  if (formValue === 'Ja') formValue = '1';
  if (formValue === 'Nein') formValue = '0';


  if(typeof formValue === 'boolean') {
    formValue = formValue ? '1' : '0';
  } 

  if (operator === 349) { //contains
    return values.includes(formValue);
  } else if (operator === 350) { //contains Not
    return !values.includes(formValue);
  } else if (operator === 351) { //empty
    return formValue === null || formValue === undefined || formValue.length === 0 ? true : false;
  } else if (operator === 352) { //notEmpty
    return formValue.length > 0 ? true : false; //formValue !== undefined ||
  } 
}