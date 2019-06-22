import { getUserFromLocalStorage } from '../login/LoginHandler'
import { appId, appCode } from "./hiddenKey";

const db = "http://localhost:8088"
const fb = "https://colins-capstone-1558565262749.firebaseio.com"


let thisUser = getUserFromLocalStorage()
let currentUser = (thisUser) ? (thisUser.id) : ("")


const API = {
    getAllMoods: () => {
        return fetch(`${db}/moods?_expand=moodCategory`)
            .then(results => results.json())
    },
    // working
    getSpecificMood: (id) => {
        return fetch(`${fb}/moods.json?orderBy="moodCategoryId"&startAt=${id}&endAt=${id}`)
            .then(results => results.json())
            .then(e => {
                const data = e
                return Object.keys(data).map(key => {
                    return { id: key, ...data[key] }
                })
            })
    },
    // working
    submitEntry: (obj) => {
        return fetch(`${fb}/loggedEntries.json`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(e => e.json())
    },
    // working
    getSpecificCopingMech: (id) => {
        return fetch(`${fb}/copingMechanisms.json?orderBy="moodCategoryId"&equalTo=${id}&print=pretty`)
            .then(results => results.json())
            .then(e => {
                const data = e
                return Object.keys(data).map(key => {
                    return { id: key, ...data[key] }
                })
            })
            .then(e => {
                let desiredResults = e.filter(item => item.userId === currentUser)
                return desiredResults;
            })
    },
    // working
    getAllCopingMechs: () => {
        return fetch(`${fb}/copingMechanisms.json?orderBy="userId"&equalTo="${currentUser}"&print=pretty`)
            .then(results => results.json())
            .then(e => {
                const data = e
                return Object.keys(data).map(key => {
                    return { id: key, ...data[key] }
                })
            })
    },

    // working
    editCopingMech: (entryId, entryObj) => {
        return fetch(`${fb}/copingMechanisms/${entryId}.json`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryObj)
        }).then(data => data.json());
    },

    // working
    submitMech: (obj) => {
        return fetch(`${fb}/copingMechanisms.json`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(e => e.json())
    },
    deleteMech: (id) => {
        return fetch(`${fb}/copingMechanisms/${id}.json`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json())
    },
    // working
    getAllEntries: () => {
        return fetch(`${fb}/loggedEntries.json?print=pretty`)
            .then(results => results.json())
            .then(e => {
                const data = e
                return Object.keys(data).map(key => {
                    return { id: key, ...data[key] }
                })
            })
            .then(e => {
                let desiredResults = e.filter(item => item.userId === currentUser)
                return desiredResults;
            })
    },
    // working
    hereMaps: () => {
        return fetch(`https://places.demo.api.here.com/places/v1/discover/search?at=36.1373%2C-86.7557&q=mental%20health&size=20&app_id=${appId}&app_code=${appCode}`)
            .then(results => results.json())
    },
    // working
    getSpecificEntryCategory: (value) => {
        return fetch(`${fb}/loggedEntries.json/?orderBy="moodCategoryId"&startAt=${value}&endAt=${value}`)
            .then(results => results.json())
            .then(e => {
                const data = e
                return Object.keys(data).map(key => {
                    return { id: key, ...data[key] }
                })
            })
            .then(e => {
                let desiredResults = e.filter(item => item.userId === currentUser)
                return desiredResults;
            })
    },
    getLast5Entries: () => {
        return fetch(`${db}/loggedEntries/?userId=${currentUser}&_sort=dateLogged&_order=desc&_limit=5`)
            .then(results => results.json())
    },
    // working
    sendEmail: (obj) => {
        return fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
    }
}

export default API;