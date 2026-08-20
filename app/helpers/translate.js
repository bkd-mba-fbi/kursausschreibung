import { helper } from '@ember/component/helper';
import { getString } from 'kursausschreibung/framework/translate';
import { htmlSafe } from '@ember/template';

export function translate([positionalKey, ...placeholderValues], { key } = {}) {
  const translationKey = key ?? positionalKey;
  return htmlSafe(getString(translationKey, placeholderValues));
}

export default helper(translate);
