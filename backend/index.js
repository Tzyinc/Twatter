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
    const extraOne = twats.length >= (limit - offset) && twats.pop();
    res.send({ success: true, twats, hasMore: !!extraOne })
})

app.get('/createTwat', function (req, res) {
    const { username, userId, content, parentid = null } = req.query;
    console.log(content.length);
    if (username && userId && content && content.length <= 144) {
        lokiDriver.createTwat({ username, userId, content, parentid })
        res.send({ success: true })
    } else {
        res.send({ success: false })
    }
});

app.get('/getRecentTwats', function (req, res) {
    const { offset = 0, limit = 10 } = req.query;
    const twats = lokiDriver.getRecentTwats(offset, limit);
    const extraOne = twats.length >= (limit - offset) && twats.pop();
    res.send({ success: true, twats, hasMore: !!extraOne });
});

app.get('/getTwatByUsername', function (req, res) {
    const { username, offset = 0, limit = 10 } = req.query;
    if (username) {
        const twats = lokiDriver.getTwatByUsername(username, offset, limit)
        const extraOne = twats.length >= (limit - offset) && twats.pop();
        res.send({ success: true, twats, hasMore: !!extraOne })
    } else {
        res.send({ success: false })
    }
});

app.get('/getTwatByUsernames', function (req, res) {
    const { usernames, offset = 0, limit = 10 } = req.query;
    if (usernames) {
        const twats = lokiDriver.getTwatByUsernames(usernames, offset, limit)
        const extraOne = twats.length >= (limit - offset) && twats.pop();
        res.send({ success: true, twats, hasMore: !!extraOne })
    } else {
        res.send({ success: false })
    }
});



app.get('/getTwatById', function (req, res) {
    const { twatid, offset = 0, limit = 10 } = req.query;
    if (twatid) {
        const twats = lokiDriver.getTwatById(twatid, offset, limit)
        const extraOne = twats.length >= (limit - offset) && twats.pop();
        res.send({ success: true, twats, hasMore: !!extraOne })
    } else {
        res.send({ success: false })
    }
});

app.get('/getUUID', function (req, res) {
    res.send({ id: lokiDriver.getUUID() });
});


app.listen(port);