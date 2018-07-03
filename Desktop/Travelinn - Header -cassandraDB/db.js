const cassandra = require('cassandra-driver');
const util = require('util');

const client = new cassandra.Client({contactPoints: ['127.0.0.1']});

// client.connect(function (err) {
//   if (err) return console.error(err);
//   console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
// });

client.execute = util.promisify(client.execute);

const createKeyspace = (() => {
  client.execute(`DROP KEYSPACE IF EXISTS travelinn`)
  .then( () => {
    client.execute(`CREATE KEYSPACE travelinn WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};`)
    .then(() => console.log('Keyspace created!'))
    .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))
})();

const createTables = (() => {
  client.execute(
    `CREATE TABLE hostels (
      hostel_id int,
      hostel_name text,
      features map<text, text>,
      street_name text,
      city_name text,
      country_name text,
      location_id int,
      PRIMARY KEY (hostel_id)
    );`
  );

  client.execute(
    `CREATE TABLE photos (
      hostel_id int,
      photo_id int,
      photo_url text,
      PRIMARY KEY ((hostel_id), photo_id)
    );`
  )

  client.execute(
    `CREATE TABLE hostels_by_location (
      location_id int,
      hostel_id int,
      city_name text STATIC,
      PRIMARY KEY (location_id, hostel_id)
    ) WITH CLUSTERING ORDER BY (hostel_id ASC);`
  )
})();

// CREATE TABLE hostels_by_location (location_id int, hostel_id int, PRIMARY KEY (location_id, hostel_id)) WITH CLUSTERING ORDER BY (hostel_id ASC);

// COPY hostels_by_location (location_id int, hostel_id int) FROM '' WITH DELIMITER = '|';

// COPY photos (hostel_id, photo_id, photo_url) FROM '/home/dataFiles/photos_2.8.txt' WITH DELIMITER = '|';

// COPY hostels (hostel_id, hostel_name, features, street_name, city_name, country_name, location_id) 
// FROM './home/dataFiles/hostels.csv' 
// WITH DELIMITER '|';

// COPY hostels (hostel_id, hostel_name, features, street_name, city_name, country_name, location_id) FROM '/home/dataFiles/hostels_8.txt' WITH DELIMITER = '|';
// COPY hostels_by_location (location_id, city_name, country_name, hostels) FROM '/home/dataFiles/hostels_by_location_1.txt' WITH DELIMITER = '|';

// // get all info for hostel (on render):

// const hostelQuery = `SELECT hostel_name, features, street_name, city_name, country_name, location_id FROM hostels WHERE hostel_id = ?`;
// const hostelParams = id;

// // get photos for hostel (on render):

// const photoQuery = `SELECT photo_url FROM photos WHERE hostel_id = ${id}`;


// // get hostels by city (search bar):

// const locationQuery = `SELECT city_name, country_name, hostels FROM hostels_by_location WHERE location_id = ${id}`;
