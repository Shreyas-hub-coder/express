const express = require('express');
const app = express();

app.use(express.json());


function middleware(req, res, next){
    console.log('Hello World');
    next();
}

function loggermiddleware(req, res, next){
    
    console.log('Method:', req.method);
    console.log('IP:', req.ip);
    console.log('Hostname:', req.hostname);
    console.log('Date:', new Date());
    next();
}

app.use(loggermiddleware);
let course = [{
    id: 1,
    name: "java"
},
{
    id: 2,
    name: "Javascript"
},
{
    id: 3,
    name: "Python"
}];

app.get('/courses', (req, res) => {
    res.json(course);
});

app.post('/courses', (req, res) => {
    let singleCourse = {
        id: course.length + 1,
        name: req.body.name
    };

    course.push(singleCourse);
    res.json(course);
});

app.put('/courses/:id', (req, res) => {
    let singleCourse = course.find(c => c.id === parseInt(req.params.id));
    if (!singleCourse) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    singleCourse.name = req.body.name;
    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    let singleCourse = course.find(c => c.id === parseInt(req.params.id));
    if (!singleCourse) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    let index = course.indexOf(singleCourse);
    course.splice(index, 1);
    res.json(course);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');

});
