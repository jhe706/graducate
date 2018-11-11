<template>
<!--Page 1-->
<v-form v-if="pageNumber === 1" ref="form" v-model="valid" lazy-validation>
    <div style="margin-bottom: 20px">
    <h1 style="margin-top:10px; margin-bottom:20px">Let's make your profile.</h1>
    <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
    </div>

    <v-text-field v-model="firstName" :rules="nameRules" :counter="30" label="First name" required class="margins" style="float:left"></v-text-field>
    <v-text-field v-model="lastName" :rules="nameRules" :counter="30" label="Last name" required class="margins" style="float:left"></v-text-field>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required class="margins"></v-text-field>
    <v-text-field v-model="phoneNumber" :rules="phoneNumberRules" label="Phone number" required class="margins"></v-text-field>

    <!--Select under/grad status first-->
    <v-radio-group v-model="status" class="margins">
        <v-radio v-for="status in statuses" :key="status" :label="status" :value="status"></v-radio>
    </v-radio-group>
    <div id="graduation-header">
        <h3 style="float:right">Graduation Year:</h3>
        <v-select v-model="gradYear" :items="gradYears" label="Graduation year" class="margins"></v-select>
    </div>

    <!--Majors drop-down list changes based on under/grad status-->
    <div id="degree-header">
        <h3>Degree:</h3>
        <button
            id="add-btn"
            type="button"
            class="material-icons"
            style="float:right"
            @click="addDegree(degree)"
        >add_circle</button>
    </div>
    <ul>
        <div id="degree-item">
            <li v-for="degree in degrees" :key="degree.id">
                <v-select :items="degreeTypes" v-model="degree.type" label="Degree type" style="float:left" class="margins"></v-select>
                <v-select :items="schools" v-model="school" label="School" class="margins"></v-select>
                <v-select id="major-select" v-if="isUndergrad()" v-model="degree.major" :items="ugradMajors" :rules="majorRules" label="Major"></v-select>
                <v-select id="major-select" v-if="!isUndergrad()" v-model="degree.previousMajor" :items="ugradMajors" :rules="majorRules" label="Major during Undergrad" required></v-select>
                <v-select id="major-select" v-if="!isUndergrad()" v-model="degree.major" :items="gradMajors" :rules="majorRules" label="Current major" required></v-select>
                <v-select v-model="degree.concentration" :items="getConcentrations(degree.major)" label="Concentration" required></v-select>
                <button
                    id="remove-btn"
                    type="button"
                    v-if="degrees.length > 1"
                    class="material-icons"
                    style="float:right"
                    @click="removeDegree(degree)"
                    >remove_circle
                </button>
            </li>
        </div>
    </ul>
    <!--Buttons-->
    <v-btn :disabled="!valid" @click="back()">Back</v-btn>
    <v-btn :disabled="!valid" @click="next()">Next</v-btn>
</v-form>

<!--Page 2-->
<v-form v-else-if="pageNumber === 2" ref="form" v-model="valid" lazy-validation>
    <!-- <h1 style="margin-bottom:20px">Tell us more about yourself.</h1> -->

    <h3>Hometown:</h3>
    <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
    <v-text-field v-model="hometown.city" label="City" class="margins" style="float:left"></v-text-field>
    <v-select :items="states" v-model="hometown.state" label="State (if in US)" class="margins" style="float:left"></v-select>
    <v-select :items="countries" v-model="hometown.country" label="Country" class="margins"></v-select>

    <h3>Interests:</h3>
    <v-layout row wrap>
        <v-flex xs12 sm3 md3>
            <v-checkbox v-model="selectedInterests" :label="interests[0]" color="green lighten-1" :value="interests[0]" hide-details></v-checkbox>
            <v-checkbox v-model="selectedInterests" :label="interests[1]" color="green lighten-1" :value="interests[1]" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm3 md3>
            <v-checkbox v-model="selectedInterests" :label="interests[2]" color="green lighten-1" :value="interests[2]" hide-details></v-checkbox>
            <v-checkbox v-model="selectedInterests" :label="interests[3]" color="green lighten-1" :value="interests[3]" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm3 md3>
            <v-checkbox v-model="selectedInterests" :label="interests[4]" color="green lighten-1" :value="interests[4]" hide-details></v-checkbox>
            <v-checkbox v-model="selectedInterests" :label="interests[5]" color="green lighten-1" :value="interests[5]" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm3 md3>
            <v-checkbox v-model="selectedInterests" :label="interests[6]" color="green lighten-1" :value="interests[6]" hide-details></v-checkbox>
            <v-checkbox v-model="selectedInterests" :label="interests[7]" color="green lighten-1" :value="interests[7]" hide-details></v-checkbox>
        </v-flex>
    </v-layout>

    <h3>Advice:</h3>
    <h4 v-if="isUndergrad()">What are you looking for?</h4>
    <h4 v-else>What advice can you offer?</h4>
    <v-layout row wrap>
        <v-flex xs12 sm4 md4>
            <v-checkbox v-model="selectedAdvice" :label="advice[0]" color="green lighten-1" :value="advice[0]" hide-details></v-checkbox>
            <v-checkbox v-model="selectedAdvice" :label="advice[1]" color="green lighten-1" :value="advice[1]" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4 md4>
            <v-checkbox v-model="selectedAdvice" :label="advice[2]" color="green lighten-1" :value="advice[2]" hide-details></v-checkbox>
            <v-checkbox v-model="selectedAdvice" :label="advice[3]" color="green lighten-1" :value="advice[3]" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4 md4>
            <v-checkbox v-model="selectedAdvice" :label="advice[4]" color="green lighten-1" :value="advice[4]" hide-details></v-checkbox>
            <v-checkbox v-model="selectedAdvice" :label="advice[5]" color="green lighten-1" :value="advice[5]" hide-details></v-checkbox>
        </v-flex>
    </v-layout>

    <!--Buttons-->
    <v-btn :disabled="!valid" @click="back()">Back</v-btn>
    <v-btn class="margins.top" :disabled="!valid" @click="next()">Next</v-btn>
