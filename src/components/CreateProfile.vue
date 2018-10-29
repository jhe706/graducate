<template>
<div>
    <v-btn v-bind:click="createProfile"><a><span class="glyphicon glyphicon-user right-justify"></span>Create Profile</a></v-btn>

    <!--Form fields-->
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :rules="nameRules" :counter="10" label="Name" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

		<!--Select under/grad status first-->
        <v-radio-group v-model="radioGroup">
            <v-radio v-for="status in statuses" :key="status" :label="status" :value="status"></v-radio>
        </v-radio-group>
        <!-- <v-text-field v-model="status" label="Undergrad or grad?" required></v-text-field> -->

        <!--Majors drop-down list changes based on under/grad status-->
        <v-select v-if="status === Undergraduate" v-model="select" :items="ugradMajors" :rules="[v => !!v || 'Major is required']" label="Major" required></v-select>
        <v-select v-else-if="status === Graduate" v-model="select" :items="gradMajors" :rules="[v => !!v || 'Major is required']" label="Major" required></v-select>
        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

        <v-btn :disabled="!valid" @click="submit">
            submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>

</div>
</template>

<script>
import Vue from "vue";
import Firebase from "firebase";
import {
    db,
    userRef,
    matchesRef
} from "../database";

import ProfileCard from "./ProfileCard";
var areasOfStudy = require("../areasOfStudy.js"); // TODO: check me

export default {
    name: "CreateProfile",
    components: {
        ProfileCard
    },
    data() { // TIED TO V-MODEL
        return {
            valid: true,
            name: "",
            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length <= 15) || "Name must be less than 15 characters"
            ],
            email: "",
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
            select: null,
            // items: ["Item 1", "Item 2", "Item 3", "Item 4"],
			ugradMajors: areasOfStudy.undergradMajors,		// TODO: ???
			gradMajors: areasOfStudy.gradMajors,
			checkbox: false,
			radioGroup: 1,
			statuses: ["Undergraduate, Graduate"]
        };
    },
    firebase: {
        user: userRef,
        matches: matchesRef
    },
    methods: {
        // any functionality defined specifically for this component
        createProfilePg1() {
            console.log("Hi");
            var profileData = {};
            var newProfileKey = Firebase.database()
                .ref()
                .child("users")
                .push().key;
            var updates = {};
            updates["/createprofile/" + newProfileKey] = profileData;

            return Firebase.database()
                .ref()
                .update(updates);
        },

        // taken from Vuetify form docs
        submit() {
            if (this.$refs.form.validate()) {
                axios.post("/api/submit", {
                    name: this.name,
                    email: this.email,
                    select: this.select,
                    checkbox: this.checkbox
                });
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    },
    props: {}
};
</script>
