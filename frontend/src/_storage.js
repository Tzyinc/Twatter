let localStorage;
let UUID = "";
let username = "";

export function getUUID() {
    localStorage = window.localStorage;
    console.log('getuuid called')
    UUID = localStorage.getItem('UUID');
    return UUID;
}

export function storeUUID(uuid) {
    localStorage = window.localStorage;
    localStorage.setItem('UUID', uuid);
}

export function getUsername() {
    localStorage = window.localStorage;
    console.log('getusername called')
    username = localStorage.getItem(UUID);
    return username;
}


export function storeUsername(username) {
    localStorage = window.localStorage;
    localStorage.setItem(UUID, username);
}
