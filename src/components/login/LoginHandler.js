import * as firebase from "firebase/app";
import "firebase/auth";

const url = "https://colins-capstone-1558565262749.firebaseio.com/users.json";

const setUserInLocalStorage = user => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Register a new user with Firebase
export const registerWithFB = (email, password) => {
  return (
    firebase
      // use firebase's built in Auth function, and built in createuser function
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        return response.user.uid;
      })
  );
};

// When registering a new user, take the data entered into the form input fields and submit it to firebase for storage
export const saveUserToJsonServer = newUser => {
  return (
    // POST the user info, stored in the newUser object, to firebase.
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      // firebase returns a response. Turn that response into JSON
      .then(response => response.json())
      // To get the rest of the user's data that's stored in firebase, we need to fetch based on the user's specific ID
      .then(response => { return fetch(`https://colins-capstone-1558565262749.firebaseio.com/users/${response.name}.json`); })
      .then(r => r.json())
      // Take the response and create a new user object so we can later store that in local storage.
      .then(r => {
        let user = {
          email: r.email,
          username: r.username,
          id: r.id
        };
        return user;
      })
      // Take the new user object and store that in local storage for later access.
      .then(user => {
        setUserInLocalStorage(user);
        return user;
      })
  );
};

// take the data about the user that has been saved in local storage on login or register and return it for use elsewhere
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  // if there isn't a user in local storage, do nothing. if there is, return it in JSON format
  if (!user) return null;
  return JSON.parse(user);
};

// Get a specific user based on the parameter userId
export const getUser = userId => {
  return fetch(
    `https://colins-capstone-1558565262749.firebaseio.com/users/${userId}.json?&print=pretty`
  ).then(results => results.json());
};

// Logout, and on logout, clear the users info from local storage
export const logout = () => {
  localStorage.removeItem("user");
};

// Login existing users
export const login = (email, password) => {
  return (
    // use firebase's built in Auth function, and built in signin function
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // firebase returns a users data. This users Id is fed into a fetch call to fetch the rest of the users's info stored in firebase
      .then(user => {
        return fetch(`https://colins-capstone-1558565262749.firebaseio.com/users.json?orderBy="id"&equalTo="${user.user.uid}"&print=pretty`);
      })
      .then(results => results.json())
      // Take the results and use the following function to convert the firebase data structure to JSON type data
      .then(results => {
        const data = results;
        return Object.keys(data).map(key => {
          return { id: key, ...data[key] };
        });
      })
      //Take the results that have been formatted and build a new user object in order to later save in local storage
      .then(r => {
        let user = {
          email: r[0].email,
          username: r[0].username,
          id: r[0].id
        };
        return user;
      })
      // Then use the user object containing data and place in local storage for access later
      .then(user => {
        setUserInLocalStorage(user);
        return user;
      })
      .catch(error => {
        console.log(error.message);
        alert(`There was an error logging in. ${error.message}`);
      })
  );
};

// Register a new user
export const register = newUser => {
  // call the register with FB function located above
  return registerWithFB(newUser.email, newUser.password)
    // firebase inherently returns a userId. Take that, combine with other data and save that to the firebase data storage so you can have other user attributes like pwd, etc.
    .then(firebaseId => {
      newUser.password = "";
      newUser.id = firebaseId;
      return saveUserToJsonServer(newUser);
    })
    // if there is an error, throw this message
    .catch(error => {
      console.log(error.message);
      alert(`There was an error registering. ${error.message}`);
    });
};
