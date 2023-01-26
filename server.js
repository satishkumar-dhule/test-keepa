const express = require('express')
const app = express()
const debug = require('debug')('app:server');
const port = 3000
const axios = require('axios');

const cors = require('cors');

app.use(cors());

const cheerio = require('cheerio');

// app.get('/data', async (req, res) => {
//     const url = 'https://keepa.com/#!product/10-B089DMWSLG';
//     try {
//         const { data } = await axios.get(url);
//         res.type('html');
//         res.send(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error fetching data");
//     }
// });

app.get('/products', async (req, res) => {
    try {
        const { data } = await axios.get('https://www.amazon.in/gp/bestsellers/books/ref=zg_bs_books_home_all?ie=UTF8');
        const $ = cheerio.load(data);
        const products = [];
        // use cheerio to extract the top 1000 products
        $('.zg-item-immersion').each(function(i, element) {
            const title = $(element).find('.p13n-sc-truncate').text().trim();
            const link = $(element).find('.a-link-normal').attr('href');
            products.push({title, link});
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error fetching data"});
    }
});


// Serve static files from the "public" folder
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
