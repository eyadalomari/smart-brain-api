import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'eyad',
            email: 'eyad.alomari@yahoo.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@yahoo.com',
            password: 'tomato',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '123',
            email:'eyad.alomari@yahoo.com',
            hash: ''
        }
    ]
}

app.get('/', (req, res) => {
    return res.json(database.users);
})

app.post('/signin', (req, res) => {

    bcrypt.compare("cookies", '2a$10$A.4K6nanjOa8frFyw816Q.GmgeP33Cr0V1ZmcM91dqEqb9nGtzNlu', (err, res) => {
        console.log("first guess", res);
    });

    bcrypt.compare("cookies", '2a$10$A.4K6nanjOa8frFyw816Q.GmgeP33Cr0V1ZmcM91dqEqb9nGtzNlu', (err, res) => {
        console.log("second guess", res);
    });

    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.send('seccess');
    } else{
        return res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    
    const {name, email, password} = req.body;

    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    return res.json(database.users[database.users.length-1]);

})

app.get('/profile/:id',(req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true
            return res.json(user);
        }
    })

    if(!found){
        res.status(404).json('no such user');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })

    if(!found){
        res.status(400).json('user not found!');
    }
})



app.listen(3000, ()=>{
    console.log("server start running on port 3000")
})