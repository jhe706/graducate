<template>
<v-toolbar app color="green lighten-1">
    <h1>graducate</h1>
    <ul>
        <!-- <li v-if="isSignedIn" style="color: white; font-size: 18px; font-weight: bold;">Hi, {{user.name}}!</li> -->
        <v-btn><a><span class="glyphicon glyphicon-log-out"></span>Get User Details</a></v-btn>
        <v-btn @click="showProfile"><a><span class="glyphicon glyphicon-log-out"></span>Create Profile</a></v-btn>
        <v-btn @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></v-btn>
        <v-btn @click="signIn"><a><span class="glyphicon glyphicon-user right-justify"></span>Sign In</a></v-btn>
        <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
    </ul>
</v-toolbar>
</template>

<script>
import SignIn from "../components/SignIn";
export default {
    name: 'Header',
    data() {

    },
    components: {
        SignIn
    }
}
</script>
