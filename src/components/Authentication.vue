<template>
<div>
    <ul>
        <!-- <li v-if="isSignedIn" style="color: white; font-size: 18px; font-weight: bold;">Hi, {{user.name}}!</li> -->
        <v-btn><a><span class="glyphicon glyphicon-log-out"></span>Get User Details</a></v-btn>
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
        showProfile() {

        },
        signIn() {
            this.setUser(user);     // TODO: define user as populated JSON obj
        },
        signOut() {
            
		}
    },
    firebase: {
        user: userRef
    },
    props: ["user", "setUser"]
}
</script>

<style>
.right-justify {
    float: right;
}
</style>
