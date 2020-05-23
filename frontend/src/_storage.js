let localStorage;
let UUID = "";
let username = "";
let following = [];
import { backendURL } from './_beroute'

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

export function storeUsername(inputUsername) {
    localStorage = window.localStorage;

    if (inputUsername !== username) {
        localStorage.setItem(UUID, inputUsername);
        username = inputUsername
        const successEvent = new CustomEvent("usernameChanged", {});
        window.dispatchEvent(successEvent);
    }
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
    const successEvent = new CustomEvent("twatFollow", {});
    window.dispatchEvent(successEvent);
}

export async function initUUID() {
    let userId = getUUID();
    if (!!userId) {
        username = getUsername();
        return userId;
    } else {
        let res = await fetch(`${backendURL}getUUID`)
        let uuidRes = await res.json();
        storeUUID(uuidRes.id);
        return uuidRes.id;
    }
}