const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const students = [
    {id:1, name:"chayanan", age:18},
    {id:2, name:"Conan", age:19},
    {id:3, name:"Sora", age:23}
]

const validateStudent = (req, res, next) => {
    const { name, age } = req.body; 

    if (!name || !age) {
        return res.status(400).send("Invalid data");
    }
    next();
}

app.get('/api/students', (req, res) => {
    res.send(students)
})
app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (student){
        res.send(student);
    } else {
        res.status(404).send("error 404: Student not found");
    }
})

app.post('/api/students', validateStudent, (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    students.push(newStudent);
    res.json(newStudent);
});

app.put('/api/students/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
        students[index].name = req.body.name;
        students[index].age = req.body.age;
        res.json(students[index]);
    } else {
        res.status(404).send("error 404: Student not found");
    }
});

app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
        const deletedStudent = students.splice(index, 1);
        res.json({ message: "Student deleted", student: deletedStudent[0] });
    } else {
        res.status(404).send("error 404: Student not found");
    }
});

app.listen(3000, () => {
    console.log('Server is Running on port 3000');
});