const express = require('express');
const app = express();
const cors = require('cors');
const lokiDriver = require('./data/lokiDriver.js');

lokiDriver.initDB();

// getUUID,
// getRecentTwats,
// getTwatByUsername,
// getTwatById,
// createTwat,

const port = 3030;

app.use(cors());

// key must be same as cachedData, value is url

app.get('/', function (req, res) {
    const { offset = 0, limit = 10 } = req.query;
    const twats = lokiDriver.getRecentTwats(offset, limit);
    res.send({ success: true, twats })
})

app.get('/createTwat', function (req, res) {
    const { username, userId, content, parentid = null } = req.query;
    if (username && userId && content) {
        lokiDriver.createTwat({ username, userId, content, parentid })
        res.send({success: true})
    } else {
        res.send({ success: false })
    }
});

app.get('/getRecentTwats', function (req, res) {
    const { offset=0, limit=10 } = req.query;
    const twats = lokiDriver.getRecentTwats(offset, limit);
    res.send(twats);
});

app.get('/getTwatByUsername', function (req, res) {
    const { username, offset = 0, limit = 10 } = req.query;
    if (username) {
        const twats = lokiDriver.getTwatByUsername( username, offset, limit )
        res.send({ success: true, twats })
    } else {
        res.send({ success: false })
    }
});


app.get('/getTwatById', function (req, res) {
    const { twatid, offset = 0, limit = 10 } = req.query;
    if (twatid) {
        const twats = lokiDriver.getTwatById(twatid, offset, limit)
        res.send({ success: true, twats })
    } else {
        res.send({ success: false })
    }
});

app.get('/getUUID', function (req, res) {
    res.send({id: lokiDriver.getUUID()});
});


app.listen(port);