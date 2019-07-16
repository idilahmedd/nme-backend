var mongoose = require('mongoose');

// create a schema
var studentSchema = new mongoose.Schema({
   name: String,
   email: { type: String, required: true, unique: true },
   age: Number,
});

var Student = mongoose.model('Student', studentSchema);

// make this available to our other files
module.exports = Student;