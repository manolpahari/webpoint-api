const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const success = require('./controllers/success');


const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'manolsharma',
      password : '',
      database : 'wp-contactform'
    }
  });

app.post('/success', (req, res) => {success.handleFormSubmit(req, res, db)})
  
app.listen(3000, () => {
console.log('server is running in port 3000');
})