<template>
<v-card class="signin">
    <v-form id="form">
        <h1 id="label">Sign in to your account.</h1>
        <v-text-field id="textfield" v-model="email" label="Email" :rules="emailRules" required class="margins"></v-text-field>
        <v-btn id="btn" @click="exit()">Exit</v-btn>
        <v-btn id="btn" @click="submit()">Submit</v-btn>
    </v-form>
</v-card>
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
    props: ['user', 'setUser', 'showLogin', 'profile', 'graphics', 'toggleProfile'],
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

            this.toggleProfile();
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

<style>
    .signin {
        height: 500px !important;
    }

    #form {
        padding: 10px;
    }

    #label {
        margin-top: 30px; 
        margin-bottom: 50px;
    }

    #textfield {
        margin-left: 15px;
    margin-bottom: 15px;
    }

    #btn {
        margin-top: 30px;
    }

</style>
