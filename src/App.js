import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import Album from "./pages/Album";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/album" component={Album} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  );
}