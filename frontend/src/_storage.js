let localStorage;
let UUID = "";
let username = "";
let following = [];

export function getUUID() {
    localStorage = window.localStorage;
    UUID = localStorage.getItem('UUID');
    return UUID;
}

export function storeUUID(uuid) {
    localStorage = window.localStorage;
    localStorage.setItem('UUID', uuid);
    UUID = uuid;
}

export function getUsername() {
    localStorage = window.localStorage;
    username = localStorage.getItem(UUID);
    return username;
}

export function storeUsername(username) {
    localStorage = window.localStorage;
    localStorage.setItem(UUID, username);
}

export function getFollowing() {
    localStorage = window.localStorage;
    let storageItem = localStorage.getItem(`${UUID}follows`);
    if (storageItem) {
        following = JSON.parse(storageItem);
    }
    return following;
}


export function storeFollowing(usernames) {
    localStorage = window.localStorage;
    localStorage.setItem(`${UUID}follows`, JSON.stringify(usernames));
    following = usernames;
}

export async function initUUID() {
    let userId = getUUID();
    console.log('userId', userId);
    if (!!userId) {
        username = getUsername();
        return userId;
    } else {
        let res = await fetch(`http://localhost:3030/getUUID`)
        let uuidRes = await res.json();
        storeUUID(uuidRes.id);
        return uuidRes.id;
    }
}