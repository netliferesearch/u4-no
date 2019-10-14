/*
  input: sanity schema
  return: sanity schema with custom field definitions and localized fields
  custom field types:
    type: defaultText
  localized fields:
    adds fields named fieldname_fr and fieldname_es
*/
import customize from './customize';
import localize from './localize';

export default ({ fields = [], fieldsets = [], ...restAttributes }) => {
  var returnFields = [];
  var returnFieldsets = fieldsets;

  // first pass: replace custom field type names with actual definition
  fields.forEach(function(field, index) {
    let result = customize(field);
    returnFields.push.apply(returnFields, result.fields);
    returnFieldsets.push.apply(returnFieldsets, result.fieldsets);
  });

  return localizeDocument({
    fields: returnFields,
    fieldsets: returnFieldsets,
    ...restAttributes,
  });
};

const localizeDocument = ({ fields = [], fieldsets = [], ...restAttributes }) => {
  var returnFields = [];
  var returnFieldsets = fieldsets;

  // second pass: replace custom field type names with actual definition
  fields.forEach(function(field, index) {
    let result = localize(field);
    returnFields.push.apply(returnFields, result.fields);
    returnFieldsets.push.apply(returnFieldsets, result.fieldsets);
  });

  return {
    fields: returnFields,
    fieldsets: returnFieldsets,
    ...restAttributes,
  };
};
