/* eslint-disable */
import { userRef } from "../database";

// let user = null;

let user = userRef.on('value', function(snapshot){
	snapshot.val();		// TODO: check if you need to set equal directly
	console.log("my user is ", user);
});

export const row1 = [
	{
		title: "Intro",
		content: [
			checkUserContents()
			// user.bio
		]
	},
	{
		title: "Contact",
		content: [
			user.email,
			user.phoneNumber
		]
	}
];

export const row2 = [
	{
		title: typeOfAdvice(),
		content: [
			user.bio
		]
	},
	{
		title: "Links",
		content: [
			// insert social media links
			"mollymolichen",
			"mollsprobs",
			"mc-squared"
		]
	}
];

export const row3 = [
	{
		title: "Interests",
		content: user.interests     // already a list, iterate through
	}
];

function checkUserContents(){
	console.log("hi");
	console.log(user);
}

function typeOfAdvice(){
	if (user.status === "Undergraduate"){
		return user.name + " would like advice about: ";
	} else {
		return user.name + " would like to give advice about: ";
	}
}