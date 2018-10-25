import Firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCYGRRVUCKig6vPGq247ADDZLnxOjQ8UIE",
	authDomain: "grunch-c487c.firebaseapp.com",
	databaseURL: "https://grunch-c487c.firebaseio.com",
	projectId: "grunch-c487c",
	storageBucket: "grunch-c487c.appspot.com",
	messagingSenderId: "361849913325"
};
var app = Firebase.initializeApp(config);
export const db = app.database();
export const userRef = db.ref('users');
export const matchesRef = db.ref('matches');
// TODO: add more tables
export const storageRef = app.storage().ref();