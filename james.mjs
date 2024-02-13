import { faker } from '@faker-js/faker'
import Chance from 'chance'
import { convertArrayToCSV } from 'convert-array-to-csv'
import { getRandomInt, getRandomIntByHundred, getRandomItem } from './property-detail.mjs';
import { writeCSV } from './write-csv.mjs';
import dayjs from 'dayjs';

const startDate = new Date('2023-01-01').getTime()
const stopDate = new Date('2023-12-31').getTime()

const times = []
const branches = ['Ekkamai', 'Samyan', 'Ekkamai', 'Samyan', 'Ekkamai', 'Samyan', 'Ekkamai', 'Samyan','Ladkrabang', 'Bangkrapi']
const sex = ['M', 'F']
const educations = ['Primary', 'Secondary', 'Vocational', 'Bachelor', 'GED']
const courses = ['1 day miracle', '1 week marathon', '2 week fornight', '1 month pack']
const subjects = ['Math', 'Science', 'Language', 'Social Studies']
const types = ['online', 'onsite']
const memberships = ['Premium', 'Standard', 'None']

const getTototalCost = (coures) => {
  switch(coures) {
    case '1 day miracle':
      return '490'
    case '1 week marathon':
      return '2990'
    case '2 week fornight':
      return '5990'
    case '1 month pack':
      return '8990'
  }
}

const voucher = [100, 100, 100, 100, 100, 100, 100, 100, 100, 200, 200, 200, 200, 500, 500, 1000]

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

const duringTime = (time) => {
  if (time === 12) {
    return '12 pm - 1 pm'
  }
}

const randomTime = () => {
  let date = new Date();

  date.setHours(8, 0, 0, 0);
  let timeRange = 14 * 60 * 60 * 1000;
  
  let randomMilliseconds = Math.floor(Math.random() * timeRange);
  
  date.setTime(date.getTime() + randomMilliseconds);
  
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const timeString = hours + ':' + minutes + ' ' + ampm;
  
  return timeString;
}

const randomRangeTime = () => {
  let startHour = Math.floor(Math.random() * 14) + 8;
  let endHour = (startHour + 1) % 24;

  let startAmPm = startHour >= 12 ? 'pm' : 'am';
  startHour = startHour % 12 || 12; // Convert 0 to 12

  let endAmPm = endHour >= 12 ? 'pm' : 'am';
  endHour = endHour % 12 || 12; // Convert 0 to 12

  return startHour + ' ' + startAmPm + ' - ' + endHour + ' ' + endAmPm;
}

const replaceTitles = (inputString) => {
  // Define the titles to replace
  var titles = ['Dr. ', 'Mr. ', 'Ms. '];

  // Create a regular expression pattern that matches any of the titles
  var regexPattern = new RegExp(titles.join('|'), 'g');

  // Replace the titles in the input string with an empty string
  var replacedString = inputString.replace(regexPattern, '');

  return replacedString;
}

const arrayCSV = [];
for (let i = 0; i < 10_000; i++) {
  const randSex = getRandomItem(sex)
  const coures = getRandomItem(courses)
  const age = getRandomInt(7, 20)
  const hour = 
  arrayCSV.push([
    dayjs(getRandomInt(startDate, stopDate)).format('DD/MM/YYYY'),
    randomTime(),//`${getRandomInt(9, 11)} am - ${getRandomInt(5, 9)} pm`,
    i + 1,
    getRandomItem(branches),
    replaceTitles(faker.person.fullName({ sex: randSex === 'M' ? 'male' : 'female'})),
    age,
    randSex,
    couresSelection(age),
    coures,
    getRandomItem(subjects),
    getRandomItem(types),
    randomRangeTime(),// `${getRandomInt(9, 11)} am - ${getRandomInt(5, 9)} pm`,
    getTototalCost(coures),
    getRandomItem(memberships),
    getRandomItem(voucher),
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