/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { Pool, Client } = require('pg')

var env = process.env.NODE_ENV || 'development';
var dbConfig = require('./config')[env];

/*
 |--------------------------------------
 | DB Connections
 |--------------------------------------
 */

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port
})

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

// We'll use this function to add authorization to specific calls
module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET list of public events starting in the future
  app.get('/api/events', (req, res) => {

    var query = 
      'select * ' + 
      'from pean_rsvp.event;';

    pool.query(query, (err, res) => {
      
      let data = res.rows;
      let eventsArr = [];

      if (err) {
        return res.status(500).send({message: err.message});
      }

      console.log(data);

      if (data) {
        data.forEach(event => {
          eventsArr.push(event);
        });
      }

      pool.end()
      return data; //  eventsArr;
      
    })

  });

};