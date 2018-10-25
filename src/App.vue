<template>    
	<div id="app">
    <h1>grunch</h1>
    <v-app>
      <v-card height="350px">
        <v-navigation-drawer permanent>
          <v-toolbar flat>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://randomuser.me/api/portraits/men/85.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Molly Chen</v-list-tile-title>
                </v-list-tile-content>    
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-list dense class="pt-0">
            <v-divider></v-divider>
            <v-list-tile
              v-for="page in pages"
              :key="page.title"
              @click=""
            >
              <v-list-tile-action>
                <v-icon>{{ page.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ page.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-card>

      <!-- <v-carousel max=700> 
        <v-carousel-item
          v-for="(match,m) in matches"
          :key="m"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>

      <v-footer :fixed="fixed" app>
        <span>&copy; Molly Chen, 2018</span>
      </v-footer> -->
    </v-app>
  </div>
</template>

<script>
	import Vue from 'vue';
	import Firebase from 'firebase';
	import { db, userRef, matchesRef } from './database';
	import HelloWorld from './components/HelloWorld.vue';
	import Header from './components/Header.vue';

	export default {
		name: 'App',
		components: {	// components that this component needs to render
			HelloWorld
		},
    data() {		// any params sent/returned to/from Firebase
      return {
        matches: [
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
            },
            {
              src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
            }
        ],
        pages: [
            {
              title: 'Home', icon: 'dashboard'
            },
            {
              title: 'About', icon: 'question_answer'
            }
        ],
        right: null
      }
		},
		computed: {		// any global variables that need to be reference by HTML in this component

		}, 
		firebase: {		// reference passed b/w Firebase and program
			user: userRef,
			matches: matchesRef
		},
		methods: {		// any functionality defined specifically for this component

    },
    props: {

    }
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
