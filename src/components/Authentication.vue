<template>
<div>
    <ul>
        <!-- <li v-if="isSignedIn" style="color: white; font-size: 18px; font-weight: bold;">Hi, {{user.name}}!</li> -->
        <v-btn @click="getUser"><a><span class="glyphicon glyphicon-log-out"></span>Get User Details</a></v-btn>
        <v-btn @click="showProfile"><a><span class="glyphicon glyphicon-log-out"></span>Create Profile</a></v-btn>
        <v-btn @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></v-btn>
        <v-btn @click="signIn"><a><span class="glyphicon glyphicon-user right-justify"></span>Sign In</a></v-btn>
        <!-- sign in "popup" container does not popup for email authentication, so provide some styling help -->
        <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
    </ul>
</div>
</template>

<script>
import Firebase from 'firebase';
import FirebaseUI from 'firebaseui';
var authUI = new FirebaseUI.auth.AuthUI(Firebase.auth()); // single instance of popup credentials UI
import {
    userRef
} from '../database';


export default {
    name: 'Authentication',
    data() {
        return {
            user: userRef
        }
    },
    computed: {

    },
    methods: {
        isSignedIn() { // TODO: change to prop or computed

        },
        showProfile() {

        },
        signIn() {
            console.log("Sign in: ");
        },
        signOut() {
            console.log("Sign out: ");
		},
		getUser(){
			// userRef.on('value', function (snapshot) {
            //     var jsonData = snapshot.val();
			// 	// console.log(jsonData);
			// 	for (let user in jsonData){
			// 		console.log("My name is ", jsonData[user].firstName);
			// 	}
			// });
		}
    },
    firebase: {
        user: userRef
    }
}
</script>

<style>
.right-justify {
    float: right;
}
</style>
