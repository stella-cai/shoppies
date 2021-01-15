import React, { useState } from "react";
import Header from './Header';
import Movies from "./movies/Movies";
import Nominees from "./nominees/Nominees"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  // Note: ideally the data would be handled by the backend.

  const [nominees, setNominees] = useState([]);
  // let nominees = []
  // const setNominees = null;

  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/movies">
            <Movies nominees={nominees} setNominees={setNominees}/>
          </Route>
          <Route path="/nominees">
            <Nominees nominees={nominees} setNominees={setNominees}/>
          </Route >
          <Route path="/">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;