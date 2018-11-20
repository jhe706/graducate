<template>
<v-card class="signup">
<!--Page 1-->
<v-form v-if="pageNumber === 1" ref="form" v-model="valid" lazy-validation>
    <div style="margin-bottom: 20px">
        <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
        <h1 style="margin-top:10px; margin-bottom:20px">Let's make your profile.</h1>
    </div>

    <v-text-field v-model="firstName" :rules="nameRules" :counter="30" label="First name" required class="margins" id="float"></v-text-field>
    <v-text-field v-model="lastName" :rules="nameRules" :counter="30" label="Last name" required class="margins" id="float"></v-text-field>
    <v-text-field v-model="email" :rules="emailRules" label="Email" required class="margins"></v-text-field>
    <v-text-field v-model="phoneNumber" :rules="phoneNumberRules" label="Phone number" required class="margins"></v-text-field>
    
    <v-text-field v-model="hometown.city" label="City" class="margins" style="float:left"></v-text-field>
    <v-select :items="states" v-model="hometown.state" label="State (if in US)" class="margins" style="float:left"></v-select>
    <v-select :items="countries" v-model="hometown.country" label="Country" class="margins"></v-select>

    <!-- <file-upload></file-upload> -->
    <!--File upload-->
    <div>
        <input type="file" @change="onFileChanged">
        <v-btn @click="onUpload">Upload</v-btn>
        <h3 v-if="uploadFinished" id="green">Uploaded successfully</h3>
    </div>

    <!--Buttons-->
    <v-btn :disabled="!valid" @click="back()">Back</v-btn>
    <v-btn :disabled="!valid" @click="next()">Next</v-btn>
</v-form>

<!--Page 2-->
<v-form v-else-if="pageNumber === 2" ref="form" v-model="valid" lazy-validation>
    <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
    <h1>Are you an undergraduate or graduate student?</h1>
    
    <v-radio-group v-model="status" class="margins">
        <v-radio v-for="status in statuses" :key="status" :label="status" :value="status"></v-radio>
    </v-radio-group>

    <!--Buttons-->
    <v-btn :disabled="!valid" @click="back()">Back</v-btn>
    <v-btn class="margins.top" :disabled="!valid" @click="next()">Next</v-btn>
</v-form>

<!--Page 3-->
<v-form v-else-if="pageNumber === 3" ref="form" v-model="valid" lazy-validation>
    <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
    <!--Grad Year-->
    <div id="graduation-header" style="margin-bottom:20px">
        <h3 style="float:right">Graduation Year:</h3>
        <v-select v-model="gradYear" :items="gradYears" label="Graduation year" class="margins"></v-select>
    </div>

    <!--Degrees-->
    <div id="degree-header" >
        <h3>Degree:</h3>
        <button
            id="add-btn"
            type="button"
            class="material-icons"
            style="float:right"
            @click="addDegree(degree)"
        >add_circle</button>
    </div>
    <ul style="margin-bottom:20px">
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

    <!--Advice-->
    <h3 v-if="isUndergrad()">What are you looking for?</h3>
    <h3 v-else>What advice can you offer?</h3>
    <v-layout row wrap style="margin-bottom:20px">
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

    <!--Interests-->
    <h3>What are you interested in?</h3>
    <v-layout row wrap style="margin-bottom:20px">
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

    <!--Buttons-->
    <v-btn :disabled="!valid" @click="back()">Back</v-btn>
    <v-btn class="margins.top" :disabled="!valid" @click="next()">Next</v-btn>
</v-form>

<!--Page 4-->
<v-form v-else-if="pageNumber === 4" ref="form" v-model="valid" lazy-validation>
    <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
    <h1 style="margin-bottom:20px">Tell us a little about yourself.</h1>

    <v-flex>
        <v-textarea :value="bio" solo name="input-7-4" v-model="bio" :rules="bioRules"></v-textarea>
    </v-flex>

    <!--Buttons-->
    <v-btn :disabled="!valid" @click="back()">Back</v-btn>
    <v-btn :disabled="!valid" @click="registerUser()">Register</v-btn>
</v-form>
    </v-card>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Firebase from "firebase";
// import FileUpload from "./FileUpload";

import {
    db,
    userRef,
    matchesRef,
    majorsRef,
    storageRef
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
let forEach = require('lodash.foreach');

export default {
    name: "SignUp",
    components: {
        // FileUpload
    },
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
            emailRules: [
                v => !!v || "Email is required",
                v => /.+@.+/.test(v) || "E-mail must be valid",
                v => this.newEmail(v) || "Email is already in use"
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
            gradYears: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
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
            degrees: [{
                id: 1,
                type: null,
                major: null,
                previousMajor: null,
                concentration: null
            }],
            uuid: "",
            newUser: null,
            selectedFile: null,
            profileImageUrl: "http://placekitten.com/g/200/300",
            uploadFinished: false
        };
    },
    firebase: {
        users: userRef,
        matches: matchesRef,        // matches2
        majors: majorsRef,
        storage: storageRef
    },
    methods: {
        next() {
            if (this.pageNumber < 4) {
                this.pageNumber += 1;
            } else {
                this.pageNumber = 1;
            }
        },

        exit() {
            this.graphics();
        },

        back() {
            if (this.pageNumber > 1) {
                this.pageNumber--;
            } else {
                this.graphics(); // go back to home screen
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
                profileImageUrl: this.profileImageUrl 
            };

            // equivalent to signing in automatically
            this.setUser(newUser);

            if (this.$refs.form.validate()) {
                userRef.child(myUuid).set(newUser);
            }

            // TODO: redirect to profile page
            this.toggleProfile();
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
            forEach(undergradMajors2, function (value, key) {
                if (key === major) {
                    c = value.concentrations;
                    return c;
                }
            });
            return c;
        },

        newEmail(v) {
            let users = null;
            userRef.on('value', function (snapshot) {
                users = snapshot.val();
            });

            console.log("My email: ", v);

            for (let user in users) {
                console.log("Their email: ", users[user].email);
                if (users[user].email === v) {
                    return false;
                }
            };

            return true;
        },

        // file uploading
        onFileChanged(event) {
            this.selectedFile = event.target.files[0];
        },

        onUpload() {
			const storageRef = Firebase.storage().ref();

            // File or Blob named mountains.jpg
            var file = this.selectedFile;

            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            // var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
            var uploadTask = storageRef.child("myfiles/" + this.uuid + "/" + file.name).put(file, metadata);
            console.log('upload task', uploadTask)
            let that = this;

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED,
                function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case Firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case Firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
                },
                function (error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                },
                async function () {
                    // Upload completed successfully, now we can get the download URL
                    var url = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log('urll', url);
                    Vue.set(that, 'profileImageUrl', url);
                    Vue.set(that, 'uploadFinished', true);
                });
        }
    },
    props: ['setUser', 'user', 'graphics', 'calculateMatches', 'toggleProfile']
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

#float {
    float: left;
}

.signup{
    padding: 30px;
}

#green {
    color: green;
}
</style>