</v-form>

<!--Page 3-->
<v-form v-else-if="pageNumber === 3" ref="form" v-model="valid" lazy-validation>
    <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
    <h1 style="margin-bottom:20px">Tell us a little about yourself.</h1>

    <v-flex>
        <v-textarea :value="bio" solo name="input-7-4" v-model="bio" :rules="bioRules"></v-textarea>
    </v-flex>

    <!--Buttons-->
    <v-btn :disabled="!valid" @click="back()">Back</v-btn>
    <v-btn :disabled="!valid" @click="registerUser()">Register</v-btn>
</v-form>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Firebase from "firebase";
import {
    db,
    userRef,
    matchesRef,
    majorsRef
} from "../database";

import {
    undergradMajors,
    gradMajors,
    undergradMajors2,
    gradMajors2
} from "../assets/areasOfStudy.js";
import {
    states,
    countries
} from "../assets/locations.js";
import {
    interests,
    advice
} from "../assets/interests.js";

export default {
    name: "SignUp",
    components: {},
    computed: {

    },
    data() {
        return {
            valid: true,
            firstName: "",
            lastName: "",
            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length <= 15) || "Name must be less than 15 characters"
            ],
            email: "",
            emailRules: [                               // TODO: no repeated emails (used for sign in)
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
            degree: {
                degree: "",
                major: "",
                concentration: ""
            },
            majorRules: [
                v => !!v || 'Major is required'
            ],
            phoneNumberRules: [
                v => !!v || "Phone number is required",
                v => (v && v.length > 9) || "Phone number must be valid"
            ],
            bioRules: [
                v => !!v || "Bio is required",
                v => (v && v.length <= 300) || "Enter up to 300 characters"
            ],
            ugradMajors: undergradMajors,
            gradMajors: gradMajors,
            status: "Undergraduate",
            statuses: ["Undergraduate", "Graduate"],
            degreeTypes: ["BA", "BS", "BEng", "JD", "MD", "MS", "PhD"],
            gradYears: ["Before 2015", 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, "Beyond 2022"],
            gradYear: "2021",
            school: null,
            schools: ["Trinity", "Pratt", "Law", "Sanford", "Nicholas School", "Fuqua", "Medical School"],
            pageNumber: 1,
            lastPage: false,
            hometown: {
                city: "",
                state: "",
                country: ""
            },
            states: states,
            countries: countries,
            interests: interests,
            selectedInterests: [],
            advice: advice,
            selectedAdvice: [],
            bio: null,
            degrees: 
            [
                {
                    id: 1,
                    type: null,
                    major: null,
                    previousMajor: null,    // applies only to grads
                    concentration: null
                }
            ],
            uuid: "",
            newUser: null
        };
    },
    firebase: {
        users: userRef,
        matches: matchesRef,
        majors: majorsRef
    },
    methods: {
        next() {
            if (this.pageNumber < 3){
                this.pageNumber += 1;
            } else {
                this.pageNumber = 1;
            }
        },

        exit(){
            console.log("here");
            this.graphics();
        },

        back(){
            console.log(this.pageNumber);
            if (this.pageNumber > 1){
                this.pageNumber--;
            }
            else {
                this.graphics();        // go back to home screen
            }
        },

        registerUser() {
            const uuid = require("uuid/v4");
            let myUuid = uuid();
            this.uuid = myUuid;

            let newUser = {
                uuid: myUuid,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                status: this.status,
                gradYear: this.gradYear,
                degrees: this.degrees,
                hometown: this.hometown,
                interests: this.selectedInterests,
                advice: this.selectedAdvice,
                bio: this.bio,
            };

            // equivalent to signing in automatically
            this.setUser(newUser);

            if (this.$refs.form.validate()) {
                userRef.child(myUuid).set(newUser);
            }

            console.log("calculating matches...");
            this.calculateMatches(newUser);
        },

        clear() {
            this.$refs.form.reset();
        },

        isUndergrad() {
            return this.status === "Undergraduate";
        },

        addDegree() {
            let newDegree = {
                id: this.degrees.length + 1,
                type: null,
                major: null,
                concentration: null
            }
            this.$set(this.degrees, this.degrees.length, newDegree);
        },

        removeDegree(degree) {
            this.degrees.splice(degree.key, 1);
        },

        getConcentrations(major) {
            let c = "N/A";
            let forEach = require('lodash.foreach');
            forEach(undergradMajors2, function (value, key) {
                if (key === major) {
                    c = value.concentrations;
                    return c;
                }
            });
            return c;
        },

        calculateMatches(user) {
            let uuid = user.uuid;                          
            let matchMap = new Map();

            let users = null;
            userRef.on('value', function (snapshot) {
                users = snapshot.val();
            });

            let matches = [];
            for (let u in users) {
                console.log("User ", users[u]);
                let score = this.matchScore(this.currentUser, users[u]);        // obtain match score against logged in user
                console.log("Match score: ", score);
                if (score > 65) {
                    matches.push(users[u].uuid);
                }
            }

            // set final values in map and DB table
            matchMap.set(this.currentUser.uuid, matches);
            let myMatches = matchMap.get(uuid) ? matchMap.get(uuid) : [];      // should return list of match uuids
            matchesRef(uuid).set(myMatches);
            console.log("User's matches: ", myMatches);
            
            return myMatches;                                                   // return array of current user's match ids
        },

        matchScore(u1, u2) {
            let rawScore = 0;
            let adviceScore = 0;
            let degreeScore = 0;
            let interestsScore = 0;
            let concentrationScore = 0;
            let hometownScore = 0;

            // advice
            let intersection = u1.advice.filter(value => -1 !== u2.advice.indexOf(value));
            adviceScore = intersection.length * 6.67;

            // degree
            if (u1.school === u2.school) {
                degreeScore += 5;
            }
            let forEach = require('lodash.foreach');
            let u1Majors = [];
            let u2Majors = [];
            let u1Concentrations = [];
            let u2Concentrations = [];
            forEach(u1.degrees, function (degree, key) {
                if (u1.status === "Undergraduate") {
                    console.log("My major: ", degree.major);
                    u1Majors.push(degree.major);
                } else {
                    console.log("My prev major: ", degree.previousMajor);
                    u1Majors.push(degree.previousMajor);
                }
                u1Concentrations.push(degree.concentration);
            });
            forEach(u2.degrees, function (degree, id) {         // TODO: change from id to key    
                if (u2.status === "Undergraduate") {
                    console.log("Their major: ", degree.major);
                    u2Majors.push(degree.major);
                } else {
                    console.log("Their prev major: ", degree.previousMajor);
                    u2Majors.push(degree.previousMajor);
                }
                u2Concentrations.push(degree.concentration);
            });

            intersection = u1Majors.filter(value => -1 !== u2Majors.indexOf(value));
            degreeScore += intersection.length * 20;
            intersection = u1Concentrations.filter(value => -1 !== u2Concentrations.indexOf(value));
            degreeScore += intersection.length * 10;
            console.log("degreeScore ", degreeScore);

            // interests
            intersection = u1.interests.filter(value => -1 !== u2.interests.indexOf(value));
            interestsScore = intersection.length * 2;
            console.log("interestsScore ", interestsScore);

            // hometown
            if (u1.hometown.country === u2.hometown.country) {
                hometownScore += 5;
            }
            if (u1.hometown.state && u2.hometown.state && (u1.hometown.state === u2.hometown.state)) {
                hometownScore += 2.5;
                if (u1.hometown.city === u2.hometown.city) {
                    hometownScore += 2.5;
                }
            } else {
                if (u1.hometown.city === u2.hometown.city) {
                    hometownScore += 5;
                }
            }
            console.log("hometownScore ", hometownScore);

            rawScore = 2 * (adviceScore + degreeScore + interestsScore + hometownScore);
            console.log("raw match score ", rawScore);

            return Math.min(rawScore, 100);
        }
    },
    props: ['setUser', 'user', 'graphics']
};
</script>

<style>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.margins {
    margin: auto 20px
}

.margins-top {
    margin-top: 50px;
}

#degree-header,
#graduation-header {
    display: flex;
    margin: auto 20px;
    justify-content: space-between;
    align-items: center;
}

#degree-item {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}

#degree-item #major-select .v-select {
    flex-grow: 2
}

#degree-item li {
    display: flex;
    width: 100%;
    margin-right: 20px;
}
</style>
