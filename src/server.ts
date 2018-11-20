const express = require('express');
const fs = require('fs');
const request = require('request');
// import cheerio = require('cheerio');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/scrape', (req, res) => {
  // Things to scrap
  // Be careful with the url, this is an example
  const url = 'http://www.imdb.com/title/tt1229340/';

  // Request call
  request(url, (error, response, html) => {
    // Check for errorrs IN THE REQUEST
    if (!error) {
      const $ = cheerio.load(html);

      const json = {
        title: '',
        release: '',
        rating: ''
      };
      let { title, release, rating } = json;

      // Get the title and the relase date
      $('.header').filter(function() {
        const data = $(this);
        title = data
          .children()
          .first()
          .text();

        release = data
          .children()
          .last()
          .children()
          .text();

        json.title = title;
        json.release = release;
        return true;
      });

      // Get the rating
      $('star-box-giga-star').filter(function() {
        const data = $(this);
        rating = data.text();
        json.rating = rating;
        return true;
      });
    }

    fs.writeFile(
      'output.json', JSON.stringify()
      JSON.stringify(json, null, 4), err => {
        console.log(
          'File successfully written! - Check your project directory for output.json!'
        );
      });
    );
  });
})

app.listen(port, () => console.log(`Scrapper levantado en ${port}`));

exports = module.exports = app;
