import { convertArrayToCSV } from 'convert-array-to-csv'
import { writeCSV } from './write-csv.mjs'

const typeOfResidences = ['Single-home', 'Apartment', 'Townhouse', 'Condominium']
const typeOfPlace = ['Entire room', 'Sharing space']
const facilities = ['Kitchen', 'Air conditioning', 'Free parking on premises', 'TV',
'Long term stays allowed', 'Smoke alarm', 'Carbon monoxide alarm',
'Paid parking on premises', 'Fire extinguisher', 'Pool', 'Wifi',
'Washer', 'Hangers', 'Elevator', 'Lock on bedroom door', 'Gym',
'Hair dryer', 'Shampoo', 'Essentials', 'Cable TV',
'TV with standard cable', 'Heating', 'Microwave', 'Bed linens',
'Coffee maker', 'Refrigerator', 'Dishes and silverware',
'Paid parking off premises', 'Hot water', 'Host greets you',
'BBQ grill', 'Hot tub', 'Dedicated workspace',
'Security cameras on property', 'First aid kit', 'Iron', 'Stove',
'Dryer', 'Patio or balcony', 'Luggage dropoff allowed', 'Freezer',
'Paid washer – In building', 'Shared outdoor lap pool',
'Cooking basics', 'Shared gym nearby', 'Dining table',
'Drying rack for clothing', 'Laundromat nearby', 'Toaster',
'Clothing storage: dresser and closet', 'Cleaning products',
'Bidet', 'Room-darkening shades', 'Electric stove',
'Free street parking', 'Indoor fireplace', 'Shower gel',
'Private entrance', 'Private hot tub', 'Shared pool', 'Breakfast',
'Pocket wifi', 'Building staff', 'Wine glasses', 'Safe',
'High chair', 'Extra pillows and blankets', 'Body soap', 'Crib',
'Hot water kettle', 'Babysitter recommendations',
'Children’s books and toys', 'Conditioner',
'Clothing storage: closet', 'Sauna', 'Ethernet connection',
'Single level home', 'Oven', 'Private gym in building',
'HDTV with standard cable', 'Paid dryer – In building',
'Mosquito net', 'Outdoor dining area', 'Bikes',
'Shared patio or balcony', 'Outdoor furniture',
'Clothing storage: closet, dresser, and wardrobe', 'Pool table',
'Cleaning before checkout', 'Central air conditioning',
'Hotel grade shampoo', 'Children’s dinnerware']
export const checkInTime = ['13:00', '14:00', '15:00', '16:00']
export const checkOutTime = ['11:00', '12:00']
const status = ['Avaliable', 'Booked']

export const getRandomItem = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomRoom = () => {
  const bedroom = getRandomInt(1, 3)
  const bathroom = getRandomInt(1, 2)

  return `${bedroom} ${bedroom > 1 ? 'bedrooms' : 'bedroom'}, ${bathroom} ${bathroom > 1 ? 'bathrooms' : 'bathroom'}`
}

const getRandomFacilities = (facilities) => {
  const count = Math.floor(Math.random() * (6 - 3 + 1)) + 3;

  const shuffledFacilities = [...facilities];
  for (let i = shuffledFacilities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledFacilities[i], shuffledFacilities[j]] = [shuffledFacilities[j], shuffledFacilities[i]];
  }

  const randomFacilitiesJoined = shuffledFacilities.slice(0, count).join(', ');

  return randomFacilitiesJoined;
}

export const getRandomCheckingTime = (checkins, checkouts) => {
  const checkIn = getRandomItem(checkins)
  const checkOut = getRandomItem(checkouts)

  return `Check in/out after ${checkIn}, before ${checkOut}`
}

const getRandomIntByHundred = (min, max) => {
  min = Math.floor(min / 100) * 100;
  max = Math.floor(max / 100) * 100;

  const randomInt = Math.floor(Math.random() * ((max - min) / 100 + 1)) * 100 + min;

  return randomInt;
}


const arrayCSV = [];
for (let i = 0; i < 50_000; i++) {
  arrayCSV.push([
    getRandomItem(typeOfResidences),
    getRandomItem(typeOfPlace),
    getRandomRoom(),
    getRandomFacilities(facilities),
    getRandomCheckingTime(checkInTime, checkOutTime),
    getRandomInt(1, 20),
    getRandomInt(1, 20),
    getRandomInt(100, 900) ,
    getRandomInt(1, 5),
    getRandomInt(10, 100),
    getRandomItem(status),
    getRandomIntByHundred(500, 5000),
    getRandomIntByHundred(1000, 8000),
    getRandomIntByHundred(100, 300),
  ])
}

const csvFile = convertArrayToCSV(arrayCSV, {
  header: [
    'type of residence', 
    'type of place', 
    'size', 
    'facilities', 
    'check in/out', 
    'city distance (km)', 
    'attractions distance (km)',
    'transportation distance (m)',
    'rating',
    'reviews',
    'status',
    'night rate',
    'season rate',
    'cleaning fee',
  ],
  separator: ','
});


writeCSV('property-detail', csvFile)
