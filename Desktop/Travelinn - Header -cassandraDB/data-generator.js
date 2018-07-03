const faker = require('faker');
const fs = require('fs');

let hostelId;
let locationId = 1;

const createHostelsCSV = () => {

  for (hostelId = 1; hostelId < 10000001; hostelId++) {
    if (locationId === 100001) {
      locationId = 1;
    }
    let newEntry = hostelId + '|' + faker.company.companyName() + '|{wifi' + ':' + faker.random.boolean() + ',coffee:' + faker.random.boolean() + '}|' + faker.address.streetAddress() + '|' + faker.address.city() + '|' + faker.address.country() + '|' + locationId + '\n';
    
    try {
      fs.appendFileSync('./cassandraDB/dataFiles/hostels.csv', newEntry, 'utf8');
      console.log('data was appended to csv hostels file!');
    } catch (error) {
      console.log(error);
    }

    locationId++;
  }
}

// let photoNum = 1;

// const createPhotosCSV = () => {

//   for (hostelId = 1; hostelId < 1000001; hostelId++) {
//     if (photoNum === 1001) {
//       photoNum = 1;
//     }

//     let newEntry = hostelId + `|{https://s3.amazonaws.com/travelinn-header/${photoNum}.jpeg, https://s3.amazonaws.com/travelinn-header/${photoNum + 1}.jpeg, https://s3.amazonaws.com/travelinn-header/${photoNum + 2}.jpeg, https://s3.amazonaws.com/travelinn-header/${photoNum + 3}.jpeg, https://s3.amazonaws.com/travelinn-header/${photoNum + 4}.jpeg}` + '\n';
  
//     try {
//       fs.appendFileSync('./cassandraDB/dataFiles/photos_1.csv', newEntry, 'utf8');
//     } catch (error) {
//       console.log(error);
//     }

//     photoNum += 5;
//   }
// }

let photoId = 1;

const createPhotosCSV = () => {
  hostelId = 4000001;

  while (hostelId < 5000001) {
    if (photoId === 1001) {
      photoId = 1;
    }

    for (var num = 1; num < 6; num++) {
      let newEntry = hostelId + '|' + photoId + `|{https://s3.amazonaws.com/travelinn-header/${photoId}.jpeg}` + '\n';

      try {
        fs.appendFileSync('./cassandraDB/dataFiles/photos_9.txt', newEntry, 'utf8');
      } catch (error) {
        console.log(error);
      }
      photoId++;
    }
    hostelId++;
  }
}

createPhotosCSV();