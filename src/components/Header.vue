<template>
<v-toolbar app color="green lighten-1">
    <h1>graducate</h1>
    <!-- <authentication class="z nav navbar-nav navbar-right">
            </authentication> -->
    <ul>
        <!-- <li v-if="isSignedIn" style="color: white; font-size: 18px; font-weight: bold;">Hi, {{user.name}}!</li> -->
        <v-btn @click="getUser"><a><span class="glyphicon glyphicon-log-out"></span>Get User Details</a></v-btn>
        <v-btn @click="showProfile"><a><span class="glyphicon glyphicon-log-out"></span>Create Profile</a></v-btn>
        <v-btn @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></v-btn>
        <v-btn @click="signIn"><a><span class="glyphicon glyphicon-user right-justify"></span>Sign In</a></v-btn>
        <!-- sign in "popup" container does not popup for email authentication, so provide some styling help -->
        <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
    </ul>
</v-toolbar>
</template>

<script>
import Authentication from "../components/Authentication";
export default {
    name: 'Header',
    data() {

    },
    components: {
        Authentication
    }
}
</script>
