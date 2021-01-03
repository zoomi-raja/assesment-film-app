// libraries
import { Fragment, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// components
import List from './screens/list';
import Header from './compnents/header';
import Detail from './screens/detail';
import NotFound from './screens/not-found';
//auth components
import Join from './screens/auth/join';
import Login from './screens/auth/login';


// styles
import './index.css';

// utilities
import movies from './movies.json';
import { isAuth } from './utilities/auth';

ReactDOM.render(
  <StrictMode>
    <Router>
      <Fragment>
        <Header />

        <Switch>
          <Route exact path="/films">
            <List data={ movies } />
          </Route>

          <Route path="/films/:slug">
            <Detail />
          </Route>

          <Route exact path="/">
            <Redirect to="/films" />
          </Route>

          {!isAuth() && 
            <Fragment>
              <Route path="/login">
                <Login />
              </Route>

              <Route path="/join">
                <Join />
              </Route>
            </Fragment>
          }
  
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
