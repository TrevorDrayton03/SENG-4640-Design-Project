import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Pets from './Pets.js';
import Admin from './Admin.js';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      route: window.location.pathname,
      lists: [],
      items: {},
      admin: false,
      allPets: {}
    };
  }

  async componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState({ route: window.location.pathname });
    });

    // home fetches all pets for the slide show of randomized pets
    // it gets all pets by *not* specifying a pet type
    // see server.js app.get('/api/petData')
    try {
      const response = await fetch('http://localhost:3000/api/petData');
      const pets = await response.json();
      this.setState({
        allPets: pets
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleLinkClick(route) {
    this.setState({ route });
    window.history.pushState(null, null, route);
  }

  handleLogin(loggedIn) {
    this.setState({ admin: loggedIn });
  }

  render() {
    if (this.state.admin) {
      return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Navbar linkClick={this.handleLinkClick.bind(this)}></Navbar>
          <h3>HELLO ADMIN</h3>
          {this.state.route === '/' && <Home pets={this.state.allPets} />}
          {this.state.route === '/pets' && <Pets lists={this.state.lists} items={this.state.items} />}
          {this.state.route === '/admin' && <Admin handleLogin={this.handleLogin.bind(this)} admin={this.state.admin} />}
        </div>
      );
    }
    else {
      return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Navbar linkClick={this.handleLinkClick.bind(this)}></Navbar>
          {this.state.route === '/' && <Home pets={this.state.allPets} />}
          {this.state.route === '/pets' && <Pets lists={this.state.lists} items={this.state.items} />}
          {this.state.route === '/admin' && <Admin handleLogin={this.handleLogin.bind(this)} admin={this.state.admin} />}
        </div>
      );
    }
  }

}

export default App;
