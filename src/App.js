import React from "react";

import "./App.css";
import Header from "./components//header/Header";
import {Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import GameList from "./components/games/GameList";
import Game from "./components/games/Game";
import SavedGames from "./components/games/SavedGames";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/savedgames" exact component={SavedGames} />
        <Route path="/gamelist" exact component={GameList} />
        <Route path="/gamelist/game" exact component={Game} />
      </Switch>
    </div>
  );
}

export default App;
