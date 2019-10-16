/*
  replace custom field names with definition
  called by augmentSchema
  input: sanity field definition object
  return: {fields, fieldsets}
    fields = array of sanity field definitions with custom field definitions
    fieldsets = array of added fieldsets (none at the moment)
*/

import defaultText from './defaultText';

export default field => {
  if (field.type == 'defaultText') {
    return defaultText(field);
  }
  return { fields: [field], fieldsets: [] };
};
