// Configure Auth0 connection
var config = {

  AUTH0_DOMAIN: 'ncanderson.auth0.com',
  AUTH0_API_AUDIENCE: 'http://localhost:8083/api/',
  NAMESPACE: 'http://myapp.com/roles',

  development: {
      user: 'postgres',
      host: 'localhost',
      database: 'pean_rsvp',
      password: 'postgres',
      port: 5433,
  }

}

module.exports = config;