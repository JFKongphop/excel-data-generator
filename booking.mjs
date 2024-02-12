import { writeCSV } from './write-csv.mjs'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs';
import { checkInTime, getRandomIntByHundred, checkOutTime, getRandomCheckingTime, getRandomInt, getRandomItem } from './property-detail.mjs';
import { convertArrayToCSV } from 'convert-array-to-csv'

const startDate = new Date('2023-01-01').getTime()
const stopDate = new Date('2023-12-31').getTime()

const genders = ['Male', 'Female']
const status = ['Confirmed', 'Pending', 'Cancled']
const sources = ['Website', 'Application']

const arrayCSV = [];
for (let i = 0; i < 50_000; i++) {
  const night = getRandomInt(1, 5)
  arrayCSV.push([
    'b' + faker.string.uuid(),
    dayjs(getRandomInt(startDate, stopDate)).format('YYYY-MM-DD'),
    'g' + faker.string.uuid(),
    faker.person.fullName(),
    getRandomInt(18, 80),
    getRandomItem(genders),
    getRandomInt(1, 5),
    getRandomCheckingTime(checkInTime, checkOutTime),
    getRandomItem(status),
    getRandomIntByHundred(1000, 5000),
    `${night} ${night > 1 ? 'nights' : 'night'}`,
    getRandomItem(sources),
    getRandomIntByHundred(100, 300),
    
  ])
}

const csvFile = convertArrayToCSV(arrayCSV, {
  header: [
    'booking id', 
    'booking date', 
    'guest id', 
    'guest name', 
    'age', 
    'gender',
    'guest number',
    'check in/out', 
    'status',
    'night rate',
    'booking amount',
    'booking source',
    'cleaning fee',
  ],
  separator: ','
});

writeCSV('booking', csvFile)