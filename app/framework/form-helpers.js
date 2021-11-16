import { getString } from 'kursausschreibung/framework/translate';

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
export function vssDependency(formValue,field) {

if(field.options.dependencyItems !== undefined) {
  
  let hiddenClass = 'uk-hidden';

  if (field.options.dependencyItems.length > 0) {

  field.options.dependencyItems.forEach(element => {
    let values = element.Values;
    let operator = element.Operator;

    let vssId = element.IdVss;
    let hidden = document.getElementById('hidden'+vssId);
    let requiredElement = document.getElementById('file'+vssId) === null  ? document.getElementById('vss'+vssId) : document.getElementById('file'+vssId);

    if(vssDependencyCheck(formValue,operator,values)) {     
      hidden.classList.remove(hiddenClass);
      requiredElement.required = true; 
    } else {
      hidden.classList.add(hiddenClass);
      requiredElement.required = false; 
    }

  });

}

}

}

/**
 * Check if vssDependency true
* @param {string} formValue
* @param {number} operator
* @param {Array} values
*/
function vssDependencyCheck(formValue, operator, values) {

  if(typeof formValue === 'boolean') {
    formValue = formValue ? '1' : '0';
  } 

  if (operator === 349) { //contains
    return formValue.indexOf(values) > -1 ? true : false;
  } else if (operator === 350) { //contains Not
    return formValue.indexOf(values) === -1 ? true : false;
  } else if (operator === 351) { //empty
    return formValue === null || formValue === undefined || formValue.length === 0 ? true : false;
  } else if (operator === 352) { //notEmpty
    return formValue.length > 0 ? true : false; //formValue !== undefined ||
  } 
}