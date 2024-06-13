const Handlebars = require("handlebars");

// Helper to format dates
Handlebars.registerHelper("format_date", (date) => {
  return new Date(date).toLocaleDateString();
});

// Helper to check equality (useful for conditionals in templates)
Handlebars.registerHelper("eq", (a, b) => {
  return a === b;
});

module.exports = Handlebars;
