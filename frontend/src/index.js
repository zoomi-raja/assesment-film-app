// libraries
import { Fragment, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// components
import List from './screens/list';
import Header from './compnents/header';
import Detail from './screens/detail';

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
  
          <Route path="*">
            <h1>no page found</h1>
          </Route>
        </Switch>
      </Fragment>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
