import * as firebase from "firebase/app";
import 'firebase/auth';

const url = 'https://colins-capstone-1558565262749.firebaseio.com/users.json';

const setUserInLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const registerWithFB = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
            return response.user.uid
        })
}

export const saveUserToJsonServer = (newUser) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(r => {
            return fetch(`https://colins-capstone-1558565262749.firebaseio.com/users/${r.name}.json`)
        })
        .then(r => r.json())
        .then(r => {

            let user = {
                email: r.email,
                username: r.username,
                id: r.id
            }
            return user
        })
        .then(user => {
            setUserInLocalStorage(user);
            return user
        })

}

export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (!user) return null;

    console.log(user)
    return JSON.parse(user);
}

export const getUser = (userId) => {
    return fetch(`https://colins-capstone-1558565262749.firebaseio.com/users/${userId}.json?&print=pretty`)
        .then(results => results.json())
}

export const logout = () => {
    localStorage.removeItem('user');
}

export const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {

            return fetch(`https://colins-capstone-1558565262749.firebaseio.com/users.json?orderBy="id"&equalTo="${user.user.uid}"&print=pretty`)
        })
        .then(results => results.json())
        .then(e => {
            const data = e
            return Object.keys(data).map(key => {
                return { id: key, ...data[key] }
            })
        })
        .then(r => {

            let user = {
                email: r[0].email,
                username: r[0].username,
                id: r[0].id
            }
            return user
        })
        .then(user => {
            setUserInLocalStorage(user);
            return user
        })
}

export const register = (newUser) => {
    return registerWithFB(newUser.email, newUser.password)
        .then(firebaseId => {
            newUser.password = ''
            newUser.id = firebaseId;
            return saveUserToJsonServer(newUser)
        })
        .catch(error => {
            alert("there was an error registering.")
        })
}