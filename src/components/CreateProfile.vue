<template>
<v-card>
    <!--Form fields-->
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="firstName" :rules="nameRules" :counter="20" label="First name" required></v-text-field>
        <v-text-field v-model="lastName" :rules="nameRules" :counter="20" label="Last name" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <!--Select under/grad status first-->
        <v-radio-group v-model="selectedStatus">
            <v-radio v-for="status in statuses" :key="status" :label="status" :value="status"></v-radio>
            <p>{{selectedStatus}}</p>
        </v-radio-group>

        <!--Majors drop-down list changes based on under/grad status-->
        <v-btn @click="getMajors()">Click for Majors</v-btn>
        <v-select v-if="isUndergrad()" v-model="selectedMajor" :items="ugradMajors" :rules="[v => !!v || 'Major is required']" label="Major" required></v-select>
        <v-select v-else v-model="selectedMajor" :items="gradMajors" :rules="[v => !!v || 'Major is required']" label="Major" required></v-select>
        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

        <v-btn :disabled="!valid" @click="submit">
            submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
</v-card>
</template>

<script>
import Vue from "vue";
import Firebase from "firebase";
import {
    db,
    userRef,
    matchesRef,
    majorsRef
} from "../database";
import Profile from "./Profile";
import App from "../App";
import {
    undergradMajors,
    gradMajors
} from "../assets/areasOfStudy.js";
import * as Study from "../assets/areasOfStudy.json"; // or require

export default {
    name: "CreateProfile",
    components: {
        App,
        Profile
    },
    data() { // TIED TO V-MODEL
        return {
            valid: true,
            firstName: "",
            lastName: "",
            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length <= 15) || "Name must be less than 15 characters"
            ],
            email: "",
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
            selectedMajor: null,
            // items: ["Item 1", "Item 2", "Item 3", "Item 4"],
            ugradMajors: undergradMajors,
            gradMajors: gradMajors,
            checkbox: false,
            radioGroup: 1,
            selectedStatus: "Undergraduate",
            statuses: ["Undergraduate", "Graduate"],
            userRef: null
        };
    },
    firebase: {
        users: userRef,
        matches: matchesRef,
        majors: majorsRef
    },
    methods: {
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
        // axios.post("/api/submit", {     
        //     name: this.name,
        //     email: this.email,
        //     select: this.select,
        //     checkbox: this.checkbox
        // });

        // TODO: post method, aka submit
        submit() {
            const uuid = require("uuid/v4");

            // TODO: do we need to define all data in v-model
            if (this.$refs.form.validate()) { 
                db.ref('users/' + uuid).set({
                    uuid: uuid,
                    school: null,
                    hometown: null,
                    tags: null,
                    adviceGiven: null,
                    adviceNeeded: null,
                    bio: null,
                    firstName: firstName,
                    lastName: lastName,
                    status: selectedStatus,
                    degree: {
                        degree: null,
                        major: selectedMajor,
                        concentration: null
                    },
                    email: email,
                    phoneNumber: null,
                    gradYear: null
                })
            }
        },
        clear() {
            this.$refs.form.reset();
        },
        isUndergrad() {
            return this.selectedStatus === "Undergraduate";
        },
        getMajors() {
            console.log("here");
            // TODO: add concentrations
            let undergradMajors = [
                "Asian and Middle Eastern Studies", "Biology", "Chemistry",
                "Computer Science", "Economics", "Entrepreneurship", "Psychology",
                "Pre-Medicine", "Pre-Law", "Pre-Vet", "Other"
            ];

            let gradMajors = [
                "Law", "Medicine", "Veterinary", "Research", "Other"
            ];

            let majors = null;

            majorsRef.on('value', function (snapshot) {
                majors = snapshot.val();
            });

            // for (let m in undergradMajors) {
            // let x = undergradMajors[1];
            console.log(majors.undergradMajors[1].concentrations);
            //}

            // let gradMajors = majors["undergradMajors"];
            // console.log(gradMajors);
            // let undergradMajors = majors["undergradMajors"];
            // let majorsList = [];

            // if (this.selectedStatus === "Undergraduate") {
            //     for (let m in undergradMajors) {
            //         console.log("key ", undergradMajors[m].key);
            //         majorsList.push(undergradMajors[m].key);
            //     }
            // } else {

            // }

            return majorsList;
        }
    },
    props: {}
};
</script>
