import { faker } from '@faker-js/faker'
import Chance from 'chance'
import { convertArrayToCSV } from 'convert-array-to-csv'
import { getRandomInt, getRandomIntByHundred, getRandomItem } from './property-detail.mjs';
import { writeCSV } from './write-csv.mjs';
import dayjs from 'dayjs';

const startDate = new Date('2023-01-01').getTime()
const stopDate = new Date('2023-12-31').getTime()

const times = []
const branches = ['Ekkamai', 'Samyan', 'Ladkrabang', 'Bangkrapi']
const sex = ['M', 'F']
const educations = ['Primary', 'Secondary', 'Vocational', 'Bachelor', 'GED']
const courses = ['1 day miracle', '1 week marathon', '2 week for night', '3 week triahalon', '1 month pack']
const subjects = ['Math', 'Science', 'Language', 'Social Studies']
const types = ['online', 'onsite']
const memberships = ['Premium', 'Standard', 'None']

const getTototalCost = (coures) => {
  switch(coures) {
    case '1 day miracle':
      return '490'
    case '1 week marathon':
      return '3490'
    case '2 week for night':
      return '5990'
    case '3 week triahalon':
      return '7490'
    case '1 month pack':
      return '8990'
  }
}

const couresSelection = (age) => {
  if (age < 13) {
    return 'Primary'
  }
  else if (age < 19) {
    return getRandomItem(['Secondary', 'Vocational', 'GED'])
  }
  else {
    return 'Bachelor'
  }
}


const arrayCSV = [];
for (let i = 0; i < 10_000; i++) {
  const randSex = getRandomItem(sex)
  const coures = getRandomItem(courses)
  const age = getRandomInt(7, 20)
  arrayCSV.push([
    dayjs(getRandomInt(startDate, stopDate)).format('DD/MM/YYYY'),
    `${getRandomInt(9, 11)} am - ${getRandomInt(5, 9)} pm`,
    i + 1,
    getRandomItem(branches),
    faker.person.fullName({ sex: randSex === 'M' ? 'male' : 'female'}),
    age,
    randSex,
    couresSelection(age),
    coures,
    getRandomItem(subjects),
    getRandomItem(types),
    `${getRandomInt(9, 11)} am - ${getRandomInt(5, 9)} pm`,
    getTototalCost(coures),
    getRandomItem(memberships),
    getRandomIntByHundred(100, 1000),
  ])
}


const csvFile = convertArrayToCSV(arrayCSV, {
  header: [
    'date', 
    'time', 
    'customer id', 
    'branch', 
    'customer name',
    'age',
    'sex',
    'education',
    'course',
    'subject',
    'type',
    'hours',
    'total cost',
    'membership',
    'gift voucher'
  ],
  separator: ','
});

writeCSV('jame', csvFile)