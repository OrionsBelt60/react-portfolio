import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch, 
  Route,
} from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth.js";
import PortfolioManager from "./pages/portfolio-manager.js";
import NoMatch from "./pages/no-matches";
import Icons from "../helpers/icons";


export default class App extends Component {
  constructor(props) {
    super(props)

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }



    this.handleSuccessfulLogin=this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin=this.handleUnsuccessfulLogin.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }
  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", {
      withCredentials: true
    }).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      }else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState ({
          loggedInStatus: 'LOGGED_IN'
        });
      }else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState ({
          loggedInStatus: 'NOT_LOGGED_IN'
        });
      }
    })
    .catch(error => {
      console.log("Error", error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedRoutes() {
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} /> 

    ]
  }

  render() {
    
    return (
      <div className='container'>

        <Router>
          <div>
            <NavigationContainer  
            LIS={this.state.loggedInStatus}
            handleLogout ={this.handleLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route 
              path="/auth" 
              render={props =>(
                <Auth 
                  {...props}
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
              )}
              /> 
              <Route path="/about-me" component={About} /> 
              <Route path="/contact-me" component={Contact} /> 
              <Route
                path="/blog"
                render={props => (
                  <Blog {...props} LIS={this.state.loggedInStatus} />
                )}
              />
              <Route 
               path="/b/:slug" 
              render={props => (
                <BlogDetail {...props} LIS={this.state.loggedInStatus} />
              )}
               />
                {this.state.loggedInStatus === "LOGGED_IN" ? (
                  this.authorizedRoutes()
                  ): null}
              <Route
                exact
                path="/portfolio/:slug"
                component={PortfolioDetail}
              />
              <Route component={NoMatch} /> 
            </Switch>
          </div>
        </Router>

        
      </div>
    );
  }
}