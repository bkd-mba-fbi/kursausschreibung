import { helper } from '@ember/component/helper';
import { getString } from 'kursausschreibung/framework/translate';
import { htmlSafe } from '@ember/template';

export function translate(
  [positionalKey, ...placeholderValues],
  { key, event } = {}
) {
  const translationKey = key ?? positionalKey;
  const eventValues = event?.displayData ?? event ?? {};
  return htmlSafe(getString(translationKey, placeholderValues, eventValues));
}

export default helper(translate);
