import { faker } from '@faker-js/faker'
import Chance from 'chance'
import { convertArrayToCSV } from 'convert-array-to-csv'
import { getRandomInt } from './property-detail.mjs';
import { writeCSV } from './write-csv.mjs';

const arrayCSV = [];
for (let i = 0; i < 50_000; i++) {
  arrayCSV.push([
    'h' + faker.string.uuid(),
    faker.company.name(),
    getRandomInt(10, 100),
    getRandomInt(1, 5),
    getRandomInt(100_000, 500_000)
  ])
}


const csvFile = convertArrayToCSV(arrayCSV, {
  header: [
    'host id', 
    'host name', 
    'host reviews', 
    'host rating', 
    'host revenue'
  ],
  separator: ','
});

writeCSV('host-infomation', csvFile)