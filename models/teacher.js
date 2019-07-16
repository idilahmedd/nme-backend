var mongoose = require('mongoose');

// create a schema
var teacherSchema = new mongoose.Schema({
   name: String,
   email: { type: String, required: true, unique: true },
   students: [{type: mongoose.Schema.Types.ObjectId, ref:'Student'}]
});

var Teacher = mongoose.model('Teacher', teacherSchema);

// make this available to our other files
module.exports = Teacher;