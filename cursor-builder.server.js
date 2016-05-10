import _ from 'lodash';

class CursorBuilder {
  constructor(collectionHandler) {
    // Vars
    this.collectionHandler = collectionHandler;
    this.selectorsStack = {};
    this.fieldsStack = {};
    this.sortsStack = {};
    this.optionsStack = {};
    // Binds
    this.mergeToStackAndReturnSelf = this.mergeToStackAndReturnSelf.bind(this);
    this.isIdShortcodeFilter = this.isIdShortcodeFilter.bind(this);
    this.isInIdsShortcodeFilter = this.isInIdsShortcodeFilter.bind(this);
    this.getNewSelector = this.getNewSelector.bind(this);
    this.query = this.query.bind(this);
    this.fields = this.fields.bind(this);
    this.sorts = this.sorts.bind(this);
    this.options = this.options.bind(this);
    this.cursor = this.cursor.bind(this);
  }

  mergeToStackAndReturnSelf(stack, params) {
    _.merge(stack, params);
    return this;
  }

  isIdShortcodeFilter(name, params) {
    const { filters } = this.collectionHandler;
    return _.isString(name) && !_.has(filters, name) && !_.size(params);
  }

  isInIdsShortcodeFilter(name, params) {
    const { filters } = this.collectionHandler;
    return _.isArray(name) && !_.has(filters, name) && !_.size(params);
  }

  getNewSelector(name, params) {
    const { filters, collection } = this.collectionHandler;
    name = name || 'all';
    if(this.isIdShortcodeFilter(name, params)) {
      params = [name];
      name = 'id';
    } else if(this.isInIdsShortcodeFilter(name, params)) {
      params = [name];
      name = 'in';
    }

    if(!_.has(filters, name)) {
      console.warn(`[PUBLICATION BUILDER] ${name} query was not found for collection ${collection._name}.`);
      return {};
    }
    return filters[name](...params);
  }

  query(name, ...params) {
    const newSelector = this.getNewSelector(name, params);
    return this.mergeToStackAndReturnSelf(this.selectorsStack, newSelector);
  }

  fields(...params) {
    const newFields = {};
    _.each(params, (field) => newFields[field] = 1);
    return this.mergeToStackAndReturnSelf(this.fieldsStack, newFields);
  }

  sorts(params) { return this.mergeToStackAndReturnSelf(this.sortsStack, params); }
  options(params) { return this.mergeToStackAndReturnSelf(this.optionsStack, params); }

  cursor() {
    const { collection } = this.collectionHandler;
    const options = _.merge(this.optionsStack, { fields: this.fieldsStack, sort: this.sortsStack });
    const query = this.selectorsStack;
    return collection.find(query, options);
  }
}

export default CursorBuilder;
