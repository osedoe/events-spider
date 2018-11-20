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
      // description: '',
      // rating: ''
      // let { title, description, rating } = json;

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

      // .filter(function() {
      //   const data = $(this);
      //   json.title = data.text();
      //   title = json.title;
      // });

      // Get description
      // $('.summary_text')
      //   .first()
      //   .filter(function() {
      //     const data = $(this);
      //     json.description = data.text();
      //     description = json.description;
      //   });

      // // Get the rating
      // $('.ratingValue').filter(function() {
      //   const data = $(this);
      //   json.rating = data
      //     .children()
      //     .first()
      //     .children()
      //     .first()
      //     .text();
      //   rating = json.rating;
      // });
    }
    console.log(events);
    fs.writeFile('output.json', events, err => {
      console.log(
        'File successfully written! - Check your project directory for output.json!'
      );
    });
  });
});

app.listen(port, () => console.log(`Spider leyendo en ${port}`));

exports = module.exports = app;
