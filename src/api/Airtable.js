var Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyeBnoNrKfxJ9lUK',
});
export var AirtableBase = Airtable.base('appoBpbHiITJVb0dS');
