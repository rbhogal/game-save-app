<div id="top"></div>

<!-- PROJECT HEADER -->
<br />
<div align="center">

  <a href="https://www.flaticon.com/free-icon/joystick_808513?term=game%20controller&page=1&position=36&page=1&position=36&related_id=808513&origin=search">
    <img src="src/images/joystick.png" alt="Logo" width="60" height="60">
  </a>
<h3 align="center">Game Save</h3>

  <p align="center">
    Search, view, or discover video game titles and save them to your wishlist
    <br />
    <br />
    <a href="https://game-save.web.app" >View Site</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
     <li>
      <a href="#about-the-project">About the Project</a>
    </li>
    <li>
      <a href="#how-i-worked-on-this-project">How I Worked On This Project</a>
      <ul>
        <li><a href="#designing">Designing</a></li>
        <li><a href="#planning:-user-stories-&-features">Planning: User Stories & Features</a></li>
        <li><a href="#organization:-task-&-bug-tracking">Organization: Task & Bug Tracking</a></li>
      </ul>
    </li>
    <li>
      <a href="#how-to-navigate-this-project">How To Navigate This Project</a>
    </li>
    <li><a href="#why-i-built-the-project-this-way">Why I Built the Project This Way</a></li>
    <li><a href="#if-i-had-more-time-i-would-change-this">If I Had More Time I Would Change This</a></li>
     <li>
      <a href="#the-idea-behind-this-project">The Idea Behind This Project</a>
    </li>
    <li>
      <a href="#challenges">Challenges</a>
    </li>
    <li>
      <a href="#q-and-a">Q and A</a>
    </li>
    <li><a href="#available-scripts">Available Scripts</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About the Project
<br />
<br />

<div align="center">

