import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import BeerPage from './components/BeerPage';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route path='/beers/:id' component={BeerPage} />
          </Switch>
      </BrowserRouter>
  
    );
  
    }
  };


export default App;
