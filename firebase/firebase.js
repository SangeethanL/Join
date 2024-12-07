// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, getDoc, updateDoc, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyA7dpq9d7eWERlOEf38HXo8C2KSxvVDYCM",

    authDomain: "join-4321.firebaseapp.com",

    projectId: "join-4321",

    storageBucket: "join-4321.appspot.com",

    messagingSenderId: "771189293963",

    appId: "1:771189293963:web:c4fc26821ad8f9caada58e"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function getUsersCol() {
    return collection(db, 'users');
}

function getSingleUser(docId) {
    return doc(getUsersCol(), docId);
}




window.currentUser = {};

window.importCurrentUser = async function importCurrentUser(paramet) {
    let user = getSingleUser(paramet);
    let getUser = await getDoc(user);
    if (getUser.exists()) {
        console.log("Document data:", getUser.data());
    } else {
        console.log("No such document!");
    }

    const secondUser = doc(db, "users", 'PLjxnTRloebSAMWA5p2K');

    // Set the "capital" field of the city 'DC'
    await updateDoc(secondUser, {
        name: 'SecondUser'
    });

    const newCityRef = doc(collection(db, "users"));
    let data = { name: 'HELLO' }

    await setDoc(newCityRef, data);

    /*
        let newData = { name: 'New User' };
        await setDoc(doc(db, "users", '123456789'), newData);*/
}





async function checkChanges(checkChange, unchanged) {
    if (checkChange == null) {
        return unchanged;
    } else {
        return checkChange;
    }
}

window.updateUser = async function updateUser(docId, name, password, rememberMe, window) {
    let user = await getSingleUser(docId);
    let getUser = await getDoc(user);

    let userData = getUser.data();

    let email = await checkChanges(docId, userData['email']);
    name = await checkChanges(name, userData['name']);
    password = await checkChanges(password, userData['password']);
    rememberMe = await checkChanges(rememberMe, userData['rememberMe']);
    window = await checkChanges(window, userData['disableWindow']);

    await updateDoc(user, dataTemplate(email, name, password, rememberMe, window));
}
















































window.checkUserExistence = async function checkUserExistence(docId, vari) {
    let user = getSingleUser(docId);
    let getUser = await getDoc(user);
    if (getUser.exists()) {
        return vari.push(true);
    }
}

function dataTemplate(email, name, password, rememberMe, window) {
    return {
        ['email']: email,
        ['name']: name,
        ['password']: password,
        ['rememberMe']: rememberMe,
        ['disableWindow']: window
    }
}

window.addUser_firebase = async function addUser_firebase(email, name, password, rememberMe, window) {
    const usersCollection = getSingleUser(email);
    let data = dataTemplate(email, name, password, rememberMe, window);

    await setDoc(usersCollection, data);
    await addSubCollection(email, 'tasks');
    await addSubCollection(email, 'contacts');
}

async function addSubCollection(email, subcollection) {
    if (subcollection == 'tasks') {
        for (let i = 0; i < tasks.length; i++) {
            let taskIdName = `${i + 1}`;
            tasks[i]['id'] = taskIdName;
            await setDoc((doc(collection(db, 'users', email, 'tasks'), `${taskIdName}`)), tasks[i]);
        }
    } else if (subcollection == 'contacts') {
        for (let i = 0; i < contacts.length; i++) {
            let contactIdName = `${i + 1}`;
            contacts[i]['id'] = contactIdName;
            await setDoc((doc(collection(db, 'users', email, 'contacts'), `${contactIdName}`)), contacts[i]);
        }
    }
}

window.getCurrentUser = async function getCurrentUser(paramet, arrayUser) {
    let user = getSingleUser(paramet);
    let getUser = await getDoc(user);
    if (getUser.exists()) {
        return arrayUser.push(getUser.data());
    }
}
















function getTaskCollection(email) {
    return collection(db, 'users', email, 'tasks');
}

window.updateTask_firebase = async function updateTask_firebase(email, taskIndex, task) {
    let taskInDB = doc(collection(db, 'users', email, 'tasks'), taskIndex)
    await updateDoc(taskInDB, task);
}

window.addTask_firebase = async function addTask_firebase(email, taskID, task) {
    let usersCollection = doc(collection(db, 'users', email, 'tasks'), `${taskID}`);
    await setDoc(usersCollection, task);
}

window.deleteTask_firebase = async function deleteTask_firebase(email, i) {
    let docRef = doc(collection(db, 'users', email, 'tasks'), `${i}`)
    await deleteDoc(docRef);
}







window.importUserTasks = async function importUserTasks(email) {
    let subColRef = getTaskCollection(email);
    onSnapshot(subColRef, (firebaseTasks) => {
        tasks = [];
        firebaseTasks.forEach(element => {
            tasks.push(element.data());
        });
    });
}











function getContactsCollection(email) {
    return collection(db, 'users', email, 'contacts');
}

window.updateContact_firebase = async function updateContact_firebase(email, contactIndex, contact) {
    let contactInDB = doc(collection(db, 'users', email, 'contacts'), `${contactIndex}`)
    await updateDoc(contactInDB, contact);
}

window.addContact_firebase = async function addContact_firebase(email, contactID, contact) {
    let usersCollection = doc(collection(db, 'users', email, 'contacts'), `${contactID}`);
    await setDoc(usersCollection, contact);
}

window.deleteContact_firebase = async function deleteContact_firebase(email, i) {
    let docRef = doc(collection(db, 'users', email, 'contacts'), `${i}`)
    await deleteDoc(docRef);
}




window.importUserContacts = async function importUserContacts(email) {
    let subColRef = getContactsCollection(email);
    onSnapshot(subColRef, (firebaseTasks) => {
        contacts = [];
        firebaseTasks.forEach(element => {
            contacts.push(element.data());
        });
        defineContactsIDs();
        setItem();
        setItemLoginDatas();
        location.href = 'summary.html';
    });
}

window.checkContactExistence = async function checkContactExistence(email, contact, array) {
    let contactCol = doc(collection(db, 'users', email, 'contacts'), contact);
    let getContact = await getDoc(contactCol);
    if (getContact.exists()) {
        return array.push(true);
    }
}
























































/*export function getAllUsers() {
    importAllUsers();
}*/









/*// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

 apiKey: "AIzaSyA7dpq9d7eWERlOEf38HXo8C2KSxvVDYCM",

 authDomain: "join-4321.firebaseapp.com",

 projectId: "join-4321",

 storageBucket: "join-4321.appspot.com",

 messagingSenderId: "771189293963",

 appId: "1:771189293963:web:c4fc26821ad8f9caada58e"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);*/