![Game Save BOTW Game Page](https://raw.githubusercontent.com/rbhogal/rbhogal.github.io/main/images/projects/game-save/Game-Save__BOTW_game_page.png)

</div>
<br />

### Built With
* React
* Redux
* React-Router
* [IGDB API](https://api-docs.igdb.com/#about)
* [Firebase - Authentication and Realtime Database](https://firebase.google.com/)
* Heroku (proxy)

<p align="right">(<a href="#top">back to top</a>)</p>

## The Idea Behind This Project

#### To Practice My Skills
After finishing my react and redux course I wanted to create an app to practice all that I learned such as:
* React & Redux
* Authentication (Firebase Google)
* HTTP Reqeusts/Consuming an API (IGDB API)
* CRUD operations and a database (Firebase Realtime Database) 

#### Solve a Problem I Had
I like video games but I don't have a lot of time to play. So sometimes a new one comes out (or I am reminded of an old one I never got a chance to play). Then later on, I have time to play, but I forget what games they were. So I made an app, and no matter what system the game is on, I can search it, and save it for later to have have a wish list of games I can come back to when I'm looking to purchase a new game.

<p align="right">(<a href="#top">back to top</a>)</p>


## Features

### Sign in as a Guest or with Google
* Sign in is required to save titles to your wishlist

### Search Video Game Titles
* Scroll through popular titles on the home page, use the dropdown to search games by genre, or use the search bar to find a specific game

### View Quick Summaries
* Hover over titles to qucikly view and scroll through summary

### Quick Save
* Quick save a title when scrolling through games

### Full Game Information Page
Click on video game title to view:
* Summary and storyline, links, and more game information
* Videos
* Screenshots
* Artworks gallery
* Click on images to zoom in and scroll through gallery (no loading spinner currently, may have to wait for next image to load)
* Add game to your wishlist

### Save Games to List
* View (or delete) your saved games by clicking "Saved Games" via the profile button dropdown

<p align="right">(<a href="#top">back to top</a>)</p>

## How I Worked On This Project

### Designing

* I'm not a designer but I wanted to closely follow a professional workflow but Adobe XD was giving me too much trouble loading fonts. Instead I roughly drew it out on a sketchpad: [Sketchpad](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/sketch-home-page.jpg)
* For the app's design I took inpsiration from varous gaming-related websites such as [GOG.com](https://www.gog.com/) and [IGDB.com](https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild) to name a few

### Planning: User Stories & Features
* I wrote out user stories and features: [Screenshot](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/game-save-user-stories-features.png)

### Organizing: Task & Bug Tracking
* I organized my work using Notion
* I worked on tasks on a Kanban board using Notion: [Link to Task & Bug Tracker](https://hypnotic-saver-f39.notion.site/3fbacc81006c470e8338bda191f6a7d0?v=48360e6b61a245df8627d0df2eef8e31)

<p align="right">(<a href="#top">back to top</a>)</p>

## How To Navigate This Project

#### Twitch OAuth Client Credentials Flow
  * [Code](src/app/getAppToken.js): Implementation of Twitch's OAuth client credentials flow (Fetching/Refreshing the App token storing to Firebase Database) + HTTP requests using axios

#### HTTP Requests from REST API + Use of Hooks
  * [Code](src/components/Home.js): Home Page
  
#### Mapping Arrays 
  * [Code](src/components/carousels/GamesHorizontalScroll.js): To fill carousels with game information

#### Google Authentication via Firebase Auth REST API: 
  * [Code](src/components/navbar/GoogleAuth.js)

#### Redux State Managment
  * [Code](src/features/user/userSlice.js): Handling user data

#### Context State Mangment: Auth/Login
  * [Code](src/store/auth-context.js): To persist state if user is signed in
  
#### Search Feature
* [Code](src/components/navbar/searchbox/SearchBox.js)
  
#### Browse Games by Genre Feature: 
  * [Code](src/components/GameListGenre.js)
  
#### Full Game Information Page (Info, Links, Videos, Screenshots, Artworks): 
  * [Code](src/components/game/Game.js)
  * [Code](src/components/game/Game.css) (CSS)

#### Code Splitting / Lazy Loading
* [Code](https://github.com/rbhogal/game-save-app/blob/214130ba31133a77bb888078dfcc8119c53ef74a/src/App.js#L26)
  
#### Dynamic Styling with React: 
Example with dropdown menu
  * [Code](https://github.com/rbhogal/game-save-app/blob/692245f90cf8a7f1730671039f3dfaf96a0e937c/src/components/navbar/searchbox/SearchBox.js#L25)

<p align="right">(<a href="#top">back to top</a>)</p>

## Why I Built The Project This Way

### Project of Many Firsts
This was my first react, react-router, and redux project, a well as a first making http requests, consuming an API and token, authentication, and using a database.  

### Keep Focus on Javascript less on CSS
My goal was to maintain focus on JavaScript and React/Redux therefore I decided to keep it simple with the CSS and used external sheets rather than CSS-in-JS styled components or CSS Modules

For the same reason I also used 
  * [Bennett Wong's loading dots](https://codepen.io/bennett/pen/GjRPdk) from CodePen
  * [React Slick Library](https://react-slick.neostack.com/) for Carousels (although I did alter some code to customize)
  * [React Hot Toast Library](https://react-hot-toast.com/)

<p align="right">(<a href="#top">back to top</a>)</p>
  
## If I Had More Time I Would Change This

* Refactor some code such as [this](https://github.com/rbhogal/game-save-app/blob/main/src/components/Home.js#L155) and [this](https://github.com/rbhogal/game-save-app/blob/692245f90cf8a7f1730671039f3dfaf96a0e937c/src/components/SavedGames.js#L57) in order to not repeat myself and maintain coding best practices. As well as organize my firebase/auth code better. 
* Cleaner and more organized folder structure such as moving the page components into a seperate component folder
* Add some unit, integration, and end-to-end testing using Jest and React Testing Library
* Figure out why it takes so long to initailly load
  * added lazy-loading to improve initial load time by a few seconds (1/23/2022)
* ~~Add a guest login~~ (updated 1/20/2022)
* Memory leak bug on Google user sign out
* Add a loading spinner to image galleries
* Make image gallery full screen for mobile
* Add a modal for singing in instead of a toast notification
* Instead of toast notifications I would update the buttons to alert the user that a game was saved
* Add a featured game/more content on the home page

<p align="right">(<a href="#top">back to top</a>)</p>

## Challenges

### Handling asynchronous data

* Many of the errors/bugs were simply due to code being written without consideration to async data such as code being executed before data in a useState hook had a chance to     update.

### Implementing Twitch's OAuth Client Credentials Flow

* Working with a more complex API such as Twitch/IGDB's API. Reading and understanding the documentation, testing (using Postman), and implementing the app access token into my code properly took some time and effort. Maybe a week or two. I ran into a CORS error which required a workaround for the IGDB API by setting up a proxy using CORS anywhere with Heroku.

### Debugging Code
* This project really tested my debugging skills. Using best practices in the first place will help avoid bugs entirely, however when they do happen, I've learned to work through them logically, use console logs, chrome dev tools/debugger/breakpoints, and keep calm as more than likely it's a very easy fix with a solution just around the corner. Take a short break if I have to.

### CORS Error
* The Twitch IGDB API didn't support CORS and so they recommeded setting up a proxy using [CORS everywhere](https://github.com/Rob--W/cors-anywhere) and Heroku. Not something I was familiar with but eventually figured out how to correclty implement it thanks to a 10 minute video of someone who implemented it. Still took me an hour but had I not figured it out I would have had to abandon the project.

### My First App
* Although through tutorials I had implemented HTTP Requests, worked with an API, Firebase, React, Redux, and React-Router, this was the first time doing them on my own. It took a stressful 2.5 months to complete as it being a project of many firsts I made many mistakes, but it really forced me to learn.


## Q and A




#### Did I learn a lot?
Oh yeah. Authentication, using a database, tokens/refresh tokens, APIs, reading docs, HTTP requests, React, React-Router, Redux Toolkit, Context API, and most importantly handling asynchronous data. 

#### Did it take long? 

<img src="https://media.giphy.com/media/3o7TKRwpns23QMNNiE/giphy.gif" />

...I don't want to talk about it 😐 (2.5 months)

#### Do I hate myself for jumping into the deep end as my first app without building up to this? 

Meh, kind of. Hard for the code to not get messy as I made a lot of mistakes but that's the best way to learn, because I do NOT want to deal with the stress of dealing with those mistakes again so I've been better prepared going forward. 

<p align="right">(<a href="#top">back to top</a>)</p>

## Available Scripts

In the project directory, run:

### `npm start`

<p align="right">(<a href="#top">back to top</a>)</p>

