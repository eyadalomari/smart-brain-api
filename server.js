import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
    ]
}

app.get('/', (req, res) => {
    return res.json(database.users);
})

app.post('/signin', (req, res) => {
    console.log(req.body);
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    } else{
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    console.log('boddy', req.body);
    const {name, email, password} = req.body;
    console.log(password);
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });

    database.users.push({
        id: '125',
        name: name,
        email: email,
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
    const {id} = req.body;
    console.log(req.body);
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.status(200).json(user.entries);
        }
    })

    if(!found){
        res.status(400).json('user not found!');
    }
})



app.listen(3000, ()=>{
    console.log("server start running on port 3000")
})