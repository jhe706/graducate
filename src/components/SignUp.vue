<template>
<!--Page 1-->
<v-form v-if="pageNumber === 1" ref="form" v-model="valid" lazy-validation>
    <h1 style="margin-top:10px; margin-bottom:20px">About You</h1>

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
                <v-select id="major-select" v-if="!isUndergrad()" v-model="degree.major" :items="ugradMajors" :rules="majorRules" label="Major during Undergrad" required></v-select>
                <v-select id="major-select" v-if="!isUndergrad()" v-model="degree.major" :items="gradMajors" :rules="majorRules" label="Current Major/Concentration" required></v-select>
                <v-select v-model="degree.concentration" :items="getConcentrations(degree.major)" label="Concentration" required></v-select>
                <button
            id="remove-btn"
            type="button"
            v-if="degrees.length > 1"
            class="material-icons"
            style="float:right"
            @click="removeDegree(degree)"
            >remove_circle</button>
            </li>
        </div>
    </ul>
    <!--Buttons-->
    <v-btn :disabled="!valid">Exit</v-btn>
    <v-btn :disabled="!valid">Back</v-btn>
    <v-btn :disabled="!valid" @click="next()">Next</v-btn>
</v-form>

<!--Page 2-->
<v-form v-else-if="pageNumber === 2" ref="form" v-model="valid" lazy-validation>
    <h1 style="margin-bottom:20px">Tell us more about yourself.</h1>

    <h3>Hometown:</h3>
    <v-text-field v-model="hometown.city" label="City" class="margins" style="float:left"></v-text-field>
    <v-select :items="states" v-model="hometown.state" label="State (if in US)" class="margins" style="float:left"></v-select>
    <v-select :items="countries" v-model="hometown.country" label="Country" class="margins"></v-select>

    <h3>Interests:</h3>
    <!--TODO: snaz it up-->
    <v-select :items="interests" v-model="interests" label="Interests" class="margins"></v-select>

    <h3>Advice:</h3>
    <h4>What advice are you looking for from a grad student?</h4>
    <v-layout row wrap>
        <v-flex xs12 sm4 md4>
            <v-checkbox v-model="advice" :label="advice[0]" color="red" value="red" hide-details></v-checkbox>
            <v-checkbox v-model="advice" :label="advice[1]" color="red darken-3" value="red darken-3" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4 md4>
            <v-checkbox v-model="advice" :label="advice[2]" color="indigo" value="indigo" hide-details></v-checkbox>
            <v-checkbox v-model="advice" :label="advice[3]" color="indigo darken-3" value="indigo darken-3" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4 md4>
            <v-checkbox v-model="advice" :label="advice[4]" color="orange" value="orange" hide-details></v-checkbox>
            <v-checkbox v-model="advice" :label="advice[5]" color="orange darken-3" value="orange darken-3" hide-details></v-checkbox>
        </v-flex>
    </v-layout>

    <!--Buttons-->
    <v-btn class="margins-top" :disabled="!valid">Exit</v-btn>
    <!--TODO: Turn into X, upper R hand corner-->
    <v-btn :disabled="!valid">Back</v-btn>
    <v-btn class="margins.top" :disabled="!valid" @click="next()">Next</v-btn>
</v-form>

<!--Page 3-->
<v-form v-else-if="pageNumber === 3" ref="form" v-model="valid" lazy-validation>
    <h1 style="margin-bottom:20px">You're almost done!</h1>

    <v-flex>
        <v-textarea solo name="input-7-4" value="What makes you awesome?" v-model="bio"></v-textarea>
    </v-flex>

    <!--Buttons-->
    <v-btn class="margins-top" :disabled="!valid">Exit</v-btn>
    <v-btn :disabled="!valid">Back</v-btn>
    <v-btn :disabled="!valid" @click="registerUser()">Register</v-btn>
</v-form>
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
    components: {
        // App,
        // Profile
    },
    computed: {

    },
    created() {
        setTimeout(() => {
            this.degree.major = this.degree.major;
            // this.setLocale = this.fetchedLocale;
        }, 500);
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
            emailRules: [
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
            ugradMajors: undergradMajors,
            gradMajors: gradMajors,
            status: "Undergraduate",
            statuses: ["Undergraduate", "Graduate"],
            degreeTypes: ["BA", "BS", "BEng", "MD", "JD", "PhD"],
            gradYears: ["Before 2015", 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, "Beyond 2022"],
            gradYear: "2021",
            schools: ["Trinity", "Pratt", "Law", "Sanford", "Nicholas School", "Fuqua"],
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
            advice: advice,
            // bio: bio,
            degrees: [{
                id: 1,
                type: null,
                school: null,
                major: null,
                concentration: null
            }],
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
            this.pageNumber += 1;
        },
        registerUser() {
            const uuid = require("uuid/v4");
            let myUuid = uuid();
            this.uuid = myUuid;

            // TODO: parse selected interests
            let selectedInterests = null;

            // TODO: parse selected advice
            let selectedAdvice = null;

            let newUser = {
                uuid: myUuid,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                status: this.status,
                gradYear: this.gradYear,
                degrees: this.degrees,
                hometown: {
                    city: this.hometown.city,
                    state: this.hometown.state,
                    country: this.hometown.country
                },
                interests: selectedInterests,
                advice: selectedAdvice,
                bio: this.bio,
                gradYear: null
            };

            // equivalent to signing in automatically
            this.setUser(newUser);

            if (this.$refs.form.validate()) {
                db.ref('users/' + myUuid).set(newUser)
            }
        },
        clear() {
            this.$refs.form.reset();
        },
        isUndergrad() {
            return this.status === "Undergraduate";
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

            // if (this.status === "Undergraduate") {
            //     for (let m in undergradMajors) {
            //         console.log("key ", undergradMajors[m].key);
            //         majorsList.push(undergradMajors[m].key);
            //     }
            // } else {

            // }

            return majorsList;
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
            console.log("My major is ", major);
            let forEach = require('lodash.foreach');
            forEach(undergradMajors2, function (value, key) {
                if (key === major) {
                    c = value.concentrations;
                    return c;                               
                }
            });
            return c;
        }
    },
    props: ['setUser', 'user']
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
