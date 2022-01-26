<div id="top"></div>

### Read me is a work in progress ⚠


<!-- PROJECT HEADER -->
<br />
<div align="center">

<h3 align="center">Game Save</h3>

  <p align="center">
    Search, view, or discover video game titles and save them to your wishlist
    <br />
    <br />
    <a href="https://game-save.web.app">View Site</a>
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
      <a href="#how-i-worked-on-this-project">How I worked on this project</a>
      <ul>
        <li><a href="#design">Design</a></li>
        <li><a href="#planning:-user-stories-&-features">Planning: User Stories & Features</a></li>
        <li><a href="#organization:-task-&-bug-tracking">Organization: Task & Bug Tracking</a></li>
      </ul>
    </li>
    <li>
      <a href="#how-to-navigate-this-project">How to navigate this project</a>
    </li>
    <li><a href="#why-i-built-the-project-this-way">Why I built the project this way</a></li>
    <li><a href="#if-i-had-more-time-i-would-change-this">If I had more time I would change this</a></li>
     <li>
      <a href="#the-idea-behind-this-project">The idea behind this project</a>
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
* React-router
* IGDB API
* Firebase Authentication and Realtime Database
* Heroku (proxy)

<p align="right">(<a href="#top">back to top</a>)</p>

## Features

### Login
* As a Guest or with Google. Login is required to save titles. 

### Search Video Game Titles
* Scroll through popular titles on the home page, use the search bar, or use the dropdown to search games by genre

### View Quick Summaries
* Hover over titles to view and scroll through summary
* Quick save button to save titles

### Full Game Information Page
Click on video game title to view:
* Summary and storyline, links, and more game information
* Videos
* Screenshots
* Artworks gallery
* Click on images to zoom in and scroll through gallery (no loading spinner currently, may have to wait for next image to load)
* Add button to add to your list

### Save Games to List
* View (or delete) your saved games by clicking "Saved Games" via the profile button dropdown

<p align="right">(<a href="#top">back to top</a>)</p>

## How I worked on this project

### Design

* I wanted to closely follow a professional workflow but Adobe XD was giving me too much trouble loading fonts. Instead I roughly drew it out on a sketchpad: [Sketchpad](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/sketch-home-page.jpg)
* For the app's design I took inpsiration from varous gaming-related websites such as [GOG.com](https://www.gog.com/) and [IGDB.com](https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild) to name a few

### Planning: User Stories & Features
* I wrote out user stories and features: [Screenshot](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/game-save-user-stories-features.png)

### Organizing: Task & Bug Tracking
* I organized my work using Notion
* I worked on tasks on a Kanban board using Notion: [Link to Task & Bug Tracker](https://hypnotic-saver-f39.notion.site/3fbacc81006c470e8338bda191f6a7d0?v=48360e6b61a245df8627d0df2eef8e31)

<p align="right">(<a href="#top">back to top</a>)</p>

## How To Navigate This Project

#### Twitch OAuth Client Credentials Flow
Implementation of Twitch's OAuth client credentials flow (Fetching/Refreshing the App token storing to Firebase Database): 
  * [Jump to code + HTTP requests using axios](src/app/getAppToken.js)

* Application fetching data from the IGDB API for home page and use of Hooks
  * [Jump to code + HTTP requests](src/components/Home.js)
  
* Mapping arrays to fill carousels with game information: 
  * [Jump to code](src/components/carousels/GamesHorizontalScroll.js)

* Implementation of Google Auth: 
  * [Jump to code](src/components/navbar/GoogleAuth.js)

* Redux (using Redux Toolkit - createSlice)
  * [Jump to code](src/features/user/userSlice.js)

* Use of React's Context API: 
  * [Jump to code](src/store/auth-context.js)
  
* Search feature: 
  * [Jump to code](src/components/navbar/searchbox/SearchBox.js)
  
* Browse games by genre feature: 
  * [Jump to code](src/components/GameListGenre.js)
  
* Full game information page (Info, Links, Videos, Screenshots, Artworks): 
  * [Jump to code](src/components/game/Game.js)
  * CSS styling for game information page: [Jump to code](src/components/game/Game.css)
  
* Dynamic Styling with React: 
  * [Jump to code - Example with dropdown menu](https://github.com/rbhogal/game-save-app/blob/692245f90cf8a7f1730671039f3dfaf96a0e937c/src/components/navbar/searchbox/SearchBox.js#L25)

<p align="right">(<a href="#top">back to top</a>)</p>

## Why I Built The Project This Way

* This was my very first react and redux project, as well as a first making http requests, consuming an API and token, authethicaion, and using a database (other than many small tutorial based react projects). Therefore my code may not be as clean as I wanted but I was doing many firsts. 
* My goal was to maintain focus on JavaScript and React/Redux therefore I decided to keep it simple with the CSS and used external sheets rather than CSS-in-JS styled components or CSS Modules
* For the same reason I also used 
  * [Bennett Wong's loading dots](https://codepen.io/bennett/pen/GjRPdk) from CodePen
  * [React Slick Library](https://react-slick.neostack.com/) for Carousels (although I did alter some code to customize)
  * [React Hot Toast Library](https://react-hot-toast.com/). 

<p align="right">(<a href="#top">back to top</a>)</p>
  
## If I Had More Time I Would Change This

* Refactor some code such as [this](https://github.com/rbhogal/game-save-app/blob/main/src/components/Home.js#L155) and [this](https://github.com/rbhogal/game-save-app/blob/692245f90cf8a7f1730671039f3dfaf96a0e937c/src/components/SavedGames.js#L57) in order to not repeat myself and maintain coding best practices
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

## The Idea Behind This Project

After finishing my react and redux course I wanted to create an app to practice all that I learned such as:
* Authentication (Firebase Google)
* HTTP Reqeusts/Consuming an API (IGDB API)
* CRUD operations and a database (Firebase Realtime Database) 

I like video games. So sometimes a new one comes out, or I remember an old one I never got a chance to play and I want to remember to purchase it in the future. So I thought about building an app where you can do just that. Regardless of what system it's on, save it for later. Now you have a wish list of games you can come back to when you're looking to game.

Did I learn a lot? Oh yeah. Did it take long? 2.5 months. Do I hate myself for jumping into the deep end as my first app without building up to this? Meh, kind of. 

<p align="right">(<a href="#top">back to top</a>)</p>

## Available Scripts

In the project directory, run:

### `npm start`

<p align="right">(<a href="#top">back to top</a>)</p>

