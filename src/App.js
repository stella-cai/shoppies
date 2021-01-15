import React, { useState } from "react";
import Header from './Header';
import Movies from "./movies/Movies";
import Nominees from "./nominees/Nominees"
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {

  // Note: ideally the data would be handled by the backend through GET, POST, and DELETE api calls.

  const [nominees, setNominees] = useState([]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#008060",
      },
    },
    typography: {
      fontFamily: ['Helvetica Neue'],
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Switch>
            <Route path="/movies">
              <Movies nominees={nominees} setNominees={setNominees} />
            </Route>
            <Route path="/nominees">
              <Nominees nominees={nominees} setNominees={setNominees} />
            </Route >
              <Home />
            <Route path="/">
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}
export default App;