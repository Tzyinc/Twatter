// first access -> get UID, store on localstorage
// first post -> require username, pair with UID

// twat should contain: twatid, username, UID, timestamp, content, parentid (can be null)

// get twat by id
// get twat by username
// get n most recent twats (discover);

var loki = require('lokijs')
var adapter = require('lokijs/src/loki-fs-structured-adapter');
const { v4: uuidv4 } = require('uuid');

var database = new loki('./TwatterDb.db', {
    autoload: true,
    autosave: true,
    adapter: new adapter(),
    autosaveInterval: 10000,
    autoloadCallback: initDB
});

var db = {}

function initDB() {
    db.twats = (database.getCollection('twats') === null) ? database.addCollection('twats') : database.getCollection('twats');
}



function createTwat({username, userId, content, parentid = null}) {
    db.twats.insert({
        twatId: uuidv4(),
        username,
        userId, 
        timestamp: +new Date(),
        content,
        parentid
    })
}

function getTwatById(twatid, offset, limit) {
    return db.twats.chain()
        .find({ 'twatId': twatid })
        .simplesort('timestamp', true)
        .offset(offset)
        .limit(limit)
        .data();
}

function getTwatByUsername(username, offset, limit) {
    return db.twats.chain()
        .find({ 'username': username })
        .simplesort('timestamp', true)
        .offset(offset)
        .limit(limit)
        .data();
}

function getTwatByUsernames(usernames, offset, limit) {
    return db.twats.chain()
        .find({ 'username': { '$in': JSON.parse(usernames)} })
        .simplesort('timestamp', true)
        .offset(offset)
        .limit(limit)
        .data();
}

function getRecentTwats(offset, limit) {
    return db.twats.chain()
        .simplesort('timestamp', true)
        .offset(offset)
        .limit(limit)
        .data();
}

function getUUID() {
    return uuidv4();
}

module.exports = {
    getUUID,
    getRecentTwats,
    getTwatByUsername,
    getTwatByUsernames,
    getTwatById,
    createTwat,
    initDB
}