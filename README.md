# Read me is a WIP

## Why I built the project this way

* This was my very first react and redux project (other than many small tutorial based react projects)
* My goal was to simulate a professional work enviornment while maintaining focus on JavaScript and React/Redux
* Therefore I decided to keep it simple with the CSS and used external sheets rather than CSS-in-JS styled components or CSS Modules
* To keep the focus on me learning React/Redux I used the React Slick Library for my carousels rather than creating one by scratch
* Other than [Bennett Wong's loading dots](https://codepen.io/bennett/pen/GjRPdk) from CodePen, [React Slick Library](https://react-slick.neostack.com/) for Carousels (although I did alter some code to customize), and [React Hot Toast Library](https://react-hot-toast.com/) all of the code was written by me 

## How I worked on this project

### Design

* I forwent using Figma to design the app in order to maintain focus on js. Instead I drew it out roughly on a sketchpad: [Image of Sketchpad]() 
* However for the app's design I dud take inpsiration from varous gaming-related websites such as [GOG.com](https://www.gog.com/) and [IGDB.com](https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild) to name a few

### Planning 
* I created user stories and features: [Screenshot](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/game-save-user-stories-features.png)

### Organizing
* I organized my work and tasks on a Kanban board using Notion: [Screenshot of tasks](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/game-save-kanban-board-tasks.png)

## How to navigate this project

* Fetching and Refreshing the App token (Implementation of Twitch's OAuth client credentials flow) and storing to Firebase Database: 
  * [Jump to code + HTTP requests using axios](src/app/getAppToken.js)
* Application fetching data from the IGDB API for home page: 
  * [Examples for HTTP requests and mapping arrays](src/components/Home.js)
* Implementation of Google Auth: 
  * [Jump to code](src/components/navbar/GoogleAuth.js)
* Use of React's Context API: 
  * [Jump to code](src/store/auth-context.js)
* Search feature: 
  * [Jump to code](src/components/navbar/searchbox/SearchBox.js)
* Browse games by genre feature: 
  * [Jump to Code](src/components/GameListGenre.js)
* Full game information page (Info, Links, Videos, Screenshots, Artworks): 
  * [Jump to Code](src/components/game/Game.js)
  * CSS styling for game informatoin page: [Jump to code](src/components/game/Game.css)
* Dynamic Styling with React: 
  * [Example ]

## If I had more time I would change this

* Refactor some code such as [this](https://github.com/rbhogal/game-save-app/blob/main/src/components/Home.js#L151) and [this](https://github.com/rbhogal/game-save-app/blob/692245f90cf8a7f1730671039f3dfaf96a0e937c/src/components/SavedGames.js#L57) in order to not repeat myself and maintain coding best practices
* Add some unit, integration, and end-to-end testing using Jest and React Testing Library

## Available Scripts

In the project directory, run:

### `npm start`
