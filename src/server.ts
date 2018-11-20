const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

app.use(express.json());

let events;

app.get('/scrape', (req, res) => {
  // Things to scrap
  // Be careful with the url, this is an example
  const url = 'https://lagenda.org/';

  // Request call
  request(url, (error, response, html) => {
    // Check for errorrs IN THE REQUEST
    if (!error) {
      const $ = cheerio.load(html);

      events = {};

      // Get the title
      $('body')
        .find('h4.title')
        .each(function(index) {
          const data = $(this);
          const title = data
            .children()
            .first()
            .text();
          events[index] = title;
        });

      // TODO: Implement:
      // DOM traversal of description,
      // location
      // and date - time
    }
    const filePath = `output.json`;
    const fileText = JSON.stringify(events);
    function populateJSON(fileContent) {
      return new Promise((resolve, reject) => {
        fs.writeFile('output.json', JSON.stringify(events), err => {
          if (err) {
            console.log(
              `Can't write on 'output.json', try removing the fire from the project folder'`
            );
            return reject(err);
          }
          console.log(
            'File successfully written! - Check your project directory for output.json!'
          );
          return resolve(fileText);
        });
      });
    }
    populateJSON(fileText);
  });
  res.redirect('https://josedg.com');
});

app.listen(port, () => console.log(`Spider leyendo en ${port}`));

exports = module.exports = app;
