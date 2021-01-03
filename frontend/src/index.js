// libraries
import { Fragment, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// components
import List from './screens/list';
import Header from './compnents/header';
import Detail from './screens/detail';
import NotFound from './screens/not-found'

// styles
import './index.css';

// data
import movies from './movies.json';

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
  
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
