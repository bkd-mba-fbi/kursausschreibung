import { getString } from 'kursausschreibung/framework/translate';
import uikit from 'uikit';
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
 * Check if a file has the rigth resolution
 * @param {file} file 
 * @param {number} width 
 * @param {number} height 
 */
export function resolutionImageValid(file, fWidth, fHeight) {
  var reader = new FileReader();
  //Read the contents of Image File.
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    //Initiate the JavaScript Image object.
    var image = new Image();

    //Set the Base64 string return from FileReader as source.
    image.src = e.target.result;

    //Validate the File Height and Width.
    image.onload = function () {
      var height = this.height;
      var width = this.width;
      if (width !== fWidth || height !== fHeight) {
        
        //show width and height to user
        uikit.modal.alert(getString('FileImageResolution') + width + 'x' + height );
        return false;
      }
      return true;
    };
  };

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
