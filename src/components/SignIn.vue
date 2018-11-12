<template>
<v-form>
    <h1 style="margin-top:10px; margin-bottom:20px">Sign in to your account.</h1>
    <v-text-field v-model="email" label="Email" :rules="emailRules" required class="margins" style="float:left"></v-text-field>
    <v-btn @click="exit()">Exit</v-btn>
    <v-btn @click="submit()">Submit</v-btn>
</v-form>
</template>

<script>
/* eslint-disable */
import {
    userRef
} from "../database";
export default {
    name: "SignIn",
    data() {
        return {
            email: "",
            emailRules: [
                v => !!v || "Email is required",
                v => /.+@.+/.test(v) || "E-mail must be valid",
                v => this.existingEmail(v) || "We could not find an account with this email."
            ]
        }
    },
    props: ['user', 'setUser', 'showLogin', 'profile', 'graphics', 'home'],
    methods: {
        getUsers() {
            let users = null;

            userRef.on('value', function (snapshot) {
                users = snapshot.val();
            });

            return users;
        },

        submit() {
            let myAccount = null;
            let users = this.getUsers();

            for (let user in users) {
                if (users[user].email === this.email) {
                    myAccount = users[String(user)];
                }
            }

            this.home();
            this.setUser(myAccount);

        },

        exit() {
            this.graphics();
        },

        existingEmail(v) {
            let users = this.getUsers();
            for (let user in users) {
                if (users[user].email === v) {
                    return true;
                }
            };
            return false;
        }
    }
}
</script>
