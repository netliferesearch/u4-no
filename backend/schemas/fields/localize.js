/*
  add separate fields for other language versions if localize
  called by augmentSchema
  input: field definition
  return: {fields, fieldsets}
    fields = array of sanity field definitions with custom field definitions
    fieldsets = array of added fieldsets (none at the moment)
*/

const languages = [{ code: 'fr', name: 'French' }, { code: 'es', name: 'Spanish' }, { code: 'in', name: 'Indonesian' }];

export default ({ name, title, localize, ...restAttributes }) => {
  const originalFields = [{ name, title, ...restAttributes }];

  if (localize) {
    const translatedFields = languages.map(lang => ({
      title: title + ' (' + lang.name + ')',
      name: name + '_' + lang.code,
      fieldset: name + '_translations',
      ...restAttributes,
    }));
    return {
      fields: originalFields.concat(translatedFields),
      fieldsets: [
        {
          title: 'Translations',
          name: name + '_translations',
          options: { collapsible: true, collapsed: true },
        },
      ],
    };
  }

  return { fields: originalFields, fieldsets: [] };
};
