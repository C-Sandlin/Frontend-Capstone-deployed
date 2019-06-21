import { getUserFromLocalStorage } from '../login/LoginHandler'

import APIkey from "./hiddenKey"
import { appId, appCode } from "./hiddenKey"
const db = "http://localhost:8088"

let thisUser = getUserFromLocalStorage()

let currentUser = (thisUser) ? (thisUser.id) : ("")


const API = {
    googleMaps: () => {
        // CORB ERROR
        return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.132930, -86.756625&radius=24140.2&keyword=counselor&key=${APIkey}`)
            .then(w => w.json())
    },
    getAllMoods: () => {
        return fetch(`${db}/moods?_expand=moodCategory`)
            .then(results => results.json())
    },
    getSpecificMood: (id) => {
        return fetch(`${db}/moods?moodCategoryId=${id}`)
            .then(results => results.json())
    },
    submitEntry: (obj) => {
        return fetch(`${db}/loggedEntries`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(e => e.json())
    },
    getSpecificCopingMech: (id) => {
        return fetch(`${db}/copingMechanisms?moodCategoryId=${id}&userId=${currentUser}`)
            .then(results => results.json())
    },
    getAllCopingMechs: () => {
        return fetch(`${db}/copingMechanisms?userId=${currentUser}`)
            .then(results => results.json())
    },
    editCopingMech: (entryId, entryObj) => {
        return fetch(`${db}/copingMechanisms/${entryId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryObj)
        }).then(response => response.json())
    },
    submitMech: (obj) => {
        return fetch(`${db}/copingMechanisms`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(e => e.json())
    },
    deleteMech: (id) => {
        return fetch(`${db}/copingMechanisms/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json())
    },
    getAllEntries: () => {
        return fetch(`${db}/loggedEntries?userId=${currentUser}&_expand=moodCategory`)
            .then(results => results.json())
    },
    hereMaps: () => {
        return fetch(`https://places.demo.api.here.com/places/v1/discover/search?at=36.1373%2C-86.7557&q=mental%20health&size=20&app_id=${appId}&app_code=${appCode}`)
            .then(results => results.json())
    },
    getSpecificEntryCategory: (value) => {
        return fetch(`${db}/loggedEntries/?userId=${currentUser}&moodCategoryId=${value}`)
            .then(results => results.json())
    },
    getLast5Entries: () => {
        return fetch(`${db}/loggedEntries/?userId=${currentUser}&_sort=dateLogged&_order=desc&_limit=5`)
            .then(results => results.json())
    },
    sendEmail: (obj) => {
        return fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        // .then(e => e.json())
    }
}

export default API;