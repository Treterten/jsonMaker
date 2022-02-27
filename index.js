const fs = require('fs');
(function () {
  fs.readFile('./realFiles/Rules.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
    }
    const rawStrings = data.split(/(^Rule \d+).+/gm);
    const cleanStrings = rawStrings.map((string) => {
      return string.replace(/\r?\n|\r/g, ' ');
    });
    console.log(cleanStrings);
    const sanitizedStrings = cleanStrings.filter((string) => {
      return string.length > 1;
    });
    console.log(sanitizedStrings);
    const finalObj = {};
    for (let i = 0; i < sanitizedStrings.length - 1; i += 2) {
      console.log(sanitizedStrings[i]);
      let key = sanitizedStrings[i];
      console.log(key);
      finalObj[key] = sanitizedStrings[i + 1].trim();
    }
    console.dir(finalObj);
    fs.writeFile('./output/jsonData.json', JSON.stringify(finalObj), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
})();
