## How I worked on this project 👷🏼‍♂️

### Design

* I wanted to closely follow a professional workflow but Adobe XD was giving me too much trouble loading fonts. Instead I roughly drew it out on a sketchpad: [Sketchpad](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/sketch-home-page.jpg)
* However for the app's design I took inpsiration from varous gaming-related websites such as [GOG.com](https://www.gog.com/) and [IGDB.com](https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild) to name a few

### Planning 
* I wrote out user stories and features: [Screenshot](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/game-save-user-stories-features.png)

### Organizing
* I organized my work using Notion
* I worked on tasks on a Kanban board using Notion: [Link to Task & Bug Tracker](https://hypnotic-saver-f39.notion.site/3fbacc81006c470e8338bda191f6a7d0?v=48360e6b61a245df8627d0df2eef8e31)

## How to navigate this project 🧭

* Fetching/Refreshing the App token (Implementation of Twitch's OAuth client credentials flow) and storing to Firebase Database: 
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

## Why I built the project this way 🤔

* This was my very first react and redux project (other than many small tutorial based react projects)
* My goal was to maintain focus on JavaScript and React/Redux therefore I decided to keep it simple with the CSS and used external sheets rather than CSS-in-JS styled components or CSS Modules
* For the same reason I also used [Bennett Wong's loading dots](https://codepen.io/bennett/pen/GjRPdk) from CodePen, [React Slick Library](https://react-slick.neostack.com/) for Carousels (although I did alter some code to customize), and [React Hot Toast Library](https://react-hot-toast.com/). Otherwise all of the code was written by me. 

## If I had more time I would change this ⌛

* Refactor some code such as [this](https://github.com/rbhogal/game-save-app/blob/main/src/components/Home.js#L151) and [this](https://github.com/rbhogal/game-save-app/blob/692245f90cf8a7f1730671039f3dfaf96a0e937c/src/components/SavedGames.js#L57) in order to not repeat myself and maintain coding best practices
* Add some unit, integration, and end-to-end testing using Jest and React Testing Library
* Figure out why it takes so long to initailly load
  * added lazy-loading to improve initial load time by a few seconds (1/23/2022)
* ~~Add a guest login~~ (updated 1/20/2022)
* Memory leak bug on Google user sign out
* Move page components into a seperate component folder
* Add a loading spinner to image gallery


## Available Scripts

In the project directory, run:

### `npm start`
