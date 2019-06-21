import * as firebase from "firebase/app";
import 'firebase/auth';

const url = 'http://localhost:8088/users';

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
        .then(newUser => {
            setUserInLocalStorage(newUser);
            return newUser;
        })
}

export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');

    if (!user) return null;

    return JSON.parse(user);
}

export const register = (newUser) => {
    return registerWithFB(newUser.email, newUser.password)
        .then(firebaseId => {
            newUser.password = ''
            newUser.id = firebaseId;
            return saveUserToJsonServer(newUser)
        })
        .then(newUserFromJsonServer => {
            setUserInLocalStorage(newUserFromJsonServer)
            return newUserFromJsonServer
        })
        .catch(error => {
            //finish later
        })
}

export const getUser = (userId) => {
    return fetch(`${url}/${userId}`)
        .then(res => res.json());
}

export const logout = () => {
    localStorage.removeItem('user');
}

export const registerWithFirebase = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {
            return data.user.uid
        })
}

export const loginWithFirebase = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(data => {
            return data.user.uid
        })
}

export const login = (email, password) => {
    return loginWithFirebase(email, password)
        .then(firebaseId => {
            return getUser(firebaseId);
        })
        .then(userFromJsonServer => {
            setUserInLocalStorage(userFromJsonServer)
            return userFromJsonServer;
        })
        .catch(error => {
            alert('There was a problem logging in.')
        });

}