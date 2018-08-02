import Controller from '@ember/controller';
import settings from 'kursausschreibung/framework/settings';

export default Controller.extend({
  eventCategoryDropdown: settings.eventCategoryDropdown,

  centerWidth: (() => {
    let displayLeft = settings.eventCategoryDropdown !== true;
    let displayRight = settings.displayRightSide;

    // handle each combination of eventCategoryDropdown and displayRightSide
    // for every viewport-size

    if (!displayLeft && !displayRight)
      return 'uk-width-1-1';

    if (displayRight && displayLeft)
      return 'uk-width-3-4@m uk-width-1-2@l';

    if (displayLeft)
      return 'uk-width-3-4@m';

    return 'uk-width-3-4@l';
  })()
});
