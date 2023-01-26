const express = require('express')
const app = express()
const debug = require('debug')('app:server');
const port = 3000

const cors = require('cors');

app.use(cors());

// Serve static files from the "public" folder
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
