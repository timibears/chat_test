const profileSettingsSchema = require('../../../backend/validations/schema/profile-settings-schema');
const {validator} = require('../../core/validatiors');

module.exports = validator.compile({
  name: profileSettingsSchema.name,
});
