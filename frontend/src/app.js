import { Fragment, useEffect, useState } from 'react';
// libraries
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// components
import List from './screens/list';
import Header from './compnents/header';
import Detail from './screens/detail';
import NotFound from './screens/not-found';
//auth components
import Join from './screens/auth/join';
import Login from './screens/auth/login';

//app context
import {authContext} from './context/auth';

// styles
import './index.css';

// utilities
import movies from './movies.json';
import { isAuth } from './utilities/auth';

function App(){
  const [loggedIn,setLoggedIn] = useState(false);
  // set value from storage
  useEffect(()=>{
    setLoggedIn(isAuth());
  },[setLoggedIn]);

  return (
  <Router>
    <authContext.Provider value={{loggedIn,setLoggedIn}}>
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
      </authContext.Provider>
    </Router>
  )
}
export default App;