# Read me is a WIP

## Why I built the project this way

* This was my very first react and redux project (other than many small tutorial based react projects)
* My goal was to simulate a professional work enviornment while maintaining focus on JavaScript and React/Redux
* Therefore I decided to keep it simple with the CSS and used external sheets rather than CSS-in-JS styled components or CSS Modules
* To keep the focus on me learning React/Redux I used the React Slick Library for my carousels rather than creating one by scratch
* Other than [Bennett Wong's loading dots](https://codepen.io/bennett/pen/GjRPdk) from CodePen and the [React Slick Library](https://react-slick.neostack.com/) for Carousels (although I did alter some code to customize) all of the code was written by me 

## How I worked on this project

### Design

* I forwent using Figma to design the app in order to maintain focus on js. Instead I drew it out roughly on a sketchpad: [Image of Sketchpad]() 
* However for the app's design I dud take inpsiration from varous gaming-related websites such as [GOG.com](https://www.gog.com/) and [IGDB.com](https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild) to name a few

### Planning 
* I created user stories and features: [Screenshot](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/game-save-user-stories-features.png)

### Organizing
* I organized my work and tasks on a Kanban board using Notion: [Screenshot of tasks](https://raw.githubusercontent.com/rbhogal/game-save-app/main/screenshots/game-save-kanban-board-tasks.png)

## How to naviage this project

* Implementation of Twitch's OAuth client credentials flow:
* Refreshing the App token: Code + HTTP requests 
* Application fetching data from the IGDB API: [Examples for request and data transformation](src/app/getAppToken.js)
* Implementation of Google Auth: [Code](src/components/navbar/GoogleAuth.js)
* Use of React's Context API: [Code](src/store/auth-context.js)
* Search feature: [Code]()

## If I had more time I would change this

* Refactor some code such as [this]()
* Add some unit, integration, and end-to-end testing using Jest and React Testing Library

## Available Scripts

In the project directory, run:

`npm start`
