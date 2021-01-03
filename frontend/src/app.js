import { Fragment, useEffect, useState } from 'react';
// libraries
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// components
import List from './screens/list';
import Header from './compnents/header';
import Detail from './screens/detail';
import Create from './screens/create';
import NotFound from './screens/not-found';
//auth components
import Join from './screens/auth/join';
import Login from './screens/auth/login';

//app context
import {authContext} from './context/auth';

// styles
import './index.css';

// utilities
import { isAuth } from './utilities/auth';
import { requestApi } from './utilities/request';

function App(){
  const [films,setFilms] = useState({loading:true,data:[]});
  const [loggedIn,setLoggedIn] = useState(false);
  // set value from storage
  useEffect(()=>{
    setLoggedIn(isAuth());
  },[setLoggedIn]);
  useEffect(()=>{
    async function fetchDate(){
      const films = await requestApi({url:'/film'});
      setFilms({loading:false,data:films.items});
    }
    fetchDate();
  },[setFilms]);

  const handleNewImage = (film) => {
    setFilms((prev)=>{
      return {
        ...prev,
        data:[
          ...prev.data,
          film
        ]
      }
    })
  }

  return (
  <Router>
    <authContext.Provider value={{loggedIn,setLoggedIn}}>
      <Header />
        <Switch>
          <Route exact path="/films">
            <List data={ films.data } />
          </Route>

          {isAuth() && 
            <Route path="/films/create">
              <Create onAdd={handleNewImage}/>
            </Route>
          }

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