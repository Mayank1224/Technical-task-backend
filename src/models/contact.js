const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: String,
  description: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
