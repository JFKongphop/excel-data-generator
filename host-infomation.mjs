import { faker } from '@faker-js/faker'
import Chance from 'chance'
import { convertArrayToCSV } from 'convert-array-to-csv'
import fs from 'fs'
import { getRandomInt } from './property-detail.mjs';
import { writeCSV } from './write-csv.mjs';

const arrayCSV = [];
for (let i = 0; i < 50_000; i++) {
  arrayCSV.push([
    faker.string.uuid(),
    faker.company.name(),
    getRandomInt(10, 100),
    getRandomInt(1, 5)
  ])
}

const csvFile = convertArrayToCSV(arrayCSV, {
  header: [
    'host id', 
    'host name', 
    'host reviews', 
    'host rating', 
  ],
  separator: ','
});

writeCSV('host-infomation', csvFile)