var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const Teacher = require('./models/teacher');
const Student = require('./models/student');

app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/family-tree');

app.get('/', function (req, res) {
   res.send('Hi!');
});
//GET- get all teachers -working
app.get('/teachers', (req, res) => {
   Teacher.find({}, function (err, teachers) {
      if (err) res.json(err)
      res.json(teachers)
   })
})
//GET - get/show one teacher-working
app.get('/teacher/:name', (req, res) => {
   Teacher.findOne({ name: req.body.name }, function (err, teacher) {
      if (err) res.json(err)
      res.json(teacher)
   })
})
//POST - create a teacher--working
app.post('/teacher/new', (req, res) => {
   Teacher.create({
      //student: req.body.student,<< Dont know if that will get apended or should i add
      name: req.body.name,
      email: req.body.email
   }, function (err, Teacher) {
      res.json(Teacher)
   })
})
//PUT /teachers/:id -- update a teacher
app.put('/teachers/:id', (req, res) => {
   Teacher.findByIdAndUpdate(
      req.params.id,
      {
         $set: {
            name: req.body.name,
            email: req.body.email
         }
      },
      { new: true },
      function (err, teacher) {
         if (eff) res.json(err)
         res.json(teacher)
      })
})
//POST- add student to teacher???
app.post("/teachers/:id/students", (req, res) => {
   Teacher.findById(req.params.id, function (err, teacher) {
      Student.create({
         name: req.body.name,
         email: req.body.email,
         age: req.body.age
      }, function (err, student) {
         teacher.students.push(student)
         teacher.save(function (err) {
            //errr handling
            res.json(teacher)
         })
      })
   })
})
//DELETE -delete one teacher
app.delete("/teachers/:id", (req, res) => {
   Teacher.findByIdAndRemove(req.params.id, function (err) {
      if (err) res.json(err)
      res.json({ message: "DELETED!!" })
   })
})


//==========================================================================================//

//GET-create a new student
app.post('/student', (req, res) => {
   Student.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
   }, function (err, Student) {
      res.json(Student)
   })
})
// GET- get the details for a student by finding the attached teacher ?????????
app.get('/teacher/:student', (req, res) => {
   Teacher.findOne({
      student: req.body.student,
   }, function (err, student) {
      if (err) res.json(err)
      res.json(student)
   })
})
//GET- get one student's details
app.get('/student/:name', (req, res) => {
   Student.findOne({ name: req.body.name }, function (err, student) {
      if (err) res.json(err)
      res.json(student)
   })
})
//DELETE- delete one student from teacher's table ?????
app.get("/delete/:student", (req, res) => {
   Teacher.remove({
      student: req.body.student,
   }, function (err) {
      if (err) res.json(err)
      res.json({ message: "DELETED!!" })
   })
})
//DELETE-delete one student from student table
app.get("/delete", (req, res) => {
   Student.remove({ name: req.body.name }, function (err) {
      if (err) res.json(err)
      res.json({ message: "DELETED!!" })
   })
})


app.listen(3000);






