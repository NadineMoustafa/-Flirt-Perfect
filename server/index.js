const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const questions = require('./routes/api/questions');
const answers = require('./routes/api/quizzes');
const app = express();
const {setQuestions} = require('./services/setQuestions');
const cors = require('./node_modules/cors/lib')

let dbDocker = require('./config/keys_dev.json').dbURI;
let db = require('./config/keys_dev.json').mongoURI;

//"mongodb://mongo:27017/aclDB"
app.use(cors())
mongoose
    .connect(db, 
      { useNewUrlParser: true ,useUnifiedTopology: true}
      )
    .then(() => {
      console.log('Connected to MongoDB')
      setQuestions()
    })
    .catch(err => console.log(err))

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/routes/api/users', users);
app.use('/routes/api/questions', questions);
app.use('/routes/api/quizzes', answers);


// Handling 404
app.use((req, res) => {
	res.status(404).send({ err: 'We can not find what you are looking for' });
});


const port = process.env.PORT || 3333;


app.listen(port, () => console.log(`Server up and running on port ${port}`));
