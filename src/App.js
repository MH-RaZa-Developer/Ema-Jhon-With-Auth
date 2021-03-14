import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import Details from './components/ProductDetails/Details';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [LoggedInUser, setLoggedInUser] = useState({});

  // className="App"
  return (
    <UserContext.Provider value={[LoggedInUser, setLoggedInUser]}>
     <Router>
       <p>Email: {LoggedInUser.email}</p>
     <Header></Header>
    <Switch>
      <Route path="/shop">
      <Shop></Shop>
      </Route>
      <Route path="/review">
    <Review></Review>
      </Route>
      <PrivateRoute path="/manage">
      <Manage></Manage>
      </PrivateRoute>

      <Route path="/login">
      <Login></Login>
      </Route>

      <PrivateRoute path="/shipment">
      <Shipment></Shipment>
      </PrivateRoute>

      <Route exact path="/">
      <Shop></Shop>
      </Route>
      <Route path="/product/:productKey">
          <Details></Details>
      </Route>
    <Route path="*">
      <NotFound></NotFound>
    </Route>
    </Switch>
     </Router>
     
    </UserContext.Provider>
  );
}

export default App;
