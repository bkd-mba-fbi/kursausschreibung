'use strict';



;define('kursausschreibung/app', ['exports', 'kursausschreibung/resolver', 'ember-load-initializers', 'kursausschreibung/config/environment', 'kursausschreibung/framework/login-helpers'], function (exports, _resolver, _emberLoadInitializers, _environment, _loginHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  // restore window.$ and window.jQuery
  Ember.$.noConflict(true);

  // read OAuth token and restore URL
  (0, _loginHelpers.checkToken)();

  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('kursausschreibung/components/area-navigation', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({}).reopenClass({
    positionalParams: ['area']
  });
});
;define('kursausschreibung/components/event-details-table', ['exports', 'kursausschreibung/framework/settings', 'kursausschreibung/framework/translate', 'kursausschreibung/framework/ics-file'], function (exports, _settings, _translate, _icsFile) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    title: _settings.default.eventDetailsTitle,
    showEventText: _settings.default.showEventText,

    fields: _settings.default.eventDetailsFields.map(key => ({
      name: (0, _translate.getString)(Ember.String.camelize(key)), key
    })),

    actions: {
      getIcsFileFromEvent() {
        (0, _icsFile.getIcsFileFromEvent)(this.event);
      }
    }

  });
});
;define('kursausschreibung/components/event-list-item', ['exports', 'kursausschreibung/framework/settings', 'kursausschreibung/framework/translate'], function (exports, _settings, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: 'li',
    classNames: 'jsfilter',

    title: _settings.default.eventListTitle,

    fields: _settings.default.eventListFields.map(key => ({
      name: (0, _translate.getString)(Ember.String.camelize(key)), key
    }))
  });
});
;define('kursausschreibung/components/event-list-search', ['exports', 'kursausschreibung/framework/url-helpers', 'kursausschreibung/framework/gui-helpers', 'kursausschreibung/framework/storage', 'kursausschreibung/framework/settings'], function (exports, _urlHelpers, _guiHelpers, _storage, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  // tests if a query matches a value
  function match(value, query) {

    if (typeof value === 'object' && value !== null) {
      value = Object.values(value).join('|');
    }

    return typeof value === 'string' && value.toLowerCase().indexOf(query) !== -1;
  }

  exports.default = Ember.Component.extend({
    query: (0, _urlHelpers.getParameterByName)('search'),
    // update the filtered events when the events change
    eventsChanged: Ember.observer('events', function () {
      this.send('queryChanged');
    }),

    willRender() {
      //only on first page. filter eventcode
      if (this.get('parentView').page === 1) {
        this.send('queryChanged');
      }

      let sortOptions = [];
      if (_settings.default.sortOptions === undefined) {
        sortOptions.push({ key: 'error', value: 'configure key sortoptions array in settings' });
      } else {
        _settings.default.sortOptions.forEach(option => {
          sortOptions.push({ key: option, value: "sort" + option });
        });
      }
      this.set('sortOptions', sortOptions);
    },

    didRender() {
      document.getElementById('sortList').value = (0, _storage.getSortAs)();
    },

    filteredEvents: Ember.computed.oneWay('events'),

    keyUp() {
      (0, _urlHelpers.setParameterByName)('search', this.get('query'));
    },

    actions: {
      clearSearch() {
        this.set('query', '');
        (0, _urlHelpers.setParameterByName)('search', '');
      },

      queryChanged() {
        let query = this.get('query');
        query = query === null ? '' : query.toLowerCase();
        // don't filter the events when the query is empty
        if (query === '') {
          this.set('filteredEvents', this.get('events'));
          return;
        }

        this.set('filteredEvents', this.get('events')
        // search the query string in event-properties and memo-texts
        .filter(event => Object.keys(event).some(key => match(event[key], query)) || event.texts.some(text => match(text.memo, query))));

        this.get('queryChanged')(query);
      },
      sortBy(value) {
        (0, _guiHelpers.sortAs)(value);
      }
    }

  });
});
;define('kursausschreibung/components/event-list', ['exports', 'kursausschreibung/framework/url-helpers'], function (exports, _urlHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function filterParam(getParam) {
    let filters = document.getElementsByClassName('filter-tag');
    let activeClass = 'uk-active';

    if (getParam) {
      let filterValue = (0, _urlHelpers.getParameterByName)('filter');

      for (let item of filters) {
        document.getElementById(item.id).classList.remove(activeClass);
        if (item.id.indexOf('tag' + filterValue) >= 0) {
          document.getElementById(item.id).classList.add(activeClass);
        }
      }
    } else {
      for (let item of filters) {
        if (item.className.indexOf(activeClass) >= 0) {
          (0, _urlHelpers.setParameterByName)('filter', item.id.substring(3, item.id.length));
        }
      }
    }
  }

  exports.default = Ember.Component.extend({
    actions: {
      queryChanged(query) {
        this.get('queryChanged')(query);
      }
    },
    didRender() {
      filterParam(true);
    },
    click() {
      filterParam(false);
    }
  });
});
;define('kursausschreibung/components/input-base', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: 'div',
    classNames: 'uk-width-1-1',

    componentType: Ember.computed('field.dataType', function () {
      let dataType = this.get('field.dataType');

      // provide typeahead functionality for postal codes (see issue #75)
      // change the type of the fields here so there is no need to change
      // any settings
      if (this.get('field.id') === 'Zip') {
        dataType = 'postal-code';
      }

      return 'input/input-' + dataType;
    })
  });
});
;define('kursausschreibung/components/input/input-checkbox', ['exports', 'kursausschreibung/framework/form-helpers'], function (exports, _formHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        change() {
            let field = this.get('field');
            let currentValue = document.getElementById('vss' + field.id).checked;
            (0, _formHelpers.vssDependency)(currentValue, field);
        }
    });
});
;define('kursausschreibung/components/input/input-date', ['exports', 'kursausschreibung/framework/date-helpers', 'kursausschreibung/framework/form-helpers'], function (exports, _dateHelpers, _formHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        change() {
            if (this.field.id === 'Birthdate') {
                (0, _formHelpers.formFieldError)(this.element.children[0], (0, _dateHelpers.dateGreaterNow)(this.element.children[0].value));
            }
        },
        focusOut() {
            let field = this.get('field');
            let currentValue = document.getElementById('vss' + field.id).value;
            (0, _formHelpers.vssDependency)(currentValue, field);
        }
    });
});
;define('kursausschreibung/components/input/input-dropdown', ['exports', 'kursausschreibung/framework/form-helpers'], function (exports, _formHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        change() {
            let field = this.get('field');
            let currentValue = null;

            document.getElementsByName(field.id).forEach(input => {
                if (field.options.showAsRadioButtons) {
                    currentValue = input.checked ? input.value : currentValue;
                } else {
                    currentValue = input.value;
                }
            });

            (0, _formHelpers.vssDependency)(currentValue, field);
        }
    });
});
;define('kursausschreibung/components/input/input-email', ['exports', 'kursausschreibung/framework/form-helpers'], function (exports, _formHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    change() {
      // show an error message for duplicate e-mails
      const emailFields = this.$().closest('form').find('input[type="email"]').toArray();
      const emailFieldValues = emailFields.map(field => field.value);

      emailFields.forEach((field, fieldIndex) => {
        const valueIndex = emailFieldValues.indexOf(field.value);

        if (valueIndex !== -1 && valueIndex < fieldIndex) {
          (0, _formHelpers.formFieldError)(field, true, 'duplicateEmailError');
        } else {
          (0, _formHelpers.formFieldError)(field, false);
        }
      });
    },
    keyUp() {
      this.change();
    }
  });
});
;define('kursausschreibung/components/input/input-file', ['exports', 'kursausschreibung/framework/translate', 'kursausschreibung/framework/form-helpers', 'uikit'], function (exports, _translate, _formHelpers, _uikit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function getInputFile(fieldId) {
    let elementIdFile = getElementIdFile(fieldId);
    return document.getElementById(elementIdFile).files[0];
  }

  function getElementIdFile(fieldId) {
    return 'file' + fieldId;
  }

  exports.default = Ember.Component.extend({
    change() {

      let elementIdFile = getElementIdFile(this.field.id);
      let inputFile = getInputFile(this.field.id);
      inputFile.imgDev = null;
      let maxFileSizeMB = (this.get('field.maxFileSize') / (1024 * 1024)).toFixed(2);

      if (inputFile.size > this.get('field.maxFileSize') && maxFileSizeMB !== '0.00') {
        _uikit.default.modal.alert((0, _translate.getString)('FileSizeTooBig') + maxFileSizeMB + 'MB');
        (0, _formHelpers.removeFile)(elementIdFile);
      } else if (this.get('field.acceptFileType').indexOf(inputFile.type) === -1 || inputFile.type === "") {
        _uikit.default.modal.alert((0, _translate.getString)('FileTypeNotAccept') + this.get('field.acceptFileType'));
        (0, _formHelpers.removeFile)(elementIdFile);
      } else {

        this.set('field.fileTypeLabel', inputFile.name);
        this.set('field.fileObject', inputFile);

        let buttonClass = document.getElementById('fileBt' + this.field.id);
        buttonClass.classList.remove('required');
        let buttonClassDel = document.getElementById('fileBtDel' + this.field.id);
        buttonClassDel.classList.remove('uk-hidden');

        const reader = new FileReader();
        let data;

        // Note: reading file is async
        reader.onload = () => {
          data = reader.result;
          this.set('field.fileObject.data', data);
        };

        if (inputFile) {
          reader.readAsDataURL(inputFile);
        }

        if (this.get('field.acceptFileType') === 'image/jpeg') {

          let fieldId = this.field.id;
          let buttonClassUpload = document.getElementById('fileBtUpload' + fieldId);
          buttonClassUpload.classList.remove('uk-hidden');

          let imgField = document.getElementById('img' + fieldId);
          imgField.classList.remove('uk-hidden');

          var basic = Ember.$('#img' + this.field.id).croppie({
            viewport: { width: 300, height: 400 },
            boundary: { width: 350, height: 450 }
          });

          basic.croppie('bind', {
            url: URL.createObjectURL(inputFile)
          });
        }

        _uikit.default.notification({ message: (0, _translate.getString)('UploadErfolgreich') + inputFile.name, pos: 'bottom-right', status: 'success' });

        let field = this.get('field');
        (0, _formHelpers.vssDependency)(inputFile, field);
      }
    },
    actions: {

      deleteFile() {
        let fieldId = this.field.id;
        let elementIdFile = getElementIdFile(fieldId);
        let buttonClassDel = document.getElementById('fileBtDel' + fieldId);
        buttonClassDel.classList.add('uk-hidden');

        if (this.get('field.options.required')) {
          let buttonClass = document.getElementById('fileBt' + this.field.id);
          buttonClass.classList.add('required');
        }

        let imgClassDel = document.getElementById('img' + fieldId);
        imgClassDel.classList.add('uk-hidden');
        let imgClassUp = document.getElementById('fileBtUpload' + fieldId);
        imgClassUp.classList.add('uk-hidden');
        let imgFielDev = document.getElementById('imgDev' + fieldId);
        imgFielDev.classList.add('uk-hidden');
        (0, _formHelpers.removeFile)(elementIdFile);
        this.set('field.fileTypeLabel', this.get('field.fileLabelBevorFileChoose'));

        Ember.$('#img' + this.field.id).croppie('destroy');
      },
      uploadImage() {
        let fieldId = this.field.id;
        //on button click
        let basic = Ember.$('#img' + fieldId);
        let inputFile = getInputFile(fieldId);
        basic.croppie('result', {
          type: 'base64',
          format: 'jpeg',
          size: { width: '300', height: '400' }
        }).then(function (base64) {
          // html is div (overflow hidden)
          // with img positioned inside.
          inputFile.imgDev = base64;

          let imgFielDev = document.getElementById('imgDev' + fieldId);
          imgFielDev.src = base64;
          imgFielDev.classList.remove('uk-hidden');
          let imgClassUp = document.getElementById('fileBtUpload' + fieldId);
          imgClassUp.classList.add('uk-hidden');
          let imgClassDel = document.getElementById('img' + fieldId);
          imgClassDel.classList.add('uk-hidden');

          Ember.$('#img' + fieldId).croppie('destroy');
        });
      }

    }

  });
});
;define('kursausschreibung/components/input/input-freeform-dropdown', ['exports', 'kursausschreibung/framework/form-helpers'], function (exports, _formHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    didInsertElement() {
      this._super(...arguments);

      let options = this.get('field.options').options.map(option => option.Value);

      this.$('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 0
      }, {
        limit: 10,
        source: (query, callback) => {
          query = query.trim().toLowerCase();

          callback(options.filter(option => option.toLowerCase().indexOf(query) !== -1));
        }
      });
    },

    willDestroyElement() {
      this.$('.typeahead').typeahead('destroy');
      this._super(...arguments);
    },

    focusOut() {
      let field = this.get('field');
      let currentValue = document.getElementById('vss' + field.id).value;
      (0, _formHelpers.vssDependency)(currentValue, field);
    }
  });
});
;define('kursausschreibung/components/input/input-number', ['exports', 'kursausschreibung/framework/form-helpers'], function (exports, _formHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        focusOut() {
            let field = this.get('field');
            let currentValue = document.getElementById('vss' + field.id).value;
            (0, _formHelpers.vssDependency)(currentValue, field);
        }
    });
});
;define('kursausschreibung/components/input/input-postal-code', ['exports', 'kursausschreibung/framework/api'], function (exports, _api) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    didInsertElement() {
      this._super(...arguments);

      const fetchPostalCodes = (query, asyncResults) => {
        (0, _api.getPostalCodes)(query).then(response => asyncResults(response));
      };

      let $typeahead = this.$('.typeahead');
      let $locationFields = this.$().closest('fieldset').find('input[name="Location"]');

      $typeahead.typeahead({
        hint: true,
        highlight: true,
        minLength: 2
      }, {
        async: true,
        limit: 10,
        source: (query, _syncResults, asyncResults) => {
          Ember.run.debounce(null, fetchPostalCodes, query, asyncResults, 200);
        },
        displayKey: 'Code',
        templates: {
          suggestion: object => `<div>${object.Code} ${object.Location}</div>`
        }
      });

      $typeahead.on('typeahead:select', (_event, suggestion) => $locationFields.val(suggestion.Location));
    },

    willDestroyElement() {
      this.$('.typeahead').typeahead('destroy');
      this._super(...arguments);
    }
  });
});
;define('kursausschreibung/components/input/input-string', ['exports', 'kursausschreibung/framework/form-helpers'], function (exports, _formHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    change() {
      if (this.field.id === 'SocialSecurityNumber') {
        (0, _formHelpers.helperSocialSecurityNumber)(this.element.children[0]);
      }
    },
    keyUp() {
      this.change();
    },
    focusOut() {
      let field = this.get('field');
      let currentValue = document.getElementById('vss' + field.id).value;
      (0, _formHelpers.vssDependency)(currentValue, field);
    }
  });
});
;define('kursausschreibung/components/input/input-telephone', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
;define('kursausschreibung/components/input/input-textarea', ['exports', 'kursausschreibung/framework/form-helpers'], function (exports, _formHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        focusOut() {
            let field = this.get('field');
            let currentValue = document.getElementById('vss' + field.id).value;
            (0, _formHelpers.vssDependency)(currentValue, field);
        }
    });
});
;define('kursausschreibung/components/list-pagination', ['exports', 'kursausschreibung/framework/settings', 'kursausschreibung/framework/gui-helpers', 'kursausschreibung/framework/storage'], function (exports, _settings, _guiHelpers, _storage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  // pages to show before and after the current page
  let n = 2;

  exports.default = Ember.Component.extend({
    lastPage: Ember.computed('items', function () {
      let filter = this.get('items').filter(item => item.codes instanceof Array);
      return filter.length > 0 ? 1 : Math.ceil(this.get('items').length / _settings.default.itemsPerPage);
    }),

    isFirstPage: Ember.computed('page', function () {
      return this.get('page') === 1;
    }),

    isLastPage: Ember.computed('page', 'lastPage', function () {
      return this.get('page') === this.get('lastPage');
    }),

    nextPage: Ember.computed('page', function () {
      return this.get('page') + 1;
    }),

    previousPage: Ember.computed('page', function () {
      return this.get('page') - 1;
    }),

    showFirst: Ember.computed('page', function () {
      return this.get('page') > 1 + n;
    }),

    showLast: Ember.computed('page', 'lastPage', function () {
      return this.get('page') < this.get('lastPage') - n;
    }),

    showLeftDots: Ember.computed('page', function () {
      return this.get('page') > n + 2;
    }),

    showRightDots: Ember.computed('page', 'lastPage', function () {
      return this.get('page') < this.get('lastPage') - (n + 1);
    }),

    pages: Ember.computed('page', 'lastPage', function () {
      let page = this.get('page');
      let lastPage = this.get('lastPage');

      let min = page - n >= 1 ? page - n : 1;
      let max = page + n <= lastPage ? page + n : lastPage;

      let pages = [];

      for (let i = min; i <= max; i++) {
        pages.push({ page: i, active: i === page });
      }

      return pages;
    }),

    itemsOnCurrentPage: Ember.computed('items', 'page', function () {
      let page = this.get('page');
      let filter = this.get('items').filter(item => item.codes instanceof Array);
      return filter.length > 0 ? this.get('items') : this.get('items').slice(_settings.default.itemsPerPage * (page - 1), _settings.default.itemsPerPage * page);
    }),

    filterCodes: Ember.computed('items', function () {

      let filterCodes = this.get('itemsOnCurrentPage').filter(item => item.allfilterCodes instanceof Array);
      let eventfilterCodes = [];
      filterCodes.forEach(event => {

        let existsFilter = filterCodes[0].allfilterCodes.filter(filter => event.filter.indexOf(filter.id) > -1);

        existsFilter.map(filter => {
          if (eventfilterCodes.includes(filter) === false) {
            eventfilterCodes.push(filter);
          }
        });
      });

      return eventfilterCodes.length === 1 ? null : eventfilterCodes;
    }),

    actions: {
      grid() {
        (0, _guiHelpers.displayAsGrid)(true);
      },
      list() {
        (0, _guiHelpers.displayAsGrid)(false);
      }
    },

    didRender() {
      var listViewGrid = (0, _storage.getListViewGrid)();
      listViewGrid = listViewGrid === null ? _settings.default.displayGrid : (0, _storage.getListViewGrid)();
      (0, _guiHelpers.displayAsGrid)(listViewGrid);
    }

  });
});
;define('kursausschreibung/components/remaining-seats-badge', ['exports', 'kursausschreibung/framework/settings'], function (exports, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    init() {
      this._super(...arguments);

      let event = this.get('event');

      event.update();

      let interval = typeof _settings.default.badgeFreeSeats === 'object' ? _settings.default.badgeFreeSeats.intervalSec : null;

      if (typeof interval !== 'number') {
        console.warn('settings.badgeFreeSeats.intervalSec not found. falling back to 30 seconds'); // eslint-disable-line no-console
        interval = 30;
      }

      // update freeSeats every <interval> seconds
      this.set('interval', setInterval(() => event.update(), interval * 1000));
    },

    willDestroyElement() {
      let interval = this.get('interval');

      if (interval !== undefined) clearInterval(interval);
    },

    hidden: Ember.computed('event.{FreeSeats,status}', function () {
      let freeSeats = this.get('event.FreeSeats');
      let status = this.get('event.status');
      let subscriptionYellowDisable = typeof _settings.default.badgeFreeSeats === 'object' ? _settings.default.badgeFreeSeats.subscriptionYellowDisable : false;

      return freeSeats === null || subscriptionYellowDisable && status === 'yellow';
    }),

    labelType: Ember.computed('event.FreeSeats', function () {
      return this.get('event.FreeSeats') > 5 ? 'warning' : 'danger';
    }),

    plural: Ember.computed('event.FreeSeats', function () {
      return this.get('event.FreeSeats') !== 1;
    })
  });
});
;define('kursausschreibung/components/status-lamp', ['exports', 'kursausschreibung/framework/translate'], function (exports, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const statuses = {
    green: { tooltip: (0, _translate.getString)('greenLamp'), className: 'lamp-green', icon: 'pencil' },
    chartreuse: { tooltip: (0, _translate.getString)('chartreuseLamp'), className: 'lamp-chartreuse', icon: 'check' },
    yellow: { tooltip: (0, _translate.getString)('yellowLamp'), className: 'lamp-yellow', icon: 'clock' },
    red: { tooltip: (0, _translate.getString)('redLamp'), className: 'lamp-red', icon: 'close' },
    orange: { tooltip: (0, _translate.getString)('orangeLamp'), className: 'lamp-orange', icon: 'ban' }
  };

  exports.default = Ember.Component.extend({
    init() {
      this._super(...arguments);
      // trigger observer
      this.statusChanged();
    },

    statusChanged: Ember.observer('status', function () {
      let status = statuses[this.get('status')];

      if (status !== undefined) {
        this.set('tooltip', status.tooltip);
        this.set('color', status.className);
        this.set('icon', status.icon);
      }
    }),

    tagName: 'span',
    attributeBindings: ['tooltip:data-uk-tooltip', "icon:uk-icon"],
    classNames: ['status-lamp', 'icon-lamp'],
    classNameBindings: ['color']
  });
});
;define('kursausschreibung/components/subscription-form', ['exports', 'kursausschreibung/framework/date-helpers', 'kursausschreibung/framework/storage', 'kursausschreibung/framework/translate', 'uikit'], function (exports, _dateHelpers, _storage, _translate, _uikit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    useCompanyAddress: false,

    additionalPeopleCount: 0,

    additionalPeople: Ember.computed('additionalPeopleCount', function () {
      // create an array so handlebars can iterate over it
      let count = this.get('additionalPeopleCount');
      let array = [];
      for (let i = 0; i < count; i++) {
        array.push(i + 1);
      }

      return array;
    }),

    thereAreAdditionalPeople: Ember.computed('additionalPeopleCount', function () {
      return this.get('additionalPeopleCount') > 0;
    }),

    actions: {
      submit(event) {
        event.preventDefault();

        subscribe(this.$('form'), this);
        this.get('subscribe')();
      },

      addPerson() {
        if (this.get('event.FreeSeats') - 1 - this.get('additionalPeopleCount') <= 0) {
          _uikit.default.modal.alert((0, _translate.getString)('noSeatsAvailable'));
          return;
        }

        this.set('additionalPeopleCount', this.get('additionalPeopleCount') + 1);
      },

      removePerson() {
        const additionalPeopleCount = this.get('additionalPeopleCount');

        if (additionalPeopleCount < 1) {
          return;
        }

        const that = this;

        _uikit.default.modal.confirm((0, _translate.getString)('confirmDeletion'), {
          labels: { ok: (0, _translate.getString)('yes'), cancel: (0, _translate.getString)('no') }
        }).then(function () {
          that.set('additionalPeopleCount', additionalPeopleCount - 1);
        });
      }
    }
  });


  // this function subscribes a person to an event using the information
  // provided in the form
  function subscribe($form, self) {
    let useCompanyAddress = self.get('useCompanyAddress') === true;
    let eventId = self.get('event.Id');
    let userSettings = self.get('userSettings');

    // subscription
    let subscriptionData = {
      EventId: eventId,
      PersonId: null,
      SubscriptionDetails: []
    };

    let assocSubscriptionData = getFieldSetData([], $form.find('.subscription-detail-fields')); // for confirmation values

    $form.find('.subscription-detail-fields').find('input, select, textarea').each((_, element) => {
      let vssId = parseInt(element.name);
      let value = null;

      if (element.type === 'checkbox') value = element.checked ? 'Ja' : 'Nein';else if (element.type === 'file') value = element.files[0] !== undefined ? element.files[0].name : null;else if (element.value !== '' && element.dataset.type === 'date') value = (0, _dateHelpers.getDMY)(element.value); // this is the required format for subscriptionDetails
      else if (element.value !== '' && element.type !== 'radio' || element.checked) value = element.value;

      if (value !== null) subscriptionData.SubscriptionDetails.push({ VssId: vssId, Value: value });
    });

    //made a array of Files for upload to server
    let subscriptionFiles = [];
    for (const [key, value] of Object.entries(assocSubscriptionData)) {
      if (value instanceof Object) {
        subscriptionFiles.push({ IdVss: key, fileAsBase64: value.imgDev === null ? value.data : value.imgDev, name: value.name, size: value.size, type: value.type });
      }
    }

    // values for dataToSubmit
    let personId = userSettings.IdPerson,
        tableData = {},
        addressData,
        companyAddressData,
        additionalPeople;

    const addressProperties = ['Country', 'CountryId', 'FormOfAddress', 'FormOfAddressId', 'HomeCountry', 'HomeCountryId', 'Nationality', 'NationalityId', 'AddressLine1', 'AddressLine2', 'BillingAddress', 'Birthdate', 'CorrespondenceAddress', 'Email', 'Email2', 'FirstName', 'Gender', 'HomeTown', 'IsEmployee', 'LastName', 'Location', 'MiddleName', 'NativeLanguage', 'PhoneMobile', 'PhonePrivate', 'Profession', 'SocialSecurityNumber', 'StayPermit', 'StayPermitExpiry', 'Zip'];

    const companyAddressProperties = ['PersonId', 'AddressType', 'AddressTypeId', 'Country', 'CountryId', 'FormOfAddress', 'FormOfAddressId', 'AddressLine1', 'AddressLine2', 'Company', 'Department', 'FirstName', 'IsBilling', 'IsCorrespondence', 'LastName', 'Location', 'Remark', 'ValidFrom', 'ValidTo', 'Zip'];

    // read address and companyAddress if we don't know the personId yet
    if (userSettings.isLoggedIn !== true) {

      // main address
      addressData = getFieldSetData(addressProperties, $form.find('.address-fields'));

      // company address
      companyAddressData = getFieldSetData(companyAddressProperties, $form.find('.company-address-fields'));

      // set tableData for the main person
      tableData.fields = getTableData(self.get('fields'), addressData);

      // set tableData for the company address
      if (useCompanyAddress) {
        tableData.companyFields = getTableData(self.get('companyFields'), companyAddressData);
      }
    }

    // set tableData for subscriptionDetails
    tableData.subscriptionDetailFields = getTableData(self.get('subscriptionDetailFields'), assocSubscriptionData);

    // read addresses for additional people
    additionalPeople = $form.find('.additional-person-fields').toArray().map(fieldset => getFieldSetData(addressProperties, Ember.$(fieldset)));

    // set tableData for additional people
    tableData.additionalPeopleFields = additionalPeople.map((data, index) => ({ index: index + 1, data: getTableData(self.get('additionalPeopleFields'), data) }));

    // save the data to submit
    (0, _storage.setDataToSubmit)({
      personId, eventId, useCompanyAddress, addressData, companyAddressData, subscriptionData,
      additionalPeople, tableData, subscriptionFiles
    });
  }

  // get data from a fieldset in the format expected by the REST-API
  function getFieldSetData(properties, $fieldset) {
    let data = {};

    properties.forEach(property => data[property] = null);

    $fieldset.find('input, select, textarea').each((_, element) => setProperties(data, element));

    return data;
  }

  // add input data of element to data object
  function setProperties(data, element) {
    if (element.nodeName === 'SELECT') {
      let text = element.options[element.selectedIndex].text;

      // skip if there is no selection
      if (text === '') return;

      data[element.name] = element.name === 'StayPermit' ? parseInt(element.value) : text;
      data[element.name + 'Id'] = parseInt(element.value);
      return;
    }

    if (element.type === 'radio') {
      if (element.checked) {
        data[element.name] = element.dataset.humanReadable;
        data[element.name + 'Id'] = parseInt(element.value);
      }
      return;
    }

    if (element.type === 'checkbox') {
      data[element.name] = element.checked;
      return;
    }

    if (element.dataset.type === 'date') {
      data[element.name] = element.value === '' ? null : (0, _dateHelpers.getYMD)(element.value);
      return;
    }

    if (element.type === 'file') {
      data[element.name] = element.files[0] !== undefined ? element.files[0] : null;
      return;
    }

    data[element.name] = element.value === '' ? null : element.value;
  }

  // return a list of key-value pairs for the confirmation table
  function getTableData(fields, data) {
    return fields.map(field => {
      let label = field.label;
      let value = data[field.id];

      // skip empty values
      if (value === null || value === '' || value === undefined) return null;

      // localize true/false
      if (field.dataType === 'checkbox') value = (0, _translate.getString)(value ? 'yes' : 'no');

      // localize dates
      if (field.dataType === 'date') value = (0, _dateHelpers.formatDate)(value, 'LL');

      if (field.dataType === 'file') value = value.name;

      return { label, value };
    }).filter(field => field !== null);
  }
});
;define('kursausschreibung/components/twitter-feed', ['exports', 'kursausschreibung/framework/translate'], function (exports, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    language: (0, _translate.getLanguage)().split('-')[0]
  }).reopenClass({
    positionalParams: ['username']
  });
});
;define('kursausschreibung/controllers/application', ['exports', 'kursausschreibung/framework/translate', 'kursausschreibung/framework/settings'], function (exports, _translate, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let rightWidth = _settings.default.displayRightSide ? 'uk-width-1-4@l' : 'uk-width-1-1';

  exports.default = Ember.Controller.extend({
    showLanguageButton: _settings.default.showLanguageButton,
    logoImage: _settings.default.logoImage,
    logoLink: _settings.default.logoLink,
    showContact: _settings.default.showContact,
    twitterHandle: _settings.default.twitterHandle,
    eventCategoryDropdown: _settings.default.eventCategoryDropdown,
    rightWidth,

    actions: {
      setLanguage(language) {
        (0, _translate.setLanguage)(language);
      }
    }
  });
});
;define('kursausschreibung/controllers/list', ['exports', 'kursausschreibung/framework/settings'], function (exports, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    eventCategoryDropdown: _settings.default.eventCategoryDropdown,

    centerWidth: (() => {
      let displayLeft = _settings.default.eventCategoryDropdown !== true;
      let displayRight = _settings.default.displayRightSide;

      // handle each combination of eventCategoryDropdown and displayRightSide
      // for every viewport-size

      if (!displayLeft && !displayRight) return 'uk-width-1-1';

      if (displayRight && displayLeft) return 'uk-width-3-4@m uk-width-1-2@l';

      if (displayLeft) return 'uk-width-3-4@m';

      return 'uk-width-3-4@l';
    })()
  });
});
;define('kursausschreibung/controllers/list/category/event/index', ['exports', 'kursausschreibung/framework/settings'], function (exports, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let badgeFreeSeatsEnabled = typeof _settings.default.badgeFreeSeats === 'object' && _settings.default.badgeFreeSeats.enabled === true;

  exports.default = Ember.Controller.extend({
    showBreadcrumbs: _settings.default.showBreadcrumbs,
    badgeFreeSeatsEnabled
  });


  // bindings for tooltip and disabled attributes
  Ember.LinkComponent.reopen({
    attributeBindings: ['data-uk-tooltip', 'disabled']
  });
});
;define('kursausschreibung/controllers/list/category/event/subscribe', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      subscribe() {
        this.transitionToRoute('list.category.event.confirmation');
      }
    }
  });
});
;define('kursausschreibung/controllers/list/category/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    page: 1,
    queryParams: ['page'],

    actions: {
      queryChanged() {
        // reset page
        this.set('page', 1);
      }
    }
  });
});
;define('kursausschreibung/controllers/list/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    page: 1,
    queryParams: ['page'],

    actions: {
      queryChanged() {
        // reset page
        this.set('page', 1);
      }
    }
  });
});
;define('kursausschreibung/framework/api', ['exports', 'kursausschreibung/framework/app-config', 'kursausschreibung/framework/storage', 'kursausschreibung/framework/url-helpers', 'kursausschreibung/framework/translate'], function (exports, _appConfig, _storage, _urlHelpers, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE = undefined;
  exports.getUserSettings = getUserSettings;
  exports.getEvents = getEvents;
  exports.getEvent = getEvent;
  exports.getLessons = getLessons;
  exports.getEventLocations = getEventLocations;
  exports.getEventCodes = getEventCodes;
  exports.getSubscriptionDetails = getSubscriptionDetails;
  exports.getSubscriptionDetailDependencies = getSubscriptionDetailDependencies;
  exports.getEventTexts = getEventTexts;
  exports.getDropDownItems = getDropDownItems;
  exports.getPostalCodes = getPostalCodes;
  exports.postPerson = postPerson;
  exports.putPerson = putPerson;
  exports.postAddress = postAddress;
  exports.postSubscription = postSubscription;
  exports.postSubscriptionDetailsFiles = postSubscriptionDetailsFiles;


  let accessToken = null;

  /**
   * do a call to the API-server
   * @param {string} method the HTTP method for the call
   * @param {string} relativeUrl the URL relative to the apiUrl
   * @param {boolean} readableError pass false to get the initial exception
   * @param {object} data data for POST and PUT calls
   * @param {boolean} file for file upload change data and contentType
   */
  function ajax(method, relativeUrl, readableError = true, data = null, file = false) {
    if (accessToken === null) accessToken = (0, _storage.getAccessToken)();

    if (file === false) {
      data = data !== null ? JSON.stringify(data, null, '\t') : undefined;
    }

    let promise = Ember.$.ajax({
      method: method,
      dataType: 'json',
      contentType: method === 'GET' ? 'text/javascript' : file ? false : 'application/json',
      processData: false,
      data: data,
      url: _appConfig.default.apiUrl + '/' + relativeUrl,

      // convert empty response to valid JSON
      dataFilter: data => data === '' ? 'null' : data,

      headers: {
        'CLX-Authorization': `token_type=${_appConfig.default.tokenType}, access_token=${accessToken}`
      }
    });

    if (readableError) {
      promise = promise.catch(() => {
        throw new Error(`${method}-request to ${relativeUrl} failed`); // human-readable error
      });
    }

    return promise;
  }

  function post(relativeUrl, data) {
    return ajax('POST', relativeUrl, false, data);
  }

  function put(relativeUrl, data, file = false) {
    return ajax('PUT', relativeUrl, false, data, file);
  }

  function get(relativeUrl, readableError) {
    return ajax('GET', relativeUrl, readableError);
  }

  /**
   * get UserSettings
   */
  function getUserSettings() {
    return get('UserSettings/');
  }

  /**
   * get all events
   */
  function getEvents() {
    return get('Events/');
  }

  /**
   * get an Event
   * @param {number} eventId the id of the event
   */
  function getEvent(eventId) {
    return get('Events/' + eventId);
  }

  /**
   * get the lessons for all events
   */
  function getLessons() {
    return get('Lessons/');
  }

  /**
   * get the locations for all events
   */
  function getEventLocations() {
    return get('EventLocations/');
  }

  /**
   * get codes that are aasigned events
   */
  function getEventCodes() {
    return get('EventCodes/');
  }

  /**
   * this subscription detail specifies if multiple people can
   * subscribe at the same time
   */
  const SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE = exports.SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE = 10893;

  /**
   * get subscriptionDetails of an event
   * @param {number} eventId the id of the event
   */
  function getSubscriptionDetails(eventId) {
    return get('Events/' + eventId + '/SubscriptionDetails');
  }

  /**
   * get subscriptionDetailDependencies of an event
   * @param {number} eventId the id of the event
   */
  function getSubscriptionDetailDependencies(eventId) {
    return get('SubscriptionDetailDependencies/?idEvent=' + eventId);
  }

  /**
   * get all eventTexts
   * @param {string} cultureInfo 'de-CH' for german and 'en-US' for french
   */
  function getEventTexts(cultureInfo) {
    return get('EventTexts/?CultureInfo=' + cultureInfo);
  }

  let dropDownItems = {};

  /**
   * get available options for dropdown menu
   * @param {string} type type of the items
   */
  function getDropDownItems(type) {
    if (dropDownItems.hasOwnProperty(type)) {
      return Ember.RSVP.Promise.resolve(dropDownItems[type]);
    }

    return get('DropDownItems/' + type).then(response => dropDownItems[type] = response);
  }

  /**
   * search postal codes
   * @param {number} code postal code
   */
  function getPostalCodes(code) {
    return get(`PostalCodes/?filter.Code=~${code}*`);
  }

  /**
   * post a new person
   * @param {object} data data of the person
   */
  function postPerson(data) {
    return post('Persons/', data);
  }

  /**
   * update an existing person
   * @param {object} data data of the person
   * @param {number} personId id of the person
   */
  function putPerson(data, personId) {
    return put('Persons/' + personId, data);
  }

  /**
   * post a new address
   * @param {object} data data of the address
   */
  function postAddress(data) {
    return post('Addresses/', data);
  }

  /**
   * post a new subscription
   * @param {object} data data of the subscription
   */
  function postSubscription(data) {
    return post('Subscriptions/', data);
  }

  /**
   * Post Files to SubscriptionDetails
   * @param {object} data of the subscription files
   * @param {image} image des files Base64Codierung
   * @returns 
   */
  function postSubscriptionDetailsFiles(data, file) {
    return new Ember.RSVP.Promise(resolve => post('SubscriptionDetails/files', data).then((_data, _status, xhr) => {
      resolve([xhr]);
    })).then(([xhr]) => {
      // xhr is in an array so it gets correctly passed along
      let locationHeader = xhr.getResponseHeader('location');
      let arrayBuffer = base64ToArrayBuffer(file.fileAsBase64.substring(file.fileAsBase64.indexOf('base64,') + 7, file.fileAsBase64.length));
      return put((0, _urlHelpers.getCorrectApiUrl)(locationHeader), arrayBuffer, true);
    }).catch(error => {

      if (error instanceof Error) {
        console.error(error); // eslint-disable-line no-console
      }

      let message = '';
      try {
        message = error.responseJSON.Issues[0].Message;
      } catch (exception) {
        message = window.kursausschreibung.subscriptionFilesUploadFailed = (0, _translate.getString)('subscriptionFilesUploadFailed');
      }
      throw { message: message };
    });
  }
  /**
   * https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer 
   */
  function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
});
;define("kursausschreibung/framework/app-config", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = window.kursausschreibung.appConfig;
});
;define('kursausschreibung/framework/date-helpers', ['exports', 'date-fns/parseISO', 'date-fns/format', 'date-fns/locale/de', 'date-fns/locale/fr', 'kursausschreibung/framework/translate'], function (exports, _parseISO, _format, _de, _fr, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatDate = formatDate;
  exports.isInSubscriptionRange = isInSubscriptionRange;
  exports.eventStarted = eventStarted;
  exports.eventEnded = eventEnded;
  exports.combineDate = combineDate;
  exports.removeMinutes = removeMinutes;
  exports.getDMY = getDMY;
  exports.getYMD = getYMD;
  exports.getDateTimeForIcs = getDateTimeForIcs;
  exports.dateGreaterNow = dateGreaterNow;


  // longDateFormats from moment.js
  const formats = {
    'de-CH': {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'dd.MM.yyyy',
      LL: 'EEEEEE, d. MMMM yyyy',
      LLL: 'EEEEEE, d. MMMM yyyy HH:mm',
      LLLL: 'EEEE, d. MMMM yyyy HH:mm'
    },

    'fr-CH': {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'dd.MM.yyyy',
      LL: 'EEEEEE, d MMMM yyyy',
      LLL: 'EEEEEE, d MMMM yyyy HH:mm',
      LLLL: 'EEEE d MMMM yyyy HH:mm'
    }
  }; /* loosely based on the CLX framework */

  const language = (0, _translate.getLanguage)();
  const locale = language === 'de-CH' ? _de.default : _fr.default;

  /**
   * format a date
   * @param {date|string|number|null} date the date to format
   * @param {string} formatString format or longDateFormat from moment.js
   */
  function formatDate(date, formatString = '') {
    if (date === null) return null;

    if (typeof date === 'string') date = (0, _parseISO.default)(date);

    formatString = formatString in formats[language] ? formats[language][formatString] : formatString;

    return (0, _format.default)(date, formatString, { locale });
  }

  /**
   * returns true when the current Date is between
   * SubscriptionDateFrom/SubscriptionTimeFrom and
   * SubscriptionDateTo/SubscriptionTimeTo
   * @param {object} event the event to check
   */
  function isInSubscriptionRange(event) {
    let now = new Date();

    if (event.SubscriptionFrom === null) return now.getTime() < event.SubscriptionTo.getTime();

    return event.SubscriptionFrom.getTime() < now.getTime() && now.getTime() < event.SubscriptionTo.getTime();
  }

  /**
   * return true if DateFrom or SubscriptionDateTo is greater than or equal
   * to the current date
   * @param {object} event event to check
   */
  function eventStarted(event) {
    let now = new Date();
    if (event.DateFrom === null) {
      return true;
    }
    let date = event.DateFrom <= event.SubscriptionDateTo ? event.SubscriptionDateTo : event.DateFrom;
    return (0, _parseISO.default)(date).getTime() >= now.getTime();
  }

  /**
   * return true if DateTo + TimeTo is smaller than or equal
   * to the current datetime
   * @param {object} event event to check
   */
  function eventEnded(event) {
    let now = new Date();
    let dateTo = event.DateTo;
    let repalcePattern = '00:00:00';
    if (dateTo === null) {
      return false;
    }

    dateTo = dateTo.search(repalcePattern) > 0 ? dateTo.replace(repalcePattern, event.TimeTo) : dateTo;
    return (0, _parseISO.default)(dateTo).getTime() <= now.getTime();
  }

  /**
   * combine a date and a time to a single date object
   * this returns null when it fails
   * @param {string} dateString a string containing the date
   * @param {string} timeString a string containing the time in the format hh:mm
   */
  function combineDate(dateString, timeString) {
    try {
      let [hours, minutes] = timeString.split(':').map(str => parseInt(str));
      let date = (0, _parseISO.default)(dateString);
      date.setHours(hours, minutes);
      return date;
    } catch (exception) {
      return null;
    }
  }

  /**
   * return timeString in format 00:00 if it has the format hh:mm:ss
   * @param {string} timeString the string to remove the time from
   */
  function removeMinutes(timeString) {
    return timeString.replace(/^(\d\d:\d\d):\d\d$/g, '$1');
  }

  /**
   * returns true if the format is DD.MM.YYYY
   * @param {string} dateString the date to check
   */
  function isDMY(dateString) {
    return (/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/.test(dateString)
    );
  }

  /**
   * returns dateString in the format DD.MM.YYYY
   * @param {string} dateString the date to convert
   */
  function getDMY(dateString) {
    return isDMY(dateString) ? dateString : formatDate(dateString, 'L');
  }

  /**
   * returns dateString in the format YYYY-MM-DD
   * @param {string} dateString the date to convert
   */
  function getYMD(dateString) {
    return isDMY(dateString) ? dateString.split('.').reverse().join('-') : formatDate(dateString, 'yyyy-MM-dd');
  }

  /**
   * returns dateString in from format yyyy-mm-ddThh:mm:ss to yyyy\mm\dd hh:mm:ss
   * @param {string} dateString the date to convert
   */
  function getDateTimeForIcs(dateString) {
    return dateString.replace(new RegExp('-', 'g'), '/').replace(new RegExp('T', 'g'), ' ');
  }

  /**
   * returns true if date > now
   * @param {string} dateString YYYY-MM-DD
   */

  function dateGreaterNow(date) {
    return (0, _parseISO.default)(date) > Date.now() ? true : false;
  }
});
;define('kursausschreibung/framework/form-helpers', ['exports', 'kursausschreibung/framework/translate'], function (exports, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formFieldError = formFieldError;
  exports.removeFile = removeFile;
  exports.helperSocialSecurityNumber = helperSocialSecurityNumber;
  exports.vssDependency = vssDependency;


  /**
   * set custom validity of a form element
   * @param {object} element
   * @param {boolean} valid
   * @param {string} message
   */
  function formFieldError(element, valid, message = 'invalidInput') {
    if (valid) {
      element.setCustomValidity((0, _translate.getString)(message));
    } else {
      element.setCustomValidity('');
    }
  }

  /**
   * Remove a File from filelist
   * @param {string} elementId 
   */
  function removeFile(elementId) {
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
  function helperSocialSecurityNumber(that) {
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
    } else if (lastCharacter.match(/[0-9]/) === null) {
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
        sum = int * (i & 1 === 1 ? 3 : 1) + sum;
      }
      let checkNumber = 10 - sum % 10;
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
  function vssDependency(formValue, field) {

    if (field.options.dependencyItems !== undefined) {

      let hiddenClass = 'uk-hidden';

      if (field.options.dependencyItems.length > 0) {

        field.options.dependencyItems.forEach(element => {
          let values = element.Values;
          let operator = element.Operator;

          let vssId = element.IdVss;
          let hidden = document.getElementById('hidden' + vssId);
          let requiredElement = document.getElementById('file' + vssId) === null ? document.getElementById('vss' + vssId) : document.getElementById('file' + vssId);

          if (vssDependencyCheck(formValue, operator, values)) {
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

    if (typeof formValue === 'boolean') {
      formValue = formValue ? '1' : '0';
    }

    if (operator === 349) {
      //contains
      return formValue.indexOf(values) > -1 ? true : false;
    } else if (operator === 350) {
      //contains Not
      return formValue.indexOf(values) === -1 ? true : false;
    } else if (operator === 351) {
      //empty
      return formValue === null || formValue === undefined || formValue.length === 0 ? true : false;
    } else if (operator === 352) {
      //notEmpty
      return formValue.length > 0 ? true : false; //formValue !== undefined ||
    }
  }
});
;define('kursausschreibung/framework/gui-helpers', ['exports', 'kursausschreibung/framework/storage'], function (exports, _storage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sortAs = sortAs;
  exports.displayAsGrid = displayAsGrid;


  /**
   * sort value set localStroage sortAs and reload
   * @param {string} value 
   */
  function sortAs(value) {
    (0, _storage.setSortAs)(value);
    window.location.reload();
  }

  /**
   * display eventlist as grid or list
   * true > grid
   * false > list
   * @param {boolean} bool 
   */
  function displayAsGrid(bool) {
    var list = document.getElementById('list-cards');
    var btGrid = document.getElementById('bt-grid');
    var btList = document.getElementById('bt-list');

    if (typeof bool === "boolean") {
      (0, _storage.setListViewGrid)(bool);
    } else {
      (0, _storage.setListViewGrid)(false);
    }

    if (bool) {
      list.classList.add('uk-grid');
      list.classList.add('uk-grid-match');
      list.classList.add('uk-grid-stack');
      list.classList.add('uk-child-width-1-2@m');
      list.classList.add('uk-child-width-1-3@l');
      list.classList.remove('uk-list-divider');
      list.classList.remove('uk-list');
      btGrid.classList.add('active-tab');
      btList.classList.remove('active-tab');
    } else {
      list.classList.add('uk-list-divider');
      list.classList.add('uk-list');
      list.classList.remove('uk-grid');
      list.classList.remove('uk-grid-match');
      list.classList.remove('uk-grid-stack');
      list.classList.remove('uk-child-width-1-2@m');
      list.classList.remove('uk-child-width-1-3@l');
      btList.classList.add('active-tab');
      btGrid.classList.remove('active-tab');
    }
    for (const child of list.children) {

      if (bool) {
        child.classList.add('uk-card');
        child.classList.add('uk-card-body');
        child.classList.add('card-list');
      } else {
        child.classList.remove('uk-card');
        child.classList.remove('uk-card-body');
        child.classList.remove('card-list');
      }
    }
  }
});
;define("kursausschreibung/framework/ics-file", ["module", "exports", "kursausschreibung/framework/date-helpers"], function (module, exports, _dateHelpers) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getIcsFileFromEvent = getIcsFileFromEvent;


    /* eslint-disable */
    function getIcsFileFromEvent(event) {

        /*! ics.js Wed Aug 20 2014 17:23:02 
        * https://github.com/nwcell/ics.js
        * LIB property TRANSP to TRANSP:OPAQUE
        * ics.js lib on mobil Browser does not work #40
        * Android ignoriert die locale Zeitzone (ohne Z am ende) in einer ics Datei #44
        */
        var saveAs = saveAs || function (e) {
            "use strict";
            if (typeof e === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
                return;
            }var t = e.document,
                n = function () {
                return e.URL || e.webkitURL || e;
            },
                r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                o = "download" in r,
                a = function (e) {
                var t = new MouseEvent("click");e.dispatchEvent(t);
            },
                i = /constructor/i.test(e.HTMLElement) || e.safari,
                f = /CriOS\/[\d]+/.test(navigator.userAgent),
                u = function (t) {
                (e.setImmediate || e.setTimeout)(function () {
                    throw t;
                }, 0);
            },
                s = "application/octet-stream",
                d = 1e3 * 40,
                c = function (e) {
                var t = function () {
                    if (typeof e === "string") {
                        n().revokeObjectURL(e);
                    } else {
                        e.remove();
                    }
                };setTimeout(t, d);
            },
                l = function (e, t, n) {
                t = [].concat(t);var r = t.length;while (r--) {
                    var o = e["on" + t[r]];if (typeof o === "function") {
                        try {
                            o.call(e, n || e);
                        } catch (a) {
                            u(a);
                        }
                    }
                }
            },
                p = function (e) {
                if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) {
                    return new Blob([String.fromCharCode(65279), e], { type: e.type });
                }return e;
            },
                v = function (t, u, d) {
                if (!d) {
                    t = p(t);
                }var v = this,
                    w = t.type,
                    m = w === s,
                    y,
                    h = function () {
                    l(v, "writestart progress write writeend".split(" "));
                },
                    S = function () {
                    if ((f || m && i) && e.FileReader) {
                        var r = new FileReader();r.onloadend = function () {
                            var t = f ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;");var n = e.open(t, "_blank");if (!n) e.location.href = t;t = undefined;v.readyState = v.DONE;h();
                        };r.readAsDataURL(t);v.readyState = v.INIT;return;
                    }if (!y) {
                        y = n().createObjectURL(t);
                    }if (m) {
                        e.location.href = y;
                    } else {
                        var o = e.open(y, "_blank");if (!o) {
                            e.location.href = y;
                        }
                    }v.readyState = v.DONE;h();c(y);
                };v.readyState = v.INIT;if (o) {
                    y = n().createObjectURL(t);setTimeout(function () {
                        r.href = y;r.download = u;a(r);h();c(y);v.readyState = v.DONE;
                    });return;
                }S();
            },
                w = v.prototype,
                m = function (e, t, n) {
                return new v(e, t || e.name || "download", n);
            };if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
                return function (e, t, n) {
                    t = t || e.name || "download";if (!n) {
                        e = p(e);
                    }return navigator.msSaveOrOpenBlob(e, t);
                };
            }w.abort = function () {};w.readyState = w.INIT = 0;w.WRITING = 1;w.DONE = 2;w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null;return m;
        }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content);if (typeof module !== "undefined" && module.exports) {
            module.exports.saveAs = saveAs;
        } else if (typeof define !== "undefined" && define !== null && define.amd !== null) {
            define("FileSaver.js", function () {
                return saveAs;
            });
        }
        var ics = function (e, t) {
            "use strict";
            {
                if (!(navigator.userAgent.indexOf("MSIE") > -1 && -1 == navigator.userAgent.indexOf("MSIE 10"))) {
                    void 0 === e && (e = "default"), void 0 === t && (t = "Calendar");var r = -1 !== navigator.appVersion.indexOf("Win") ? "\r\n" : "\n",
                        n = [],
                        i = ["BEGIN:VCALENDAR", "PRODID:" + t, "VERSION:2.0", "BEGIN:VTIMEZONE", "TZID:Europe/Zurich", "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "DTSTART:19810329T020000", "TZNAME:MESZ", "TZOFFSETTO:+0200", "END:DAYLIGHT", "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "DTSTART:19961027T030000", "TZNAME:MEZ", "TZOFFSETTO:+0100", "END:STANDARD", "END:VTIMEZONE"].join(r),
                        o = r + "END:VCALENDAR",
                        a = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];return { events: function () {
                            return n;
                        }, calendar: function () {
                            return i + r + n.join(r) + o;
                        }, addEvent: function (t, i, o, l, u, s) {
                            if (void 0 === t || void 0 === i || void 0 === o || void 0 === l || void 0 === u) return !1;if (s && !s.rrule) {
                                if ("YEARLY" !== s.freq && "MONTHLY" !== s.freq && "WEEKLY" !== s.freq && "DAILY" !== s.freq) throw "Recurrence rrule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'";if (s.until && isNaN(Date.parse(s.until))) throw "Recurrence rrule 'until' must be a valid date string";if (s.interval && isNaN(parseInt(s.interval))) throw "Recurrence rrule 'interval' must be an integer";if (s.count && isNaN(parseInt(s.count))) throw "Recurrence rrule 'count' must be an integer";if (void 0 !== s.byday) {
                                    if ("[object Array]" !== Object.prototype.toString.call(s.byday)) throw "Recurrence rrule 'byday' must be an array";if (s.byday.length > 7) throw "Recurrence rrule 'byday' array must not be longer than the 7 days in a week";s.byday = s.byday.filter(function (e, t) {
                                        return s.byday.indexOf(e) == t;
                                    });for (var c in s.byday) if (a.indexOf(s.byday[c]) < 0) throw "Recurrence rrule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'";
                                }
                            }var g = new Date(l),
                                d = new Date(u),
                                f = new Date(),
                                S = ("0000" + g.getFullYear().toString()).slice(-4),
                                E = ("00" + (g.getMonth() + 1).toString()).slice(-2),
                                v = ("00" + g.getDate().toString()).slice(-2),
                                y = ("00" + g.getHours().toString()).slice(-2),
                                A = ("00" + g.getMinutes().toString()).slice(-2),
                                T = ("00" + g.getSeconds().toString()).slice(-2),
                                b = ("0000" + d.getFullYear().toString()).slice(-4),
                                D = ("00" + (d.getMonth() + 1).toString()).slice(-2),
                                N = ("00" + d.getDate().toString()).slice(-2),
                                h = ("00" + d.getHours().toString()).slice(-2),
                                I = ("00" + d.getMinutes().toString()).slice(-2),
                                R = ("00" + d.getMinutes().toString()).slice(-2),
                                M = ("0000" + f.getFullYear().toString()).slice(-4),
                                w = ("00" + (f.getMonth() + 1).toString()).slice(-2),
                                L = ("00" + f.getDate().toString()).slice(-2),
                                O = ("00" + f.getHours().toString()).slice(-2),
                                p = ("00" + f.getMinutes().toString()).slice(-2),
                                Y = ("00" + f.getMinutes().toString()).slice(-2),
                                U = "",
                                V = "";y + A + T + h + I + R != 0 && (U = "T" + y + A + T, V = "T" + h + I + R);var B,
                                C = S + E + v + U,
                                j = b + D + N + V,
                                m = M + w + L + ("T" + O + p + Y);if (s) if (s.rrule) B = s.rrule;else {
                                if (B = "rrule:FREQ=" + s.freq, s.until) {
                                    var x = new Date(Date.parse(s.until)).toISOString();B += ";UNTIL=" + x.substring(0, x.length - 13).replace(/[-]/g, "") + "000000Z";
                                }s.interval && (B += ";INTERVAL=" + s.interval), s.count && (B += ";COUNT=" + s.count), s.byday && s.byday.length > 0 && (B += ";BYDAY=" + s.byday.join(","));
                            }new Date().toISOString();var H = ["BEGIN:VEVENT", "UID:" + n.length + "@" + e, "CLASS:PUBLIC", "DESCRIPTION:" + i, "DTSTAMP:" + m, "DTSTART;TZID=Europe/Zurich:" + C, "DTEND;TZID=Europe/Zurich:" + j, "LOCATION:" + o, "SUMMARY:" + t, "TRANSP:OPAQUE", "END:VEVENT"];return B && H.splice(4, 0, B), H = H.join(r), n.push(H), H;
                        }, download: function (e, t) {
                            if (n.length < 1) return !1;t = void 0 !== t ? t : ".ics", e = void 0 !== e ? e : "calendar";var a,
                                l = i + r + n.join(r) + o;if (-1 === navigator.userAgent.indexOf("MSIE 10")) a = new Blob([l], { type: "text/calendar" });else {
                                var u = new BlobBuilder();u.append(l), a = u.getBlob("text/x-vCalendar;charset=" + document.characterSet);
                            }return saveAs(a, e + t), l;
                        }, build: function () {
                            return !(n.length < 1) && i + r + n.join(r) + o;
                        } };
                }console.log("Unsupported Browser");
            }
        };
        /*https://github.com/nwcell/ics.js */

        // You can use this for easy debugging
        /*
        console.log(event);
        var makelogs = function(obj) {
            console.log('Events Array');
            console.log('=================');
            console.log(obj.events());
            console.log('Calendar With Header');
            console.log('=================');
            console.log(obj.calendar());
          }
          */
        let eventlocation = event.ResourceDesignation + ', ' + event.BuildingName + ', ' + event.BuildingAddress + ', ' + event.BuildingZip + ' ' + event.BuildingLocation;
        if (event.ResourceDesignation === undefined) {
            eventlocation = !event.Location ? '' : event.Location;
        }

        let cal = ics();
        event.lessons.forEach(lesson => {
            let leadership = !event.Leadership ? '' : ' (' + event.Leadership + ')';
            let lessonDesignation = !lesson.Designation ? '' : lesson.Designation;
            cal.addEvent(event.Designation + leadership.replace(/(\r\n|\n|\r)/gm, ""), lessonDesignation, eventlocation.replace(/(\r\n|\n|\r)/gm, ""), (0, _dateHelpers.getDateTimeForIcs)(lesson.DateTimeFrom), (0, _dateHelpers.getDateTimeForIcs)(lesson.DateTimeTo));
        });

        //makelogs(cal);
        cal.download(event.Number);
    }
});
;define('kursausschreibung/framework/login-helpers', ['exports', 'kursausschreibung/framework/storage', 'kursausschreibung/framework/app-config', 'kursausschreibung/framework/url-helpers', 'kursausschreibung/framework/translate'], function (exports, _storage, _appConfig, _urlHelpers, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.checkToken = checkToken;
  exports.autoCheckForLogin = autoCheckForLogin;


  /**
   * return true if there is a valid token in the localStorage
   */
  function isLoggedIn() {
    let accessToken = (0, _storage.getAccessToken)();
    let tokenExpire = (0, _storage.getTokenExpire)();

    if (accessToken === null || tokenExpire !== null && Date.now() >= tokenExpire) {
      return false;
    }

    if (_appConfig.default.useAutoLogin !== true) {
      // we can assume that instance and culture are correct
      return true;
    }

    let payload = parseJWT(accessToken);

    // only return true if instanceId and culture are correct
    return _appConfig.default.instanceId === payload.instance_id && payload.culture_info === (0, _translate.getLanguage)();
  }

  /**
   * parse accessToken and return the JWT payload
   * @param {string} accessToken the accessToken
   */
  function parseJWT(accessToken) {
    return JSON.parse(atob(accessToken.split('.')[1]));
  }

  // save the OAuth token if there is one in the URL
  function checkToken() {
    let accessToken = (0, _urlHelpers.getParameterByName)('access_token');

    if (accessToken !== null) {
      // store token, refresh token and expiration
      let refreshToken = (0, _urlHelpers.getParameterByName)('refresh_token');
      let tokenExpire = parseJWT(accessToken).exp * 1000;

      (0, _storage.setAccessToken)(accessToken);
      (0, _storage.setRefreshToken)(refreshToken);
      (0, _storage.setTokenExpire)(tokenExpire);

      // navigate back to initial url
      history.replaceState(null, null, (0, _urlHelpers.getParameterByName)('moduleRedirectUrl'));
    }
  }

  /**
   * return resolved promise if there is a valid token
   * get a new accesToken otherwise
   */
  function autoCheckForLogin() {
    if (isLoggedIn()) {
      return Ember.RSVP.Promise.resolve();
    }

    if (_appConfig.default.useAutoLogin === true) {
      // get a new token from the OAuth server
      let params = Ember.$.param({
        clientId: _appConfig.default.clientId,
        redirectUrl: _appConfig.default.webBaseUrl,
        culture_info: (0, _translate.getLanguage)(),
        application_scope: _appConfig.default.applicationScope,
        moduleRedirectUrl: location.href
      });

      let url = `${_appConfig.default.oauthUrl}/Authorization/${_appConfig.default.instanceId}/Token?${params}`;

      location.replace(url);
    } else {
      // let the application which embeds this module get a new token
      location.reload();
    }

    return new Ember.RSVP.Promise(() => {}); // never resolve so no error-message gets shown
  }
});
;define('kursausschreibung/framework/scroll-helpers', ['exports', 'kursausschreibung/framework/settings'], function (exports, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.scrollToTimeout = scrollToTimeout;
  exports.setOffsetStickyHeader = setOffsetStickyHeader;


  /**
   * scroll to target after timeout
   * @param {string} elementId id of html element
   */
  function scrollToTimeout(elementId) {
    setTimeout(function () {
      scrollToTargetAdjusted(elementId);
    }, 500);
  }

  /**
   * set offset from settings.headerOffset to uk-sticky attribut
   * @param {string} elementId id of html element
   */
  function setOffsetStickyHeader(elementId) {
    document.getElementById(elementId).setAttribute('uk-sticky', 'offset: ' + _settings.default.headerOffset + '; bottom: #top');
  }

  /**
   * scroll to position of a element consider settings.headerOffset
   * @param {string} elementId id of html element
   */
  function scrollToTargetAdjusted(elementId) {
    var element = document.getElementById(elementId);
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = window.scrollY + elementPosition - _settings.default.headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
});
;define('kursausschreibung/framework/seo', ['exports', 'kursausschreibung/framework/url-helpers'], function (exports, _urlHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.setJsonLd = setJsonLd;


    /**
     * create a json-ld element in head of document with schema.org course.
     * @param {object} allevents from getAllEvents()
     */
    function setJsonLd(allEvents) {

        let ld = [];
        let areas = Object.values(allEvents.areas);

        areas.forEach(area => {
            area.events.forEach(event => {
                let course = {};
                course['@context'] = 'https://schema.org/';
                course['@type'] = 'Course';
                course['name'] = event.Designation;
                course['description'] = getDescription(event);
                course['courseCode'] = event.Number;
                course['provider'] = { type: 'Organization', name: event.Host };
                course['url'] = (0, _urlHelpers.getRootModulUrl)() + '#/uid/' + event.Id;

                ld.push(course);
            });
        });

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(ld);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function getDescription(event) {
        let description = event.EventCategory + ';';
        event.texts.forEach(text => {
            description = description + text.label + ':' + text.memo + ';';
        });
        return description;
    }
});
;define("kursausschreibung/framework/settings", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = window.kursausschreibung.settings;
});
;define('kursausschreibung/framework/status', ['exports', 'kursausschreibung/framework/date-helpers', 'kursausschreibung/framework/settings'], function (exports, _dateHelpers, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isRed = exports.isYellow = exports.isChartreuse = exports.isGreen = undefined;


  /**
   * return the callback specified in the settings or the
   * default implementation
   * @param {function?} settingsValue a custom implementation
   * @param {function} defaultImplementation the default implementation
   */
  function createStatusCallback(settingsValue, defaultImplementation) {
    if (typeof settingsValue === 'function') return settingsValue;

    return defaultImplementation;
  }

  // see "Event Status Definition" in documentation
  let isGreen = createStatusCallback(_settings.default.lampIsGreen, function (event) {
    return event.AllowSubscriptionInternetByStatus && event.TypeOfSubscription === 4 && (0, _dateHelpers.isInSubscriptionRange)(event) && (event.FreeSeats > 0 && event.MaxParticipants - event.FreeSeats < event.MinParticipants || event.EventTypeId === 1);
  });

  let isChartreuse = createStatusCallback(_settings.default.lampIsChartreuse, function (event) {
    return event.AllowSubscriptionInternetByStatus && event.TypeOfSubscription === 4 && (0, _dateHelpers.isInSubscriptionRange)(event) && event.FreeSeats > 0 && event.MaxParticipants - event.FreeSeats >= event.MinParticipants;
  });

  let isYellow = createStatusCallback(_settings.default.lampIsYellow, function (event) {
    return event.AllowSubscriptionInternetByStatus && event.TypeOfSubscription === 4 && !(0, _dateHelpers.isInSubscriptionRange)(event);
  });

  let isRed = createStatusCallback(_settings.default.lampIsRed, function (event) {
    return event.AllowSubscriptionInternetByStatus && event.TypeOfSubscription === 4 && event.FreeSeats === 0;
  });

  exports.isGreen = isGreen;
  exports.isChartreuse = isChartreuse;
  exports.isYellow = isYellow;
  exports.isRed = isRed;
});
;define('kursausschreibung/framework/storage', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getDataToSubmit = getDataToSubmit;
  exports.setDataToSubmit = setDataToSubmit;
  /* loosely based on the CLX framework */

  /**
   * stores an object serialized as JSON
   * @param {string} key key used to store the object
   * @param {object} value the value to store
   */
  function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * reads and deserializes an object from the localStorage
   * @param {string} key key used to store the object
   */
  function getItem(key) {
    let item = localStorage.getItem(key);

    return item !== undefined ? JSON.parse(item) : null;
  }

  // export getters and setters for all the values
  let [[getCulture, setCulture], [getAccessToken, setAccessToken], [getRefreshToken, setRefreshToken], [getTokenExpire, setTokenExpire], [getListViewGrid, setListViewGrid], [getSortAs, setSortAs]] = ['uiCulture', 'CLX.LoginToken', 'CLX.RefreshToken', 'CLX.TokenExpire', 'listViewGrid', 'sortAs', 'kursausschreibung.dataToSubmit'].map(key => [getItem.bind(null, key), setItem.bind(null, key)]);

  exports.getCulture = getCulture;
  exports.setCulture = setCulture;
  exports.getAccessToken = getAccessToken;
  exports.setAccessToken = setAccessToken;
  exports.getRefreshToken = getRefreshToken;
  exports.setRefreshToken = setRefreshToken;
  exports.getTokenExpire = getTokenExpire;
  exports.setTokenExpire = setTokenExpire;
  exports.getListViewGrid = getListViewGrid;
  exports.setListViewGrid = setListViewGrid;
  exports.getSortAs = getSortAs;
  exports.setSortAs = setSortAs;
  function getDataToSubmit() {
    return window.kursausschreibung.dataToSubmit;
  }

  function setDataToSubmit(dataToSubmit) {
    window.kursausschreibung.dataToSubmit = dataToSubmit;
  }
});
;define('kursausschreibung/framework/store', ['exports', 'kursausschreibung/framework/api', 'kursausschreibung/framework/status', 'kursausschreibung/framework/date-helpers', 'kursausschreibung/framework/settings', 'kursausschreibung/framework/translate', 'kursausschreibung/framework/storage', 'date-fns/format'], function (exports, _api, _status, _dateHelpers, _settings, _translate, _storage, _format) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isInitialized = isInitialized;
  exports.getAllEvents = getAllEvents;
  exports.getEventById = getEventById;
  exports.init = init;


  let initialized = false;

  /**
   * this returns true if init completed successfully
   */
  function isInitialized() {
    return initialized;
  }

  // group events by areaOfEducation, EventCategory and Id
  let eventsByArea = { areas: {}, areaKeys: [] };
  let eventsById = [];

  /**
   * get all events grouped by areaOfEducation
   */
  function getAllEvents() {
    return eventsByArea;
  }

  /**
   * get an event by id
   * @param {number} id the id of the event
   */
  function getEventById(id) {
    if (eventsById.hasOwnProperty(id)) {
      return eventsById[id];
    }

    return undefined;
  }

  /**
   * this function initializes the store by:
   *  + fetching and storing events, lessons locations and texts
   *  + filtering and sorting events
   *  + adding properties to events
   */
  function init() {
    let language = (0, _translate.getLanguage)() === 'fr-CH' ? 'en-US' : 'de-CH';

    // fetch all events
    return Ember.RSVP.all([(0, _api.getEvents)(), (0, _api.getLessons)(), (0, _api.getEventLocations)(), (0, _api.getEventTexts)(language), (0, _api.getEventCodes)()]).then(function ([events, lessons, eventLocations, eventTexts, eventCodes]) {

      // filter events
      events = filterEvents(events, language, eventCodes);

      // sort events
      var sortAs = (0, _storage.getSortAs)();
      if (sortAs === null) {
        if (_settings.default.sortEventList !== null) {
          events = Ember.A(events).sortBy(_settings.default.sortEventList);
        }
      } else {
        events = Ember.A(events).sortBy(sortAs);
      }

      // prepare events
      events.forEach(prepareEvent);

      // add lessons to events
      addLessonsToEvents(lessons);

      // add eventLocations to events
      addLocationsToEvents(eventLocations);

      // add texts to events
      addTextsToEvents(eventTexts, language);

      // add codes to events (it's important to filter)
      addCodesToEvents(eventCodes);

      // sort areaKeys
      eventsByArea.areaKeys = Object.keys(eventsByArea.areas).sort();

      // sort categoryKeys
      eventsByArea.areaKeys.forEach(area => eventsByArea.areas[area].categoryKeys = Object.keys(eventsByArea.areas[area].categories).sort());

      initialized = true;
    });
  }

  /**
   * add texts to events
   * @param {object[]} eventTexts eventTexts returned by the API
   * @param {string} language the active language
   */
  function addTextsToEvents(eventTexts, language) {
    eventTexts.forEach(function (textItem) {
      if (!eventsById.hasOwnProperty(textItem.EventId)) {
        return;
      }

      // only show texts with the correct cultureInfo
      if (textItem.CultureInfo !== language) {
        return;
      }

      let text = eventsById[textItem.EventId].texts[textItem.Number];

      if (text === undefined) {
        text = eventsById[textItem.EventId].texts[textItem.Number] = {
          label: null,
          memo: null,
          id: textItem.Number
        };
      }

      text[textItem.Type.toLowerCase()] = textItem.Value;
    });

    // if the 13th event text is an url it is used to subscribe to the event
    // see: https://github.com/bkd-mba-fbi/kursausschreibung/issues/67
    eventsById.forEach(event => {
      if (event.texts.length >= 14 && /^https?:\/\/[^ ]+$/.test(event.texts[13].memo)) {
        event.externalSubscriptionURL = event.texts[13].memo;
        event.texts[13].memo = null;
      } else {
        event.externalSubscriptionURL = null;
      }
    });

    // remove texts with empty label or memo
    eventsById.forEach(event => event.texts = event.texts.filter(text => text.label !== null && text.memo !== null));
  }

  /**
   * add locations to events
   * @param {object[]} eventLocations eventLocations returned by the API
   */
  function addLocationsToEvents(eventLocations) {
    eventLocations.forEach(function (location) {
      let eventId = location.EventId;

      if (!eventsById.hasOwnProperty(eventId)) {
        return;
      }

      // don't overwrite the event-Id
      delete location.Id;
      eventsById[eventId] = Ember.$.extend(eventsById[eventId], location);
    });
  }

  /**
   * add lessons to events
   * @param {object[]} lessons lessons returned by the API
   */
  function addLessonsToEvents(lessons) {

    lessons.forEach(function (lesson) {
      if (!eventsById.hasOwnProperty(lesson.EventId)) {
        return;
      }

      // make DateFrom and DateTo human-readable
      lesson.DateFrom = (0, _dateHelpers.formatDate)(lesson.DateTimeFrom, 'LLL');
      lesson.TimeTo = (0, _dateHelpers.formatDate)(lesson.DateTimeTo, 'LT');

      eventsById[lesson.EventId].lessons.push(lesson);
      if (eventsById[lesson.EventId].lessons.length > _settings.default.howManyLessonsShow) {
        eventsById[lesson.EventId].lessonsCollaps = true;
      } else {
        eventsById[lesson.EventId].lessonsCollaps = false;
      }
    });
  }

  /**
   * add Codes to events
   * @param {object[]} eventCodes eventCodes returned by the API
   */
  function addCodesToEvents(eventCodes) {

    // add all codes to event
    let prefix = 'FilterTag';
    let filterCodes = [];
    let codeIds = [];
    eventCodes.forEach(function (code) {

      if (codeIds.find(ids => ids === code.CodeId) === undefined) {
        codeIds.push(code.CodeId);
        let codeName = (0, _translate.getString)(prefix + code.CodeId).indexOf('<span style="color:red;">Key not found:') >= 0 ? code.Code : (0, _translate.getString)(prefix + code.CodeId);
        filterCodes.push({ id: code.CodeId, Code: codeName });
      }
    });

    eventCodes.forEach(function (code) {

      if (!eventsById.hasOwnProperty(code.EventId)) {
        return;
      }
      // add codes-array
      if (eventsById[code.EventId].codes === undefined) {
        eventsById[code.EventId].codes = [];
      }

      eventsById[code.EventId].codes.push(code);

      // adds filter tag
      let filter = eventsById[code.EventId].filter;
      eventsById[code.EventId].filter = filter === undefined ? 'tag' + code.CodeId : filter + ' tag' + code.CodeId;
      eventsById[code.EventId].allfilterCodes = filterCodes;
    });
  }

  /**
   * filter out events based on settings
   * @param {object[]} events events returned by the API
   * @param {string} language the active language
   */
  function filterEvents(events, language, eventCodes) {
    // filter out events with undesired parameters

    // backwards compatibility fallback for single hostId filter
    if (_settings.default.hostIds instanceof Array) {
      events = events.filter(event => _settings.default.hostIds.indexOf(event.HostId) !== -1);
    }
    // or use initialListFilters array
    else if (_settings.default.initialListFilters instanceof Object) {
        if (_settings.default.initialListFilters.hostIds instanceof Array) {
          events = events.filter(event => _settings.default.initialListFilters.hostIds.indexOf(event.HostId) !== -1);
        }

        if (_settings.default.initialListFilters.eventCategoryIds instanceof Array) {
          events = events.filter(event => _settings.default.initialListFilters.eventCategoryIds.indexOf(event.EventCategoryId) !== -1);
        }

        if (_settings.default.initialListFilters.eventLevelIds instanceof Array) {
          events = events.filter(event => _settings.default.initialListFilters.eventLevelIds.indexOf(event.EventLevelId) !== -1);
        }

        if (_settings.default.initialListFilters.eventTypeIds instanceof Array) {
          events = events.filter(event => _settings.default.initialListFilters.eventTypeIds.indexOf(event.EventTypeId) !== -1);
        }

        if (_settings.default.initialListFilters.statusIds instanceof Array) {
          events = events.filter(event => _settings.default.initialListFilters.statusIds.indexOf(event.StatusId) !== -1);
        }

        if (_settings.default.initialListFilters.codeIds instanceof Array) {
          eventCodes = eventCodes.filter(code => _settings.default.initialListFilters.codeIds.indexOf(code.CodeId) !== -1);
          let codes = [];
          eventCodes.forEach(eventcode => {
            codes.push(eventcode.EventId);
          });
          events = events.filter(event => codes.indexOf(event.Id) !== -1);
        }
      }

    // filter out events with non-matching LanguageOfInstruction
    if (_settings.default.languageOfInstructionFilter) {
      events = events.filter(event => event.LanguageOfInstruction === 'Bilingue' || event.LanguageOfInstruction === "1" && language === 'de-CH' || event.LanguageOfInstruction === 'Deutsch' && language === 'de-CH' || event.LanguageOfInstruction === "2" && language === 'en-US' || event.LanguageOfInstruction === 'Französisch' && language === 'en-US');
    }

    if (_settings.default.showStartedEvents) {
      // Filter out events which have not ended yet
      events = events.filter(event => !(0, _dateHelpers.eventEnded)(event));
    } else {
      // Default behaviour, filter out events which have started
      events = events.filter(event => (0, _dateHelpers.eventStarted)(event));
    }

    return events;
  }

  /**
   * this function adds properties and the displayObject to every event
   * transforms every event into an ember-object
   * and sorts events by id, area and category
   * @param {object} event event returned by the API
   */
  function prepareEvent(event) {

    // add properties to the events
    addPropertiesToEvent(event);

    // set LanguageOfInstruction, if int to string translate value
    setLanguageEventFromIntToString(event);

    // create proxy for human-readable values
    addDisplayData(event);

    //settings subscriptionWithLoginURL
    event.subscriptionWithLoginURL = _settings.default.subscriptionWithLoginURL;

    //event subtitle when > inside string
    let eventSubtitle = event.Designation.split(_settings.default.eventSubtitle);
    event.Designation = eventSubtitle.length > 1 ? eventSubtitle[0] : event.Designation;
    event.subtitle = eventSubtitle.length > 1 ? eventSubtitle[1] : null;

    // create an ember-object of the event
    event = createEmberObject(event);

    // put event into associative arrays
    putIntoAssocArrays(event);
  }

  /**
   * put an event into associative arrays for the getEventById
   * and getAllEvents functions
   * @param {object} event event returned by the API
   */
  function putIntoAssocArrays(event) {
    // id
    eventsById[event.Id] = event;

    // area
    let areaName = event.AreaOfEducation;
    let areaKey = event.areaKey = Ember.String.underscore(areaName);

    if (!eventsByArea.areas.hasOwnProperty(areaKey)) {
      eventsByArea.areas[areaKey] = {
        name: areaName,
        key: areaKey,
        events: [],
        categories: {},
        categoryKeys: []
      };
    }
    eventsByArea.areas[areaKey].events.push(event);

    // category (in area)
    let categoryName = event.EventCategory;
    let categoryKey = event.categoryKey = Ember.String.underscore(categoryName);

    if (!eventsByArea.areas[areaKey].categories.hasOwnProperty(categoryKey)) {
      eventsByArea.areas[areaKey].categories[categoryKey] = {
        name: categoryName,
        key: categoryKey,
        events: []
      };
    }
    eventsByArea.areas[areaKey].categories[categoryKey].events.push(event);
  }

  /**
   * transforms an event into an ember-object with the computed
   * properties status and and canDoSubscription and an update method
   * @param {object} event event returned by the API
   */
  function createEmberObject(event) {
    return Ember.Object.extend({

      status: Ember.computed('FreeSeats', function () {
        if ((0, _status.isGreen)(this, _dateHelpers.isInSubscriptionRange)) {
          return 'green';
        }

        if ((0, _status.isChartreuse)(this, _dateHelpers.isInSubscriptionRange)) {
          return 'chartreuse';
        }

        if ((0, _status.isYellow)(this, _dateHelpers.isInSubscriptionRange)) {
          return 'yellow';
        }
        if ((0, _status.isRed)(this, _dateHelpers.isInSubscriptionRange)) {
          return 'red';
        }

        return 'orange';
      }),

      canDoSubscription: Ember.computed('status', function () {
        let status = this.get('status');
        return typeof _settings.default.canDoSubscription === 'object' && _settings.default.canDoSubscription[status] === true;
      }),

      update() {
        // only update FreeSeats for now
        let that = this;
        return (0, _api.getEvent)(this.get('Id')).then(function (updatedEvent) {
          that.set('FreeSeats', updatedEvent.FreeSeats);
        });
      }
    }).create(event);
  }

  /**
   * create proxy for human-readable values
   * @param {object} event event returned by the API
   */
  function addDisplayData(event) {
    event.displayData = Ember.ObjectProxy.create({
      content: event,

      // formatted overwritten properties
      DateFrom: (0, _dateHelpers.formatDate)(event.DateFrom, 'LL'),
      DateTo: (0, _dateHelpers.formatDate)(event.DateTo, 'LL'),

      SubscriptionDateFrom: (0, _dateHelpers.formatDate)(event.SubscriptionDateFrom, 'LL'),
      SubscriptionDateTo: (0, _dateHelpers.formatDate)(event.SubscriptionDateTo, 'LL'),

      From: (0, _dateHelpers.formatDate)(event.From, 'LLL'),
      To: (0, _dateHelpers.formatDate)(event.To, 'LLL'),

      SubscriptionFrom: (0, _dateHelpers.formatDate)(event.SubscriptionFrom, 'LLL'),
      SubscriptionTo: (0, _dateHelpers.formatDate)(event.SubscriptionTo, 'LLL'),

      Price: event.Price === 0.0000 || event.Price === null ? null : 'CHF ' + event.Price
    });
  }

  /**
   * adds empty arrays for lessons, texts and codes and adds properties SubscriptionFrom,
   * SubscriptionTo, From, To, Time
   * @param {object} event event returned by the API
   */
  function addPropertiesToEvent(event) {
    // add lessons-array
    event.lessons = [];

    // add texts-array
    event.texts = [];

    // fill empty Date properties in event object
    fillEmptyDates(event);

    // combine date and time
    event.SubscriptionFrom = (0, _dateHelpers.combineDate)(event.SubscriptionDateFrom, event.SubscriptionTimeFrom);
    event.SubscriptionTo = (0, _dateHelpers.combineDate)(event.SubscriptionDateTo, event.SubscriptionTimeTo);
    event.From = (0, _dateHelpers.combineDate)(event.DateFrom, event.TimeFrom);
    event.To = (0, _dateHelpers.combineDate)(event.DateTo, event.TimeTo);

    event.SubscriptionDateFrom = event.SubscriptionDateFromIsNull ? null : event.SubscriptionDateFrom;
    event.SubscriptionDateTo = event.SubscriptionDateToIsNull ? null : event.SubscriptionDateTo;

    // add event.Time
    if (typeof event.TimeFrom === 'string' && typeof event.TimeTo === 'string') {
      event.Time = `${(0, _dateHelpers.removeMinutes)(event.TimeFrom)} - ${(0, _dateHelpers.removeMinutes)(event.TimeTo)}`;
    }
  }
  /**
   * if one of the Date or Time property is null get default value
   *
   * SubscriptionDateFrom is null => now - 1 day
   * SubscriptionDateTo is null => now + 7 day
   * DateFrom is null => now + 7 day
   * DateTo is null => now + 7 day
   * SubscriptionTimeFrom is null => '00:00:01'
   * SubscriptionTimeTo is null => '23:59:59'
   * @param {object} event event returned by the API
   */
  function fillEmptyDates(event) {

    let now = new Date();
    let yesterday = new Date().setDate(now.getDate() - 1);
    let datePast = (0, _format.default)(yesterday, 'yyyy-MM-dd');
    now.setDate(now.getDate() + 7);
    let dateNow = (0, _format.default)(now, 'yyyy-MM-dd');

    event.SubscriptionDateFromIsNull = event.SubscriptionDateFrom === null ? true : false;
    event.SubscriptionDateFrom = event.SubscriptionDateFrom || datePast;
    event.SubscriptionDateToIsNull = event.SubscriptionDateTo === null ? true : false;
    event.SubscriptionDateTo = event.SubscriptionDateTo || dateNow;
    event.DateFrom = event.DateFrom || event.DateTo || dateNow;
    event.DateTo = event.DateTo || event.DateFrom || dateNow;
    event.SubscriptionTimeFrom = event.SubscriptionTimeFrom || '00:00:01';
    event.SubscriptionTimeTo = event.SubscriptionTimeTo || '23:59:59';
  }

  /**
   * if LanguageOfInstruction is a number translate it
   * @param {object} event event returned by the API
   */
  function setLanguageEventFromIntToString(event) {

    if (event.LanguageOfInstruction === '2') {
      event.LanguageOfInstruction = (0, _translate.getString)('french');
    } else if (event.LanguageOfInstruction === '1') {
      event.LanguageOfInstruction = (0, _translate.getString)('german');
    } else if (event.LanguageOfInstruction === '133') {
      event.LanguageOfInstruction = (0, _translate.getString)('english');
    } else if (event.LanguageOfInstruction === '284') {
      event.LanguageOfInstruction = (0, _translate.getString)('italian');
    } else if (event.LanguageOfInstruction === '285') {
      event.LanguageOfInstruction = (0, _translate.getString)('spain');
    }
  }
});
;define('kursausschreibung/framework/translate', ['exports', 'kursausschreibung/framework/storage', 'kursausschreibung/framework/app-config'], function (exports, _storage, _appConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getLanguage = getLanguage;
  exports.setLanguage = setLanguage;
  exports.getString = getString;


  let language = detectLanguage();
  let locale = window.kursausschreibung.locale[language];

  /**
   * get the current language
   */
  function getLanguage() {
    return language;
  }

  /**
   * set a new language
   * this reloads the module
   * @param {string} newLanguage the new language
   */
  function setLanguage(newLanguage) {
    (0, _storage.setCulture)(newLanguage);

    if (newLanguage !== getLanguage()) {
      window.location.assign(_appConfig.default.webBaseUrl);
    }
  }

  /**
   * returns a localized sring
   * @param {string} key the key to localize
   * @param {string[]?} placeholderValues these values replace {0}, {1}, ...
   */
  function getString(key, placeholderValues = []) {
    try {
      let string = locale[key];

      if (string === undefined || string === null) {
        return '<span style="color:red;">Key not found: ' + key + '</span>';
      }

      placeholderValues.forEach((placeholderValue, i) => {
        string = string.replace('{' + i + '}', placeholderValue);
      });

      return string;
    } catch (ex) {
      console.error('translate ERROR:', ex); // eslint-disable-line no-console
      return '<span style="color:red;">error in translation.</span>';
    }
  }

  /**
   * detect the language the module should have
   */
  function detectLanguage() {
    // first priority: html lang attribute
    let htmlLang = Ember.$('html').attr('lang');

    if (htmlLang === 'de') {
      return 'de-CH';
    }

    if (htmlLang === 'fr') {
      return 'fr-CH';
    }

    // second priority: uiCulture in localStorage
    let culture = (0, _storage.getCulture)();

    if (culture !== null) {
      return culture;
    }

    // third priority: browser-language
    let navigatorLanguage = navigator.language;

    if (navigatorLanguage.split('-')[0] === 'fr') {
      return 'fr-CH';
    }
    // default to de-CH
    return 'de-CH';
  }
});
;define('kursausschreibung/framework/url-helpers', ['exports', 'kursausschreibung/framework/app-config'], function (exports, _appConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getParameterByName = getParameterByName;
  exports.setParameterByName = setParameterByName;
  exports.getCorrectApiUrl = getCorrectApiUrl;
  exports.getRootModulUrl = getRootModulUrl;


  /**
   * get an URL-parameter
   * taken from https://stackoverflow.com/q/901115#answer-901144
   * @param {string} name the name of the parameter
   * @param {string} url the URL (defaults to current URL)
   */
  function getParameterByName(name, url) {

    if (typeof url !== 'string') {
      url = window.location.href;
    }

    name = name.replace(/[[\]]/g, '\\$&');

    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);

    if (!results) {
      return null;
    }

    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  /**
   * set url params by name 
   * @param {string} name the name of the parameter
   * @param {string} value the value of the parameter name
   * @param {string} url the URL (defaults to current URL)
   */
  function setParameterByName(name, value, url) {

    if (typeof url !== 'string') {
      url = window.location.href;
    }
    if (value === null) {
      return url;
    }

    let params = decodeURIComponent(url).split('?');
    let paramsLength = params.length;
    params = params.length === 3 ? params[1] + '?' + params[2] : params[1];

    if (params !== undefined) {

      if (params.indexOf(name) >= 0) {
        params = params.replace(name + '=' + getParameterByName(name, url), name + '=' + value);
      } else {
        let newParam = '&';
        if (paramsLength > 2 && params.indexOf('?') > -1) {
          newParam = '&';
        } else if (paramsLength > 2 && params.indexOf('?') === -1) {
          newParam = '?';
        } else if (paramsLength === 2 && params.indexOf('#') > -1) {
          newParam = '?';
        }

        params = params + newParam + name + '=' + value;
      }
    } else {
      params = name + '=' + value;
    }

    window.location.href = url.split('?')[0] + '?' + params;
  }

  /**
   * It checks if the url starts with "http". If true change url to relative url
   * @param {string} url location url
   */
  function getCorrectApiUrl(url) {
    if (url.indexOf('http') === 0) {
      var apiUriSplitLength = _appConfig.default.apiUrl.split('/').length;
      var getIndex = url.split('/')[apiUriSplitLength];
      return url.substring(url.indexOf(getIndex), url.length);
    } else {
      return '..' + url;
    }
  }

  /**
   * Get the first term window.location.href split by #
   */
  function getRootModulUrl() {
    return window.location.href.split('#')[0];
  }
});
;define('kursausschreibung/helpers/app-version', ['exports', 'kursausschreibung/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('kursausschreibung/helpers/translate', ['exports', 'kursausschreibung/framework/translate'], function (exports, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.translate = translate;
  function translate([key, ...placeholderValues]) {
    return Ember.String.htmlSafe((0, _translate.getString)(key, placeholderValues));
  }

  exports.default = Ember.Helper.helper(translate);
});
;define('kursausschreibung/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'kursausschreibung/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('kursausschreibung/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('kursausschreibung/initializers/export-application-global', ['exports', 'kursausschreibung/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('kursausschreibung/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('kursausschreibung/router', ['exports', 'kursausschreibung/config/environment', 'kursausschreibung/framework/scroll-helpers'], function (exports, _environment, _scrollHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let rootElement = Ember.$(_environment.default.APP.rootElement).get(0);

  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL,

    didTransition() {
      this._super(...arguments);

      var subscriptionProcessId = 'subscriptionProcess';

      setInterval(function () {
        if (document.getElementById(subscriptionProcessId) !== null) {
          (0, _scrollHelpers.setOffsetStickyHeader)(subscriptionProcessId);
        }
      }, 1000);

      if (this.currentPath === 'list.category.event.subscribe') {
        (0, _scrollHelpers.scrollToTimeout)(subscriptionProcessId);
      } else if (this.currentPath !== 'list.index') {
        (0, _scrollHelpers.scrollToTimeout)(rootElement.id);
      }
    }
  });

  Router.map(function () {
    this.route('permalink', { path: '/uid/:event_id' });
    this.route('list', { path: '/:area_of_education' }, function () {
      this.route('category', { path: '/:category' }, function () {
        this.route('event', { path: '/:event_id' }, function () {
          this.route('subscribe');
          this.route('confirmation-error');
          this.route('confirmation');
        });
      });
    });
  });

  exports.default = Router;
});
;define('kursausschreibung/routes/application', ['exports', 'uikit', 'kursausschreibung/framework/store', 'kursausschreibung/framework/storage', 'kursausschreibung/framework/login-helpers', 'kursausschreibung/framework/seo'], function (exports, _uikit, _store, _storage, _loginHelpers, _seo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel() {
      // set uikit scope
      _uikit.default.container = '.uk-scope';

      // initialization
      return (0, _loginHelpers.autoCheckForLogin)() // get a valid access_token if we don't have one
      .then(_store.init).then(() => {
        // reroute to the confirmation page if there is data that has to be submitted
        let dataToSubmit = (0, _storage.getDataToSubmit)();

        if (dataToSubmit !== undefined) {
          let event = (0, _store.getEventById)(dataToSubmit.eventId);
          this.replaceWith('list.category.event.confirmation', event.areaKey, event.categoryKey, event.Id);
        }
      }).catch(function (error) {
        // only log exceptions thrown here so the route still loads
        // uninitialized modules will throw an error later
        console.error('FATAL error while initializing the module: ', error); // eslint-disable-line no-console
      });
    },

    model() {
      // remove loader
      Ember.$('#kursausschreibung-loading').remove();
      let allEvents = (0, _store.getAllEvents)();
      (0, _seo.setJsonLd)(allEvents);
      return allEvents;
    }
  });
});
;define('kursausschreibung/routes/error', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('kursausschreibung/routes/index', ['exports', 'kursausschreibung/framework/store'], function (exports, _store) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel() {
      let applicationModel = this.modelFor('application');

      if (applicationModel.areaKeys === undefined || applicationModel.areaKeys.length === 0) {
        if ((0, _store.isInitialized)()) {
          // proceed to the index route
          return;
        }

        throw new Error('failed to load.');
      }

      this.replaceWith('list', applicationModel.areaKeys[0]);
    }
  });
});
;define('kursausschreibung/routes/list', ['exports', 'uikit'], function (exports, _uikit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      let eventsByArea = this.modelFor('application');

      // make sure old URLs still work
      params.area_of_education = Ember.String.underscore(params.area_of_education);

      // check if area of education exists
      if (!eventsByArea.areas.hasOwnProperty(params.area_of_education)) {
        this.replaceWith('/');
        return;
      }

      return eventsByArea.areas[params.area_of_education];
    },

    actions: {
      didTransition() {
        let modal = _uikit.default.modal('#menu-modal');

        if (modal !== undefined) {
          modal.hide();
        }
      }
    }
  });
});
;define('kursausschreibung/routes/list/category', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      let categories = this.modelFor('list').categories;

      // make sure old URLs still work
      params.category = Ember.String.underscore(params.category);

      // check if category exists
      if (!categories.hasOwnProperty(params.category)) {
        this.replaceWith('list');
        return;
      }

      return categories[params.category];
    }
  });
});
;define('kursausschreibung/routes/list/category/event', ['exports', 'kursausschreibung/framework/store'], function (exports, _store) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      let event = _store.default.getEventById(params.event_id);

      // check if event exists in area and category
      let areaKey = Ember.String.underscore(this.paramsFor('list').area_of_education);
      let categoryKey = Ember.String.underscore(this.paramsFor('list.category').category);

      if (event === undefined || event.areaKey !== areaKey || event.categoryKey !== categoryKey) {
        this.replaceWith('list.category');
        return;
      }

      return event;
    }
  });
});
;define('kursausschreibung/routes/list/category/event/confirmation-error', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('kursausschreibung/routes/list/category/event/confirmation', ['exports', 'kursausschreibung/framework/storage', 'kursausschreibung/framework/api', 'kursausschreibung/framework/login-helpers', 'kursausschreibung/framework/settings', 'kursausschreibung/framework/translate'], function (exports, _storage, _api, _loginHelpers, _settings, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      let dataToSubmit = (0, _storage.getDataToSubmit)();
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
      return (0, _loginHelpers.autoCheckForLogin)().then(() => {

        // clear the data
        (0, _storage.setDataToSubmit)(null);

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
          promises.push(Ember.RSVP.Promise.resolve(personId));
        }

        // handle other people
        additionalPeople.forEach(person => {
          promises.push(createPerson(person));
        });

        // subscribe everyone
        promises = promises.map(promise => {
          return promise.then(id => {
            subscriptionData.PersonId = id;
            if (additionalPeople.length > 0) {
              subscriptionData.SubscriptionDetails.push({ VssId: _api.SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE, Value: additionalPeople.length });
            }
            return (0, _api.postSubscription)(subscriptionData).then(id => {
              subscriptionFiles.forEach(file => {

                let data = {
                  SubscriptionDetail: {
                    SubscriptionId: id,
                    VssId: file.IdVss
                  },
                  FileStreamInfo: {
                    FileName: file.name
                  }
                };
                promises.push((0, _api.postSubscriptionDetailsFiles)(data, file));
              });
            });
          });
        });

        return Ember.RSVP.Promise.all(promises);
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
          message = (0, _translate.getString)('subscriptionFailed');
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

      if (!useCompanyAddress) return;

      // add default values to companyAddress
      companyAddressData.PersonId = parseInt(personId);
      companyAddressData.AddressType = 'Arbeitgeber';
      companyAddressData.AddressTypeId = 501;
      companyAddressData.Country = companyAddressData.Country === null ? 'Schweiz' : companyAddressData.Country;
      companyAddressData.CountryId = companyAddressData.CountryId === null ? 'CH' : companyAddressData.CountryId;

      return (0, _api.postAddress)(companyAddressData);
    }).then(() => personId);
  }

  // this function creates a new person and returns a promise for a personId
  function createPerson(addressData) {

    // add default values to person
    if (_settings.default.personDefaultValue instanceof Object) {
      Object.keys(_settings.default.personDefaultValue).forEach(key => {
        if (Ember.isEmpty(addressData[key])) {
          addressData[key] = _settings.default.personDefaultValue[key];
        }
      });
    }

    // delete keys with null-values
    Object.keys(addressData).forEach(key => {
      if (addressData[key] === null) delete addressData[key];
    });

    return new Ember.RSVP.Promise(resolve => (0, _api.postPerson)(addressData).then((_data, _status, xhr) => {
      resolve([xhr]);
    })).then(([xhr]) => {
      // xhr is in an array so it gets correctly passed along
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
        return (0, _api.putPerson)(addressData, personId).then(() => personId).catch(error => {
          // fail silently (see https://github.com/bkd-mba-fbi/kursausschreibung/issues/26)
          console.error('ignoring error while trying to update person', error); // eslint-disable-line no-console
        });
      }

      return locationHeader.split('/').slice(-1)[0];
    });
  }
});
;define('kursausschreibung/routes/list/category/event/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.modelFor('list.category.event');
    }
  });
});
;define('kursausschreibung/routes/list/category/event/subscribe', ['exports', 'kursausschreibung/framework/api', 'kursausschreibung/framework/login-helpers', 'kursausschreibung/framework/settings', 'kursausschreibung/framework/translate'], function (exports, _api, _loginHelpers, _settings, _translate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  // if these were loaded in the component an error
  // would just cause the template to stop rendering
  function loadDropdownItems(fields) {
    return Ember.RSVP.Promise.all(fields.filter(item => item.dataType === 'dropdown').map(item => (0, _api.getDropDownItems)(item.options.dropdownItems).then(options => {

      if (item.id === 'Nationality') {
        options.forEach(element => {
          element.Value = element.Value.split(':')[1].trim();
        });
        let setDefaultLand = options;
        let defaultLand = options.findIndex(nationality => nationality.Key === 2008100);
        setDefaultLand.splice(0, 0, options[defaultLand]);
      }

      if (item.options.options === undefined) item.options.options = options;
    })));
  }

  let dataTypeMappings = {
    ShortText: 'string',
    Text: 'textarea',
    Int: 'number',
    YesNo: 'checkbox',
    Currency: 'number',
    Date: 'date'
  };

  let fileTypeMapping = {
    DA: 'application/zip,application/x-zip-compressed',
    PD: 'application/pdf',
    PF: 'image/jpeg'
  };

  // convert subscriptionDetails to an array of input-components
  // as they are used in the settings.js file
  function getSubscriptionDetailFields(subscriptionDetails) {
    return subscriptionDetails.map(detail => {
      let dataType = dataTypeMappings[detail.VssType];
      let fileType = fileTypeMapping[detail.VssStyle];

      if (dataType === undefined) dataType = 'string';

      if (detail.DropdownItems instanceof Object) {
        dataType = 'dropdown';

        if (detail.VssStyleDescription === 'DropDownWithText') dataType = 'freeform-dropdown';
      }

      if (detail.VssStyle === 'HE') return { isLegend: true, label: detail.VssDesignation };

      if (detail.VssStyle === 'DA' || detail.VssStyle === 'PD' || detail.VssStyle === 'PF') {
        dataType = 'file';
      }

      return {
        id: detail.VssId,
        label: detail.VssDesignation,
        dataType: dataType,
        acceptFileType: fileType,
        fileTypeLabel: (0, _translate.getString)('fileType' + detail.VssStyle),
        fileLabelBevorFileChoose: (0, _translate.getString)('fileType' + detail.VssStyle),
        maxFileSize: detail.MaxFileSize,
        fileObject: null,
        options: {
          required: detail.VssInternet === 'M',
          autocomplete: 'off',
          options: detail.DropdownItems,
          showAsRadioButtons: dataType === 'dropdown' ? detail.ShowAsRadioButtons : undefined,
          tooltip: detail.Tooltip,
          disabled: detail.readOnly,
          hidden: '',
          dependencyItems: []
        }
      };
    });
  }

  function addSubscriptionDetailDependencies(subscriptionDetailDependencies, subscriptionDetails) {

    subscriptionDetails.map(item => {

      subscriptionDetailDependencies.find(dependency => {

        if (dependency.IdVss === item.id) {
          item.options.hidden = 'uk-hidden';
          item.options.required = false;
        }
        if (dependency.IdVssInfluencer === item.id) {
          item.options.dependencyItems.push(dependency);
        }
      });
    });

    return subscriptionDetails;
  }

  function addTranslations(fields) {
    fields.forEach(detail => {
      if (detail.label === undefined) detail.label = (0, _translate.getString)('form' + detail.id);

      if (detail.options !== undefined) {
        if (detail.options.showPlaceholder === true) {
          let key = detail.options.placeholderKey ? detail.options.placeholderKey : 'form' + detail.id + 'Placeholder';
          Ember.set(detail, 'placeholder', (0, _translate.getString)(key));
        }
        if (detail.options.showHint === true) {
          let key = detail.options.hintKey ? detail.options.hintKey : 'form' + detail.id + 'Hint';
          Ember.set(detail, 'hint', (0, _translate.getString)(key));
        }
      }
    });

    return fields;
  }

  function getFormFields(settings, eventTypeId, eventCategoryId) {

    if (eventTypeId in settings.formFields) {
      if (eventCategoryId in settings.formFields[eventTypeId]) {
        return settings.formFields[eventTypeId][eventCategoryId];
      } else if (settings.formFields[eventTypeId].addressFields !== undefined) {
        return settings.formFields[eventTypeId];
      }
    }

    if (settings.formFields.default === undefined) throw new Error("config for eventTypeId " + eventTypeId + " not found and no default config is available");

    return settings.formFields.default;
  }

  exports.default = Ember.Route.extend({
    model(_params, transition) {
      let model = this.modelFor('list.category.event');

      if (model.externalSubscriptionURL !== null) {
        this.replaceWith('list.category.event.index');
      }

      if (model.get('canDoSubscription') === false) {
        this.replaceWith('list.category.event');
        transition.abort();
        return;
      }

      // make sure the session is still active
      return (0, _loginHelpers.autoCheckForLogin)().then(() => Ember.RSVP.Promise.all([(0, _api.getUserSettings)(), (0, _api.getSubscriptionDetails)(model.Id), (0, _api.getSubscriptionDetailDependencies)(model.Id)])).then(([userSettings, subscriptionDetails, subscriptionDetailDependencies]) => {

        // check if multiple people are allowed to subscribe at the same time
        let allowMultiplePeople = false;
        if (subscriptionDetails !== null) {
          subscriptionDetails = subscriptionDetails.filter(function (subscriptionDetail) {
            if (subscriptionDetail.VssId === _api.SUBSCRIPTION_DETAIL_ALLOW_MULTIPLE_PEOPLE) {
              allowMultiplePeople = true;
              return false;
            }
            return true;
          });
          //VssInternet = H (Hidden) don't display
          subscriptionDetails = subscriptionDetails.filter(det => det.VssInternet !== 'H');
        }

        Ember.set(model, 'allowMultiplePeople', allowMultiplePeople);

        // if userSettings.IdPerson is not 0 we can use it for the subscription
        userSettings.isLoggedIn = userSettings.IdPerson !== 0;

        Ember.set(model, 'userSettings', userSettings);
        Ember.set(model, 'subscriptionDetailFields', getSubscriptionDetailFields(Ember.A(subscriptionDetails).sortBy('Sort')));

        Ember.set(model, 'subscriptionDetailFields', addSubscriptionDetailDependencies(subscriptionDetailDependencies, getSubscriptionDetailFields(Ember.A(subscriptionDetails).sortBy('Sort'))));

        if (userSettings.isLoggedIn === false) {
          let fields = getFormFields(_settings.default, model.EventTypeId, model.EventCategoryId).addressFields;
          let additionalPeopleFields = getFormFields(_settings.default, model.EventTypeId, model.EventCategoryId).additionalPeopleFields;
          if (Ember.get(model, 'allowMultiplePeople')) {
            loadDropdownItems(additionalPeopleFields !== undefined ? additionalPeopleFields : fields);
          }

          return loadDropdownItems(fields);
        }
      }).then(() => model);
    },

    setupController(controller, model) {
      this._super(...arguments);

      let formFields = getFormFields(_settings.default, model.EventTypeId, model.EventCategoryId);

      // person fields
      controller.set('fields', addTranslations(formFields.addressFields));

      // company fields
      controller.set('companyFields', typeof formFields.companyFields === 'object' ? addTranslations(formFields.companyFields) : null);

      // subscriptionDetails
      controller.set('subscriptionDetailFields', Ember.get(model, 'subscriptionDetailFields'));

      // additional people
      controller.set('allowMultiplePeople', Ember.get(model, 'allowMultiplePeople'));
      let setAdditionalPeopleFields = formFields.additionalPeopleFields !== undefined ? formFields.additionalPeopleFields : formFields.addressFields;
      controller.set('additionalPeopleFields', setAdditionalPeopleFields);
      if (Ember.get(model, 'allowMultiplePeople')) {
        controller.set('additionalPeopleFields', addTranslations(setAdditionalPeopleFields));
      }
    }
  });
});
;define('kursausschreibung/routes/list/category/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.modelFor('list.category');
    }
  });
});
;define('kursausschreibung/routes/list/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.modelFor('list');
    }
  });
});
;define('kursausschreibung/routes/permalink', ['exports', 'kursausschreibung/framework/store'], function (exports, _store) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      const event = (0, _store.getEventById)(params.event_id);

      // redirect to event if it exists
      if (event !== undefined) {
        this.replaceWith('list.category.event', event.areaKey, event.categoryKey, event.Id);
      } else {
        this.replaceWith('');
      }
    }
  });
});
;define('kursausschreibung/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("kursausschreibung/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ETj9FKMt", "block": "{\"symbols\":[\"area\",\"data\",\"areaKey\"],\"statements\":[[6,\"div\"],[9,\"class\",\"uk-width-1-1\"],[7],[0,\"\\n\\n\"],[0,\"  \"],[6,\"nav\"],[9,\"class\",\"uk-navbar-container uk-margin-top\"],[9,\"data-uk-navbar\",\"\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-navbar-left\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"uk-navbar-nav\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"areaKeys\"]]],null,{\"statements\":[[4,\"link-to\",[\"list\",[19,3,[]]],[[\"tagName\",\"activeClass\"],[\"li\",\"uk-active\"]],{\"statements\":[[4,\"link-to\",[\"list\",[19,3,[]]],null,{\"statements\":[[0,\"              \"],[1,[25,\"get\",[[25,\"get\",[[20,[\"model\",\"areas\"]],[19,3,[]]],null],\"name\"],null],false],[0,\"\\n\"],[4,\"if\",[[20,[\"eventCategoryDropdown\"]]],null,{\"statements\":[[0,\"                \"],[6,\"span\"],[9,\"uk-icon\",\"icon: chevron-down\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"if\",[[20,[\"eventCategoryDropdown\"]]],null,{\"statements\":[[0,\"            \"],[6,\"div\"],[9,\"data-uk-dropdown\",\"\"],[7],[0,\"\\n              \"],[1,[25,\"area-navigation\",[[25,\"get\",[[20,[\"model\",\"areas\"]],[19,3,[]]],null]],[[\"hideHeading\"],[true]]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[3]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-navbar-right\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"uk-navbar-nav\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[0,\"\\n\"],[4,\"unless\",[[20,[\"eventCategoryDropdown\"]]],null,{\"statements\":[[0,\"            \"],[6,\"a\"],[9,\"href\",\"#menu-modal\"],[9,\"class\",\"uk-icon-link uk-hidden@m\"],[9,\"data-uk-icon\",\"more\"],[9,\"data-uk-toggle\",\"\"],[7],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"id\",\"menu-modal\"],[9,\"class\",\"uk-modal-full\"],[9,\"uk-modal\",\"container: false;\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"uk-modal-dialog\"],[7],[0,\"\\n                \"],[6,\"button\"],[9,\"class\",\"uk-modal-close-full uk-close-large\"],[9,\"type\",\"button\"],[9,\"data-uk-close\",\"\"],[7],[8],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"uk-padding-large\"],[9,\"data-uk-height-viewport\",\"\"],[7],[0,\"\\n                  \"],[6,\"h2\"],[7],[1,[25,\"translate\",[\"navigation\"],null],false],[8],[0,\"\\n\"],[4,\"each\",[[25,\"-each-in\",[[20,[\"model\",\"areas\"]]],null]],null,{\"statements\":[[0,\"                    \"],[6,\"div\"],[9,\"class\",\"uk-margin\"],[7],[0,\"\\n                      \"],[1,[25,\"area-navigation\",[[19,2,[]]],null],false],[0,\"\\n                    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[4,\"if\",[[20,[\"showLanguageButton\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"div\"],[9,\"class\",\"uk-margin\"],[7],[0,\"\\n                      \"],[6,\"h2\"],[7],[1,[25,\"translate\",[\"language\"],null],false],[8],[0,\"\\n                      \"],[6,\"ul\"],[9,\"class\",\"uk-nav uk-nav-default\"],[7],[0,\"\\n                        \"],[6,\"li\"],[7],[6,\"a\"],[3,\"action\",[[19,0,[]],\"setLanguage\",\"de-CH\"]],[7],[1,[25,\"translate\",[\"german\"],null],false],[8],[8],[0,\"\\n                        \"],[6,\"li\"],[7],[6,\"a\"],[3,\"action\",[[19,0,[]],\"setLanguage\",\"fr-CH\"]],[7],[1,[25,\"translate\",[\"french\"],null],false],[8],[8],[0,\"\\n                      \"],[8],[0,\"\\n                    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"showLanguageButton\"]]],null,{\"statements\":[[0,\"            \"],[6,\"div\"],[10,\"class\",[26,[\"uk-margin-right \",[25,\"unless\",[[20,[\"eventCategoryDropdown\"]],\"uk-visible@m\"],null]]]],[7],[0,\"\\n              \"],[6,\"a\"],[9,\"href\",\"#\"],[9,\"class\",\"uk-icon-link\"],[9,\"data-uk-icon\",\"world\"],[7],[1,[25,\"translate\",[\"language\"],null],false],[0,\" \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"data-uk-dropdown\",\"mode: click\"],[7],[0,\"\\n                \"],[6,\"ul\"],[9,\"class\",\"uk-list uk-link-text uk-margin-remove\"],[7],[0,\"\\n                  \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#\"],[3,\"action\",[[19,0,[]],\"setLanguage\",\"de-CH\"]],[7],[1,[25,\"translate\",[\"german\"],null],false],[8],[8],[0,\"\\n                  \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#\"],[3,\"action\",[[19,0,[]],\"setLanguage\",\"fr-CH\"]],[7],[1,[25,\"translate\",[\"french\"],null],false],[8],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"uk-grid uk-margin\"],[9,\"data-uk-grid\",\"\"],[7],[0,\"\\n\"],[0,\"    \"],[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[0,\"    \"],[6,\"div\"],[10,\"class\",[18,\"rightWidth\"],null],[7],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"logoImage\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"logoLink\"]]],null,{\"statements\":[[0,\"          \"],[6,\"a\"],[9,\"target\",\"_blank\"],[10,\"href\",[18,\"logoLink\"],null],[7],[0,\"\\n            \"],[6,\"img\"],[9,\"class\",\"uk-margin\"],[10,\"src\",[18,\"logoImage\"],null],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"img\"],[9,\"class\",\"uk-margin\"],[10,\"src\",[18,\"logoImage\"],null],[7],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null],[0,\"\\n\"],[0,\"      \"],[6,\"div\"],[9,\"class\",\"uk-margin uk-card uk-card-small uk-card-body\"],[7],[0,\"\\n        \"],[6,\"h2\"],[9,\"id\",\"header-legend\"],[9,\"class\",\"uk-h3 uk-card-title\"],[7],[1,[25,\"translate\",[\"legend\"],null],false],[8],[0,\"\\n\\n        \"],[6,\"ul\"],[9,\"class\",\"uk-list\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"class\",\"uk-flex\"],[7],[0,\"\\n            \"],[6,\"span\"],[7],[1,[25,\"status-lamp\",null,[[\"status\"],[\"green\"]]],false],[8],[6,\"span\"],[7],[1,[25,\"translate\",[\"greenLamp\"],null],false],[8],[8],[0,\"\\n          \"],[6,\"li\"],[9,\"class\",\"uk-flex\"],[7],[0,\"\\n            \"],[6,\"span\"],[7],[1,[25,\"status-lamp\",null,[[\"status\"],[\"chartreuse\"]]],false],[8],[6,\"span\"],[7],[1,[25,\"translate\",[\"chartreuseLamp\"],null],false],[8],[8],[0,\"\\n          \"],[6,\"li\"],[9,\"class\",\"uk-flex\"],[7],[0,\"\\n            \"],[6,\"span\"],[7],[1,[25,\"status-lamp\",null,[[\"status\"],[\"yellow\"]]],false],[8],[6,\"span\"],[7],[1,[25,\"translate\",[\"yellowLamp\"],null],false],[8],[8],[0,\"\\n          \"],[6,\"li\"],[9,\"class\",\"uk-flex\"],[7],[0,\"\\n            \"],[6,\"span\"],[7],[1,[25,\"status-lamp\",null,[[\"status\"],[\"red\"]]],false],[8],[6,\"span\"],[7],[1,[25,\"translate\",[\"redLamp\"],null],false],[8],[8],[0,\"\\n          \"],[6,\"li\"],[9,\"class\",\"uk-flex\"],[7],[0,\"\\n            \"],[6,\"span\"],[7],[1,[25,\"status-lamp\",null,[[\"status\"],[\"orange\"]]],false],[8],[6,\"span\"],[7],[1,[25,\"translate\",[\"orangeLamp\"],null],false],[8],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"showContact\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"uk-margin uk-card uk-card-small uk-card-body\"],[7],[0,\"\\n          \"],[6,\"h2\"],[9,\"id\",\"header-contact\"],[9,\"class\",\"uk-h3 uk-card-title\"],[7],[1,[25,\"translate\",[\"contact\"],null],false],[8],[0,\"\\n          \"],[6,\"p\"],[7],[1,[25,\"translate\",[\"contactContent\"],null],false],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"twitterHandle\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"uk-margin uk-card uk-card-small uk-card-body uk-visible@l\"],[7],[0,\"\\n          \"],[1,[25,\"twitter-feed\",[[20,[\"twitterHandle\"]]],null],false],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/application.hbs" } });
});
;define("kursausschreibung/templates/components/area-navigation", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "VRlBIxPo", "block": "{\"symbols\":[\"categoryKey\"],\"statements\":[[4,\"unless\",[[20,[\"hideHeading\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[9,\"id\",\"header-naviagtion-area\"],[9,\"class\",\"uk-margin-small\"],[7],[1,[20,[\"area\",\"name\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[6,\"ul\"],[9,\"class\",\"uk-nav uk-nav-default\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"list.index\",[20,[\"area\",\"key\"]]],[[\"tagName\",\"activeClass\"],[\"li\",\"uk-active\"]],{\"statements\":[[0,\"    \"],[4,\"link-to\",[\"list.index\",[20,[\"area\",\"key\"]]],null,{\"statements\":[[1,[25,\"translate\",[\"overview\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"each\",[[20,[\"area\",\"categoryKeys\"]]],null,{\"statements\":[[4,\"link-to\",[\"list.category\",[20,[\"area\",\"key\"]],[19,1,[]]],[[\"tagName\",\"activeClass\"],[\"li\",\"uk-active\"]],{\"statements\":[[0,\"      \"],[4,\"link-to\",[\"list.category\",[20,[\"area\",\"key\"]],[19,1,[]]],null,{\"statements\":[[1,[25,\"get\",[[25,\"get\",[[20,[\"area\",\"categories\"]],[19,1,[]]],null],\"name\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/area-navigation.hbs" } });
});
;define("kursausschreibung/templates/components/event-details-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FhT4pJR3", "block": "{\"symbols\":[\"lesson\",\"lesson\",\"text\",\"field\"],\"statements\":[[6,\"table\"],[9,\"class\",\"uk-table uk-table-striped details-table table-collapse\"],[7],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"fields\"]]],null,{\"statements\":[[4,\"if\",[[25,\"get\",[[20,[\"event\",\"displayData\"]],[19,4,[\"key\"]]],null]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"td\"],[7],[1,[19,4,[\"name\"]],true],[8],[0,\"\\n          \"],[6,\"td\"],[7],[1,[25,\"get\",[[20,[\"event\",\"displayData\"]],[19,4,[\"key\"]]],null],true],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[4]},null],[4,\"if\",[[20,[\"showEventText\"]]],null,{\"statements\":[[4,\"each\",[[20,[\"event\",\"texts\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"td\"],[7],[1,[19,3,[\"label\"]],true],[8],[0,\"\\n          \"],[6,\"td\"],[7],[1,[19,3,[\"memo\"]],true],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null]],\"parameters\":[]},null],[4,\"if\",[[20,[\"event\",\"displayData\",\"lessons\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"a\"],[10,\"uk-tooltip\",[26,[\"title:\",[25,\"translate\",[\"lessonExportToIcs\"],null]]]],[3,\"action\",[[19,0,[]],\"getIcsFileFromEvent\"],[[\"on\"],[\"click\"]]],[7],[6,\"td\"],[7],[1,[25,\"translate\",[\"lessons\"],null],false],[6,\"span\"],[9,\"uk-icon\",\"icon: calendar; ratio: 1.4\"],[7],[8],[8],[8],[0,\"\\n        \\n\"],[4,\"if\",[[20,[\"event\",\"lessonsCollaps\"]]],null,{\"statements\":[[0,\"        \"],[6,\"td\"],[7],[6,\"a\"],[9,\"uk-toggle\",\"target: #lesson-display\"],[7],[0,\"Alle Lektionen anzeigen\"],[8],[6,\"div\"],[9,\"id\",\"lesson-display\"],[9,\"hidden\",\"\"],[7],[4,\"each\",[[20,[\"event\",\"displayData\",\"lessons\"]]],null,{\"statements\":[[1,[19,2,[\"DateFrom\"]],false],[0,\" - \"],[1,[19,2,[\"TimeTo\"]],false],[4,\"if\",[[19,2,[\"Designation\"]]],null,{\"statements\":[[0,\": \"],[1,[19,2,[\"Designation\"]],true]],\"parameters\":[]},null],[6,\"br\"],[7],[8]],\"parameters\":[2]},null],[8],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"td\"],[7],[4,\"each\",[[20,[\"event\",\"displayData\",\"lessons\"]]],null,{\"statements\":[[1,[19,1,[\"DateFrom\"]],false],[0,\" - \"],[1,[19,1,[\"TimeTo\"]],false],[4,\"if\",[[19,1,[\"Designation\"]]],null,{\"statements\":[[0,\": \"],[1,[19,1,[\"Designation\"]],true]],\"parameters\":[]},null],[6,\"br\"],[7],[8]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/event-details-table.hbs" } });
});
;define("kursausschreibung/templates/components/event-list-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dkOmuGOK", "block": "{\"symbols\":[\"field\"],\"statements\":[[6,\"div\"],[10,\"class\",[26,[\"filter-tags \",[20,[\"event\",\"filter\"]]]]],[7],[0,\"\\n\"],[4,\"link-to\",[\"list.category.event\",[20,[\"event\",\"areaKey\"]],[20,[\"event\",\"categoryKey\"]],[20,[\"event\",\"Id\"]]],[[\"classNames\"],[\"event-list-item uk-link-reset\"]],{\"statements\":[[0,\"  \"],[6,\"h3\"],[9,\"class\",\"uk-margin-small\"],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"uk-flex\"],[7],[0,\"\\n      \"],[6,\"span\"],[7],[1,[25,\"status-lamp\",null,[[\"status\"],[[20,[\"event\",\"status\"]]]]],false],[8],[0,\"\\n      \"],[6,\"span\"],[7],[1,[25,\"get\",[[20,[\"event\",\"displayData\"]],[20,[\"title\"]]],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"event\",\"subtitle\"]]],null,{\"statements\":[[0,\"  \"],[6,\"span\"],[9,\"class\",\"uk-label uk-label-warning uk-margin-small\"],[7],[1,[20,[\"event\",\"subtitle\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"table\"],[9,\"class\",\"details-table\"],[7],[0,\"\\n    \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"fields\"]]],null,{\"statements\":[[4,\"if\",[[25,\"get\",[[20,[\"event\",\"displayData\"]],[19,1,[\"key\"]]],null]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],true],[8],[0,\"\\n            \"],[6,\"td\"],[7],[1,[25,\"get\",[[20,[\"event\",\"displayData\"]],[19,1,[\"key\"]]],null],true],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\"],[6,\"script\"],[7],[0,\"\\n  // add classnames to wrapper emberjs element\\n  var filter = document.querySelector('.jsfilter');\\n  var filterChild = filter.children;\\n  var filterClass = filterChild[0].className;\\n  filter.className = filterClass;\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/event-list-item.hbs" } });
});
;define("kursausschreibung/templates/components/event-list-search", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "HC0slAt9", "block": "{\"symbols\":[\"option\",\"&default\"],\"statements\":[[6,\"div\"],[9,\"class\",\"uk-grid uk-margin\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"uk-search uk-search-default uk-width-2-3@s\"],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"data-uk-search-icon\",\"\"],[7],[8],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"placeholder\",\"value\",\"key-up\"],[\"uk-search-input\",\"search\",[25,\"translate\",[\"search\"],null],[20,[\"query\"]],[25,\"action\",[[19,0,[]],\"queryChanged\"],null]]]],false],[0,\"   \\n\"],[4,\"if\",[[20,[\"query\"]]],null,{\"statements\":[[0,\"      \"],[6,\"button\"],[9,\"class\",\"search-clear\"],[9,\"type\",\"button\"],[9,\"uk-close\",\"\"],[3,\"action\",[[19,0,[]],\"clearSearch\"]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"uk-width-1-3@s\"],[7],[0,\"\\n      \"],[6,\"select\"],[9,\"id\",\"sortList\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"sortBy\"],[[\"value\"],[\"target.value\"]]],null],[9,\"class\",\"uk-select\"],[9,\"aria-label\",\"Select\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"sortOptions\"]]],null,{\"statements\":[[0,\"        \"],[6,\"option\"],[10,\"value\",[19,1,[\"key\"]],null],[7],[1,[25,\"translate\",[[19,1,[\"value\"]]],null],false],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"filteredEvents\",\"length\"]]],null,{\"statements\":[[0,\"  \"],[11,2,[[20,[\"filteredEvents\"]]]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"div\"],[7],[1,[25,\"translate\",[\"searchNoEvents\"],null],false],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/event-list-search.hbs" } });
});
;define("kursausschreibung/templates/components/event-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1s3tGyVu", "block": "{\"symbols\":[\"filteredEvents\",\"eventsOnCurrentPage\",\"event\"],\"statements\":[[4,\"event-list-search\",null,[[\"queryChanged\",\"events\"],[[25,\"action\",[[19,0,[]],\"queryChanged\"],null],[20,[\"events\"]]]],{\"statements\":[[4,\"list-pagination\",null,[[\"page\",\"items\",\"route\"],[[20,[\"page\"]],[19,1,[]],[20,[\"route\"]]]],{\"statements\":[[4,\"each\",[[19,2,[]]],null,{\"statements\":[[0,\"      \"],[1,[25,\"event-list-item\",null,[[\"event\"],[[19,3,[]]]]],false],[0,\"\\n\"]],\"parameters\":[3]},null]],\"parameters\":[2]},null]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/event-list.hbs" } });
});
;define("kursausschreibung/templates/components/input-base", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MJI4J1cK", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"field\",\"isLegend\"]]],null,{\"statements\":[[0,\"  \"],[6,\"legend\"],[9,\"class\",\"uk-legend uk-margin\"],[7],[1,[20,[\"field\",\"label\"]],true],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"id\",[26,[\"hidden\",[20,[\"field\",\"id\"]]]]],[10,\"class\",[26,[\"uk-margin uk-display-inline-block uk-width-1-1 \",[20,[\"field\",\"options\",\"hidden\"]]]]],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"uk-form-label\"],[10,\"for\",[20,[\"field\",\"id\"]],null],[10,\"data-uk-tooltip\",[20,[\"field\",\"options\",\"tooltip\"]],null],[7],[1,[20,[\"field\",\"label\"]],true],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-form-controls\"],[7],[0,\"\\n\"],[4,\"if\",[[20,[\"field\",\"options\",\"tooltip\"]]],null,{\"statements\":[[0,\"      \"],[6,\"label\"],[9,\"class\",\"uk-margin uk-display-inline-block uk-text-meta\"],[7],[1,[20,[\"field\",\"options\",\"tooltip\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[1,[25,\"component\",[[20,[\"componentType\"]]],[[\"field\"],[[20,[\"field\"]]]]],false],[0,\"\\n\"],[4,\"if\",[[20,[\"field\",\"options\",\"showHint\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",[26,[[20,[\"field\",\"options\",\"hintClassNames\"]]]]],[7],[1,[20,[\"field\",\"hint\"]],true],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input-base.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-checkbox", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "p5bfDE2O", "block": "{\"symbols\":[],\"statements\":[[6,\"input\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-checkbox\"],[9,\"type\",\"checkbox\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-checkbox.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-date", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sYMZLrCN", "block": "{\"symbols\":[],\"statements\":[[6,\"input\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-input\"],[9,\"type\",\"date\"],[9,\"data-type\",\"date\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[9,\"pattern\",\"[0-9]{2}.[0-9]{2}.[0-9]{4}\"],[9,\"placeholder\",\"01.01.1970\"],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-date.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-dropdown", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JHSxLiIt", "block": "{\"symbols\":[\"option\",\"option\"],\"statements\":[[4,\"if\",[[20,[\"field\",\"options\",\"showAsRadioButtons\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"uk-grid-small uk-child-width-auto uk-grid\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"field\",\"options\",\"options\"]]],null,{\"statements\":[[0,\"      \"],[6,\"label\"],[7],[6,\"input\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-radio\"],[9,\"type\",\"radio\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"value\",[19,2,[\"Key\"]],null],[10,\"data-human-readable\",[19,2,[\"Value\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[7],[8],[0,\"\\n        \"],[1,[19,2,[\"Value\"]],false],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"select\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-select\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[7],[0,\"\\n\"],[4,\"unless\",[[20,[\"field\",\"options\",\"required\"]]],null,{\"statements\":[[0,\"      \"],[6,\"option\"],[9,\"value\",\"\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"each\",[[20,[\"field\",\"options\",\"options\"]]],null,{\"statements\":[[0,\"      \"],[6,\"option\"],[10,\"value\",[19,1,[\"Key\"]],null],[7],[1,[19,1,[\"Value\"]],false],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-dropdown.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-email", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "D7QBetgb", "block": "{\"symbols\":[],\"statements\":[[6,\"input\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-input\"],[9,\"type\",\"email\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[9,\"autocomplete\",\"email\"],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-email.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jrUaHp9R", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"js-upload\"],[9,\"uk-form-custom\",\"\"],[7],[0,\"\\n    \"],[6,\"input\"],[10,\"id\",[26,[\"file\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-input\"],[9,\"type\",\"file\"],[10,\"accept\",[20,[\"field\",\"acceptFileType\"]],null],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"field\",\"options\",\"required\"]]],null,{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"id\",[26,[\"fileBt\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-button uk-button-default required\"],[9,\"type\",\"button\"],[9,\"tabindex\",\"-1\"],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[7],[1,[20,[\"field\",\"fileTypeLabel\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"id\",[26,[\"fileBt\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-button uk-button-default\"],[9,\"type\",\"button\"],[9,\"tabindex\",\"-1\"],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[7],[1,[20,[\"field\",\"fileTypeLabel\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]}],[8],[0,\"\\n\"],[6,\"div\"],[10,\"id\",[26,[\"img\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-margin uk-hidden\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[1,[25,\"translate\",[\"fileTypePFInfo\"],null],false],[0,\" \"],[6,\"span\"],[9,\"uk-icon\",\"icon: upload; ratio: 1\"],[7],[8],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"img\"],[10,\"id\",[26,[\"imgDev\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-margin uk-hidden\"],[9,\"width\",\"300\"],[7],[8],[0,\"\\n\"],[6,\"button\"],[10,\"id\",[26,[\"fileBtDel\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-button-danger uk-hidden\"],[3,\"action\",[[19,0,[]],\"deleteFile\"]],[7],[6,\"span\"],[9,\"uk-icon\",\"icon: close; ratio: 1\"],[7],[8],[8],[0,\"\\n\"],[6,\"button\"],[10,\"id\",[26,[\"fileBtUpload\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-button-primary uk-hidden\"],[3,\"action\",[[19,0,[]],\"uploadImage\"]],[7],[6,\"span\"],[9,\"uk-icon\",\"icon: upload; ratio: 1\"],[7],[8],[8]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-file.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-freeform-dropdown", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "iWMzEfmg", "block": "{\"symbols\":[],\"statements\":[[6,\"input\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-input typeahead\"],[9,\"type\",\"text\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[10,\"placeholder\",[20,[\"field\",\"placeholder\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-freeform-dropdown.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-number", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zZRioEYY", "block": "{\"symbols\":[],\"statements\":[[6,\"input\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-input\"],[9,\"type\",\"number\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[10,\"placeholder\",[20,[\"field\",\"placeholder\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-number.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-postal-code", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LYXYux96", "block": "{\"symbols\":[],\"statements\":[[6,\"input\"],[9,\"class\",\"uk-input typeahead\"],[9,\"type\",\"text\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[10,\"placeholder\",[20,[\"field\",\"placeholder\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-postal-code.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-string", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+15A7Cqy", "block": "{\"symbols\":[],\"statements\":[[6,\"input\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-input\"],[9,\"type\",\"text\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[10,\"placeholder\",[20,[\"field\",\"placeholder\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-string.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-telephone", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lrv9Q/j7", "block": "{\"symbols\":[],\"statements\":[[6,\"input\"],[9,\"class\",\"uk-input\"],[9,\"placeholder\",\"012 345 67 89\"],[9,\"type\",\"tel\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-telephone.hbs" } });
});
;define("kursausschreibung/templates/components/input/input-textarea", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CNoqAakh", "block": "{\"symbols\":[],\"statements\":[[6,\"textarea\"],[10,\"id\",[26,[\"vss\",[20,[\"field\",\"id\"]]]]],[9,\"class\",\"uk-textarea\"],[10,\"name\",[20,[\"field\",\"id\"]],null],[10,\"required\",[20,[\"field\",\"options\",\"required\"]],null],[10,\"autocomplete\",[20,[\"field\",\"options\",\"autocomplete\"]],null],[10,\"disabled\",[20,[\"field\",\"options\",\"disabled\"]],null],[10,\"placeholder\",[20,[\"field\",\"placeholder\"]],null],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/input/input-textarea.hbs" } });
});
;define("kursausschreibung/templates/components/list-pagination", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "luJ7F7vn", "block": "{\"symbols\":[\"p\",\"p\",\"code\",\"&default\"],\"statements\":[[4,\"if\",[[20,[\"itemsOnCurrentPage\"]]],null,{\"statements\":[[6,\"div\"],[9,\"uk-filter\",\"target: .js-filter\"],[7],[0,\"\\n\"],[4,\"if\",[[20,[\"filterCodes\"]]],null,{\"statements\":[[0,\"  \"],[6,\"ul\"],[9,\"class\",\"uk-subnav uk-subnav-pill\"],[7],[0,\"\\n    \"],[6,\"li\"],[9,\"id\",\"tagAll\"],[9,\"class\",\"uk-active filter-tag\"],[9,\"uk-filter-control\",\"\"],[7],[6,\"a\"],[9,\"href\",\"#\"],[7],[1,[25,\"translate\",[\"FilterTagAllEvents\"],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"filterCodes\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[10,\"id\",[26,[\"tag\",[19,3,[\"id\"]]]]],[9,\"class\",\"filter-tag\"],[10,\"uk-filter-control\",[26,[\".tag\",[19,3,[\"id\"]]]]],[7],[6,\"a\"],[10,\"href\",[26,[\"#\",[19,3,[\"Code\"]]]]],[7],[1,[19,3,[\"Code\"]],false],[8],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"div\"],[9,\"class\",\"uk-grid\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-width-auto@m\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"uk-pagination\"],[9,\"data-uk-margin\",\"\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[0,\"\\n\"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[[20,[\"previousPage\"]]]]]],[[\"class\"],[[25,\"if\",[[20,[\"isFirstPage\"]],\"uk-disabled\"],null]]],{\"statements\":[[0,\"          \"],[6,\"span\"],[9,\"data-uk-pagination-previous\",\"\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"showFirst\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[10,\"class\",[25,\"if\",[[20,[\"p\",\"active\"]],\"uk-active\"],null],null],[7],[0,\"\\n          \"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[1]]]],null,{\"statements\":[[0,\"1\"]],\"parameters\":[]},null],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"showLeftDots\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[9,\"class\",\"uk-disabled\"],[7],[0,\"\\n          \"],[6,\"span\"],[7],[0,\"...\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"each\",[[20,[\"pages\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[10,\"class\",[25,\"if\",[[19,2,[\"active\"]],\"uk-active\"],null],null],[7],[0,\"\\n          \"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[[19,2,[\"page\"]]]]]],null,{\"statements\":[[1,[19,2,[\"page\"]],false]],\"parameters\":[]},null],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[4,\"if\",[[20,[\"showRightDots\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[9,\"class\",\"uk-disabled\"],[7],[0,\"\\n          \"],[6,\"span\"],[7],[0,\"...\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"showLast\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[10,\"class\",[25,\"if\",[[20,[\"p\",\"active\"]],\"uk-active\"],null],null],[7],[0,\"\\n          \"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[[20,[\"lastPage\"]]]]]],null,{\"statements\":[[1,[18,\"lastPage\"],false]],\"parameters\":[]},null],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[6,\"li\"],[7],[0,\"\\n\"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[[20,[\"nextPage\"]]]]]],[[\"class\"],[[25,\"if\",[[20,[\"isLastPage\"]],\"uk-disabled\"],null]]],{\"statements\":[[0,\"          \"],[6,\"span\"],[9,\"data-uk-pagination-next\",\"\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-text-right uk-width-expand@m\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"id\",\"bt-list\"],[9,\"type\",\"button\"],[9,\"uk-icon\",\"icon: list\"],[3,\"action\",[[19,0,[]],\"list\"]],[7],[8],[0,\"\\n      \"],[6,\"button\"],[9,\"id\",\"bt-grid\"],[9,\"type\",\"button\"],[9,\"uk-icon\",\"icon: grid\"],[3,\"action\",[[19,0,[]],\"grid\"]],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"ul\"],[9,\"id\",\"list-cards\"],[9,\"class\",\"uk-list uk-list-divider js-filter\"],[7],[0,\"\\n    \"],[11,4,[[20,[\"itemsOnCurrentPage\"]]]],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"ul\"],[9,\"class\",\"uk-pagination\"],[9,\"data-uk-margin\",\"\"],[7],[0,\"\\n    \"],[6,\"li\"],[7],[0,\"\\n\"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[[20,[\"previousPage\"]]]]]],[[\"class\"],[[25,\"if\",[[20,[\"isFirstPage\"]],\"uk-disabled\"],null]]],{\"statements\":[[0,\"      \"],[6,\"span\"],[9,\"data-uk-pagination-previous\",\"\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"showFirst\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[10,\"class\",[25,\"if\",[[20,[\"p\",\"active\"]],\"uk-active\"],null],null],[7],[0,\"\\n      \"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[1]]]],null,{\"statements\":[[0,\"1\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"showLeftDots\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[9,\"class\",\"uk-disabled\"],[7],[0,\"\\n      \"],[6,\"span\"],[7],[0,\"...\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"each\",[[20,[\"pages\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[10,\"class\",[25,\"if\",[[19,1,[\"active\"]],\"uk-active\"],null],null],[7],[0,\"\\n      \"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[[19,1,[\"page\"]]]]]],null,{\"statements\":[[1,[19,1,[\"page\"]],false]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[4,\"if\",[[20,[\"showRightDots\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[9,\"class\",\"uk-disabled\"],[7],[0,\"\\n      \"],[6,\"span\"],[7],[0,\"...\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"showLast\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[10,\"class\",[25,\"if\",[[20,[\"p\",\"active\"]],\"uk-active\"],null],null],[7],[0,\"\\n      \"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[[20,[\"lastPage\"]]]]]],null,{\"statements\":[[1,[18,\"lastPage\"],false]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"li\"],[7],[0,\"\\n\"],[4,\"link-to\",[[20,[\"route\"]],[25,\"query-params\",null,[[\"page\"],[[20,[\"nextPage\"]]]]]],[[\"class\"],[[25,\"if\",[[20,[\"isLastPage\"]],\"uk-disabled\"],null]]],{\"statements\":[[0,\"      \"],[6,\"span\"],[9,\"data-uk-pagination-next\",\"\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,[25,\"translate\",[\"noResults\"],null],false],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/list-pagination.hbs" } });
});
;define("kursausschreibung/templates/components/remaining-seats-badge", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "X6Qg3zPi", "block": "{\"symbols\":[],\"statements\":[[4,\"unless\",[[20,[\"hidden\"]]],null,{\"statements\":[[0,\"  \"],[6,\"span\"],[10,\"class\",[26,[\"uk-label uk-label-\",[18,\"labelType\"]]]],[7],[1,[20,[\"event\",\"FreeSeats\"]],false],[0,\"\\n    \"],[1,[25,\"translate\",[[25,\"if\",[[20,[\"plural\"]],\"seatsAvailable\",\"seatAvailable\"],null]],null],false],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/remaining-seats-badge.hbs" } });
});
;define("kursausschreibung/templates/components/status-lamp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LsUoQQ/R", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/status-lamp.hbs" } });
});
;define("kursausschreibung/templates/components/subscription-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "TXrzrokX", "block": "{\"symbols\":[\"index\",\"field\",\"field\",\"field\",\"field\"],\"statements\":[[6,\"form\"],[9,\"id\",\"subscriptionForm\"],[9,\"autocomplete\",\"on\"],[10,\"onsubmit\",[25,\"action\",[[19,0,[]],\"submit\"],null],null],[9,\"class\",\"uk-grid-small uk-form-horizontal\"],[9,\"data-uk-grid\",\"\"],[7],[0,\"\\n\"],[4,\"if\",[[20,[\"userSettings\",\"isLoggedIn\"]]],null,{\"statements\":[[0,\"    \"],[6,\"span\"],[9,\"class\",\"uk-text-muted\"],[7],[1,[25,\"translate\",[\"useLogin\",[20,[\"userSettings\",\"FullName\"]]],null],false],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"fieldset\"],[9,\"class\",\"address-fields uk-width-1-1 uk-fieldset\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"fields\"]]],null,{\"statements\":[[0,\"        \"],[1,[25,\"input-base\",null,[[\"field\"],[[19,5,[]]]]],false],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"    \"],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"companyFields\"]]],null,{\"statements\":[[0,\"      \"],[6,\"label\"],[9,\"class\",\"uk-width-1-1\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"checked\"],[\"checkbox\",\"uk-checkbox\",[20,[\"useCompanyAddress\"]]]]],false],[0,\"\\n        \"],[1,[25,\"translate\",[\"companyAddress\"],null],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"fieldset\"],[10,\"hidden\",[25,\"if\",[[20,[\"useCompanyAddress\"]],false,true],null],null],[10,\"disabled\",[25,\"if\",[[20,[\"useCompanyAddress\"]],false,true],null],null],[9,\"class\",\"company-address-fields uk-width-1-1 uk-fieldset\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"companyFields\"]]],null,{\"statements\":[[0,\"          \"],[1,[25,\"input-base\",null,[[\"field\"],[[19,4,[]]]]],false],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-width-1-1\"],[7],[0,\"\\n      \"],[6,\"hr\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n  \"],[6,\"fieldset\"],[9,\"class\",\"subscription-detail-fields uk-width-1-1 uk-fieldset\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"subscriptionDetailFields\"]]],null,{\"statements\":[[0,\"      \"],[1,[25,\"input-base\",null,[[\"field\"],[[19,3,[]]]]],false],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"  \"],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"allowMultiplePeople\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"uk-width-1-1\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"uk-button uk-button-default\"],[9,\"type\",\"button\"],[3,\"action\",[[19,0,[]],\"addPerson\"]],[7],[6,\"span\"],[9,\"data-uk-icon\",\"icon: plus; ratio: 0.7\"],[7],[8],[0,\" \"],[1,[25,\"translate\",[\"addPerson\"],null],false],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"thereAreAdditionalPeople\"]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[9,\"class\",\"uk-button uk-button-default\"],[9,\"type\",\"button\"],[3,\"action\",[[19,0,[]],\"removePerson\"]],[7],[6,\"span\"],[9,\"data-uk-icon\",\"icon: minus; ratio: 0.7\"],[7],[8],[0,\" \"],[1,[25,\"translate\",[\"removePerson\"],null],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[6,\"hr\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"additionalPeople\"]]],null,{\"statements\":[[0,\"      \"],[6,\"fieldset\"],[9,\"class\",\"additional-person-fields uk-width-1-1 uk-fieldset\"],[7],[0,\"\\n        \"],[6,\"h3\"],[7],[1,[25,\"translate\",[\"person\"],null],false],[0,\" \"],[1,[19,1,[]],false],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"additionalPeopleFields\"]]],null,{\"statements\":[[0,\"          \"],[1,[25,\"input-base\",null,[[\"field\"],[[19,2,[]]]]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[6,\"hr\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"uk-width-1-1\"],[7],[0,\"\\n    \"],[6,\"input\"],[9,\"class\",\"uk-button uk-button-primary uk-float-left\"],[9,\"type\",\"submit\"],[10,\"value\",[25,\"translate\",[\"subscribe\"],null],null],[7],[8],[0,\"\\n    \"],[4,\"link-to\",[\"list.category.event\"],[[\"classNames\"],[\"uk-button uk-button-default uk-float-right\"]],{\"statements\":[[1,[25,\"translate\",[\"back\"],null],false]],\"parameters\":[]},null],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/subscription-form.hbs" } });
});
;define("kursausschreibung/templates/components/twitter-feed", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zuegwfDM", "block": "{\"symbols\":[],\"statements\":[[6,\"a\"],[9,\"class\",\"twitter-timeline\"],[10,\"data-lang\",[18,\"language\"],null],[9,\"data-height\",\"500\"],[9,\"data-dnt\",\"true\"],[9,\"data-theme\",\"light\"],[10,\"href\",[26,[\"https://twitter.com/\",[18,\"username\"]]]],[7],[0,\"Tweets by \"],[1,[18,\"username\"],false],[8],[0,\"\\n\"],[6,\"script\"],[9,\"async\",\"\"],[9,\"src\",\"https://platform.twitter.com/widgets.js\"],[9,\"charset\",\"utf-8\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/components/twitter-feed.hbs" } });
});
;define("kursausschreibung/templates/error", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ANLZhH+s", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"uk-width-3-4@m center-container uk-margin-bottom\"],[7],[0,\"\\n  \"],[6,\"span\"],[9,\"class\",\"uk-text-large uk-text-danger\"],[7],[1,[25,\"translate\",[\"errorMessage\"],null],false],[8],[0,\"\\n  \"],[6,\"pre\"],[7],[1,[18,\"model\"],false],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/error.hbs" } });
});
;define("kursausschreibung/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SpsFEHV3", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"uk-width-3-4@m center-container uk-margin-bottom\"],[7],[0,\"\\n  \"],[6,\"span\"],[9,\"class\",\"uk-text-muted\\tuk-text-large\"],[7],[1,[25,\"translate\",[\"noEvents\"],null],false],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/index.hbs" } });
});
;define("kursausschreibung/templates/list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zhTJWLtC", "block": "{\"symbols\":[],\"statements\":[[4,\"unless\",[[20,[\"eventCategoryDropdown\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"uk-visible@m uk-width-1-4@m\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"uk-card uk-card-small uk-card-body\"],[7],[0,\"\\n      \"],[1,[25,\"area-navigation\",[[20,[\"model\"]]],null],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"div\"],[10,\"class\",[26,[[18,\"centerWidth\"],\" center-container uk-margin-bottom\"]]],[7],[0,\"\\n  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list.hbs" } });
});
;define("kursausschreibung/templates/list/category", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+Q5yFz5G", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/category.hbs" } });
});
;define("kursausschreibung/templates/list/category/event", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "exWF0CT6", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/category/event.hbs" } });
});
;define("kursausschreibung/templates/list/category/event/confirmation-error", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jdMaTn/Z", "block": "{\"symbols\":[],\"statements\":[[6,\"ol\"],[9,\"id\",\"subscriptionProcess\"],[9,\"class\",\"steps uk-margin-bottom\"],[9,\"style\",\"z-index: 980;\"],[9,\"uk-sticky\",\"offset: 0; bottom: #top\"],[7],[0,\"\\n  \"],[6,\"li\"],[9,\"class\",\"step1\"],[7],[0,\"\\n    \"],[6,\"span\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepIcon\"],[9,\"uk-icon\",\"icon: file-edit; ratio: 1.5\"],[7],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepText\"],[7],[1,[25,\"translate\",[\"personalData\"],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"li\"],[9,\"class\",\"stepConnector\"],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"uk-icon\",\"icon: chevron-right; ratio: 1.5\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"li\"],[9,\"class\",\"step2 current\"],[7],[0,\"\\n    \"],[6,\"span\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepIcon\"],[9,\"uk-icon\",\"icon: file-text; ratio: 1.5\"],[7],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepText\"],[7],[1,[25,\"translate\",[\"confirmation\"],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"span\"],[9,\"class\",\"uk-display-block uk-margin-top\"],[7],[1,[25,\"translate\",[\"errorMessage\"],null],false],[8],[0,\"\\n\"],[6,\"span\"],[9,\"class\",\"uk-display-block uk-margin-top uk-text-meta technical-reason\"],[7],[1,[25,\"translate\",[\"subscriptionFailed\"],null],false],[0,\"\\n  \"],[1,[20,[\"model\",\"message\"]],false],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"uk-margin\"],[7],[0,\"\\n  \"],[4,\"link-to\",[\"list.category.event.subscribe\"],[[\"classNames\"],[\"uk-button uk-button-default uk-float-left\"]],{\"statements\":[[1,[25,\"translate\",[\"backToSubscripton\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/category/event/confirmation-error.hbs" } });
});
;define("kursausschreibung/templates/list/category/event/confirmation-loading", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6itn51DU", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"uk-height-large\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"uk-position-center\"],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"data-uk-spinner\",\"\"],[7],[8],[0,\" \"],[6,\"span\"],[9,\"class\",\"uk-padding-small\"],[7],[1,[25,\"translate\",[\"sendingData\"],null],false],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"script\"],[7],[0,\"\\n     document.getElementById(\\\"kursausschreibung-root\\\").scrollIntoView({behavior:'smooth'});\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/category/event/confirmation-loading.hbs" } });
});
;define("kursausschreibung/templates/list/category/event/confirmation", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4sYidycC", "block": "{\"symbols\":[\"person\",\"personField\",\"subscriptionDetailField\",\"companyField\",\"field\"],\"statements\":[[6,\"ol\"],[9,\"id\",\"subscriptionProcess\"],[9,\"class\",\"steps uk-margin-bottom\"],[9,\"style\",\"z-index: 980;\"],[9,\"data-uk-sticky\",\"offset: 0; bottom: #top\"],[7],[0,\"\\n  \"],[6,\"li\"],[9,\"class\",\"step1\"],[7],[0,\"\\n    \"],[6,\"span\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepIcon\"],[9,\"data-uk-icon\",\"icon: file-edit; ratio: 1.5\"],[7],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepText\"],[7],[1,[25,\"translate\",[\"personalData\"],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"li\"],[9,\"class\",\"stepConnector\"],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"data-uk-icon\",\"icon: chevron-right; ratio: 1.5\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"li\"],[9,\"class\",\"step2 current\"],[7],[0,\"\\n    \"],[6,\"span\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepIcon\"],[9,\"data-uk-icon\",\"icon: file-text; ratio: 1.5\"],[7],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepText\"],[7],[1,[25,\"translate\",[\"confirmation\"],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"h2\"],[7],[0,\"\\n\"],[4,\"if\",[[20,[\"model\",\"statusIsRed\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"translate\",[\"thankYouWaitingList\"],null],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[1,[25,\"translate\",[\"thankYou\"],null],false],[0,\"\\n\"]],\"parameters\":[]}],[8],[0,\"\\n\\n\"],[6,\"p\"],[7],[1,[25,\"translate\",[\"youWillReceiveAConfirmationEMail\"],null],false],[8],[0,\"\\n\\n\"],[6,\"p\"],[7],[1,[25,\"translate\",[\"officeAddress\"],null],false],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"model\",\"tableData\",\"fields\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h2\"],[7],[1,[25,\"translate\",[\"yourDetails\"],null],false],[8],[0,\"\\n\\n  \"],[6,\"h3\"],[9,\"class\",\"uk-h3\"],[7],[1,[25,\"translate\",[\"addressFields\"],null],false],[8],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"uk-table uk-table-striped uk-margin confirmation-table\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"tableData\",\"fields\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,5,[\"label\"]],true],[8],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,5,[\"value\"]],false],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"model\",\"tableData\",\"companyFields\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[9,\"class\",\"uk-h3\"],[7],[1,[25,\"translate\",[\"companyFields\"],null],false],[8],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"uk-table uk-table-striped uk-margin confirmation-table\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"tableData\",\"companyFields\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,4,[\"label\"]],true],[8],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,4,[\"value\"]],false],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"model\",\"tableData\",\"subscriptionDetailFields\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[9,\"class\",\"uk-h3\"],[7],[1,[25,\"translate\",[\"subscriptionDetailFields\"],null],false],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"id\",\"subscriptionFilesUploadFailed\"],[9,\"class\",\"uk-text-danger\"],[7],[8],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"uk-table uk-table-striped uk-margin confirmation-table\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"tableData\",\"subscriptionDetailFields\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,3,[\"label\"]],true],[8],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,3,[\"value\"]],false],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"tableData\",\"additionalPeopleFields\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[9,\"class\",\"uk-h3\"],[7],[1,[25,\"translate\",[\"person\"],null],false],[0,\" \"],[1,[19,1,[\"index\"]],false],[8],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"uk-table uk-table-striped uk-margin confirmation-table\"],[7],[0,\"\\n\"],[4,\"each\",[[19,1,[\"data\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,2,[\"label\"]],false],[8],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,2,[\"value\"]],false],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"uk-margin\"],[7],[0,\"\\n  \"],[4,\"link-to\",[\"list.category\"],[[\"classNames\"],[\"uk-button uk-button-default uk-float-left\"]],{\"statements\":[[1,[25,\"translate\",[\"backToCourses\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"script\"],[7],[0,\"\\n  setInterval(function(){\\n    if(window.kursausschreibung.subscriptionFilesUploadFailed !== undefined) {\\n        document.getElementById('subscriptionFilesUploadFailed').innerHTML = window.kursausschreibung.subscriptionFilesUploadFailed;\\n        window.kursausschreibung.subscriptionFilesUploadFailed = undefined;\\n      }\\n  },1500);\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/category/event/confirmation.hbs" } });
});
;define("kursausschreibung/templates/list/category/event/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Nn0HfSOr", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"showBreadcrumbs\"]]],null,{\"statements\":[[0,\"  \"],[6,\"ul\"],[9,\"class\",\"uk-breadcrumb\"],[7],[0,\"\\n    \"],[6,\"li\"],[7],[0,\"\\n      \"],[4,\"link-to\",[\"list\"],null,{\"statements\":[[1,[20,[\"model\",\"AreaOfEducation\"]],false]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"li\"],[7],[0,\"\\n      \"],[4,\"link-to\",[\"list.category\"],null,{\"statements\":[[1,[20,[\"model\",\"EventCategory\"]],false]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"h2\"],[7],[0,\"\\n  \"],[6,\"span\"],[9,\"class\",\"uk-flex\"],[7],[0,\"\\n    \"],[6,\"span\"],[7],[1,[25,\"status-lamp\",null,[[\"status\"],[[20,[\"model\",\"status\"]]]]],false],[8],[0,\"\\n    \"],[6,\"span\"],[7],[1,[20,[\"model\",\"displayData\",\"Designation\"]],false],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"model\",\"subtitle\"]]],null,{\"statements\":[[6,\"span\"],[9,\"class\",\"uk-label uk-label-warning uk-margin-small\"],[7],[1,[20,[\"model\",\"subtitle\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[1,[25,\"event-details-table\",null,[[\"event\"],[[20,[\"model\"]]]]],false],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"model\",\"externalSubscriptionURL\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"uk-margin\"],[7],[0,\"\\n    \"],[6,\"a\"],[10,\"href\",[20,[\"model\",\"externalSubscriptionURL\"]],null],[9,\"class\",\"uk-button uk-button-primary uk-float-left subscribe-button\"],[9,\"target\",\"_blank\"],[9,\"rel\",\"noopener\"],[7],[0,\"\\n      \"],[1,[25,\"translate\",[\"subscribe\"],null],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[4,\"link-to\",[\"list.category\"],[[\"classNames\"],[\"uk-button uk-button-default uk-float-right\"]],{\"statements\":[[1,[25,\"translate\",[\"back\"],null],false]],\"parameters\":[]},null],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[20,[\"badgeFreeSeatsEnabled\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"remaining-seats-badge\",null,[[\"event\"],[[20,[\"model\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"div\"],[9,\"class\",\"uk-margin\"],[7],[0,\"\\n    \"],[4,\"link-to\",[\"list.category.event.subscribe\"],[[\"classNames\",\"data-uk-tooltip\",\"tagName\",\"disabled\"],[\"uk-button uk-button-primary uk-float-left subscribe-button\",[25,\"translate\",[[25,\"concat\",[[20,[\"model\",\"status\"]],\"Lamp\"],null]],null],\"button\",[25,\"if\",[[20,[\"model\",\"canDoSubscription\"]],false,true],null]]],{\"statements\":[[1,[25,\"translate\",[\"subscribe\"],null],false]],\"parameters\":[]},null],[0,\"\\n    \"],[4,\"link-to\",[\"list.category\"],[[\"classNames\"],[\"uk-button uk-button-default uk-float-right\"]],{\"statements\":[[1,[25,\"translate\",[\"back\"],null],false]],\"parameters\":[]},null],[0,\"\\n  \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"model\",\"subscriptionWithLoginURL\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"model\",\"canDoSubscription\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"uk-margin\"],[7],[0,\"\\n      \"],[6,\"a\"],[9,\"id\",\"subscriptionWithLoginURL\"],[10,\"href\",[20,[\"model\",\"subscriptionWithLoginURL\"]],null],[9,\"target\",\"_blank\"],[9,\"rel\",\"noopener\"],[9,\"class\",\"uk-button uk-button-primary uk-float-left subscribeWithLogin-button\"],[10,\"data-uk-tooltip\",[25,\"translate\",[[25,\"concat\",[[20,[\"model\",\"status\"]],\"Lamp\"],null]],null],null],[7],[1,[25,\"translate\",[\"subscribeWithLogin\"],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]}],[6,\"script\"],[7],[0,\"\\n var subscriptionWithLoginURL = document.getElementById('subscriptionWithLoginURL');\\n  if(subscriptionWithLoginURL !== null) {\\n    subscriptionWithLoginURL = subscriptionWithLoginURL.href;\\n    var route = window.location.href.substring(window.location.href.indexOf('#'),window.location.href.length);\\n    document.getElementById('subscriptionWithLoginURL').href = subscriptionWithLoginURL + route + '/subscribe';\\n  }\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/category/event/index.hbs" } });
});
;define("kursausschreibung/templates/list/category/event/subscribe", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "InGA/7cD", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[7],[0,\"\\n  \"],[6,\"span\"],[9,\"class\",\"uk-flex\"],[7],[0,\"\\n    \"],[6,\"span\"],[7],[1,[25,\"status-lamp\",null,[[\"status\"],[[20,[\"model\",\"status\"]]]]],false],[8],[0,\"\\n    \"],[6,\"span\"],[7],[1,[20,[\"model\",\"displayData\",\"Designation\"]],false],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[25,\"event-details-table\",null,[[\"event\"],[[20,[\"model\"]]]]],false],[0,\"\\n\"],[6,\"hr\"],[7],[8],[0,\"\\n\\n\"],[6,\"ol\"],[9,\"id\",\"subscriptionProcess\"],[9,\"class\",\"steps uk-margin-bottom\"],[9,\"style\",\"z-index: 980;\"],[9,\"data-uk-sticky\",\"offset: 0; bottom: #top\"],[7],[0,\"\\n  \"],[6,\"li\"],[9,\"class\",\"step1 current\"],[7],[0,\"\\n    \"],[6,\"span\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepIcon\"],[9,\"data-uk-icon\",\"icon: file-edit; ratio: 1.5\"],[7],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepText\"],[7],[1,[25,\"translate\",[\"personalData\"],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"li\"],[9,\"class\",\"stepConnector\"],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"data-uk-icon\",\"icon: chevron-right; ratio: 1.5\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"li\"],[9,\"class\",\"step2\"],[7],[0,\"\\n    \"],[6,\"span\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepIcon\"],[9,\"data-uk-icon\",\"icon: file-text; ratio: 1.5\"],[7],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"stepText\"],[7],[1,[25,\"translate\",[\"confirmation\"],null],false],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[25,\"subscription-form\",null,[[\"event\",\"fields\",\"companyFields\",\"subscriptionDetailFields\",\"allowMultiplePeople\",\"additionalPeopleFields\",\"userSettings\",\"subscribe\"],[[20,[\"model\"]],[20,[\"fields\"]],[20,[\"companyFields\"]],[20,[\"subscriptionDetailFields\"]],[20,[\"allowMultiplePeople\"]],[20,[\"additionalPeopleFields\"]],[20,[\"model\",\"userSettings\"]],[25,\"action\",[[19,0,[]],\"subscribe\"],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/category/event/subscribe.hbs" } });
});
;define("kursausschreibung/templates/list/category/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lSRcMetZ", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[9,\"id\",\"headerCategory\"],[7],[1,[20,[\"model\",\"name\"]],false],[8],[0,\"\\n\"],[1,[25,\"event-list\",null,[[\"events\",\"page\",\"queryChanged\",\"route\"],[[20,[\"model\",\"events\"]],[20,[\"page\"]],[25,\"action\",[[19,0,[]],\"queryChanged\"],null],\"list.category\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/category/index.hbs" } });
});
;define("kursausschreibung/templates/list/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vo3YgDI9", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[9,\"id\",\"headerCategory\"],[7],[1,[25,\"translate\",[\"overview\"],null],false],[8],[0,\"\\n\"],[1,[25,\"event-list\",null,[[\"events\",\"page\",\"queryChanged\",\"route\"],[[20,[\"model\",\"events\"]],[20,[\"page\"]],[25,\"action\",[[19,0,[]],\"queryChanged\"],null],\"list\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "kursausschreibung/templates/list/index.hbs" } });
});
;

;define('kursausschreibung/config/environment', [], function() {
  var prefix = 'kursausschreibung';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("kursausschreibung/app")["default"].create({"rootElement":"#kursausschreibung-root","name":"kursausschreibung","version":"3.3.4+495dbd03"});
          }
        
//# sourceMappingURL=kursausschreibung.map
