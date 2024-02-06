import fs from 'fs'

export const writeCSV = (name, csvFile) => {
  fs.writeFile(`./csv/${name}.csv`, csvFile, (err) => {
    if (err) throw err;
    console.log('done', name);
  });
}
