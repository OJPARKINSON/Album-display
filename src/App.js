import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from './components/Home'
import Callback from './components/Callback'
import Album from "./components/Album";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/album" component={Album} />
          <Route path="/callback" component={Callback} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}