import { Component } from "react";
import React from "react";
import Login from "./components/login/loginDOM";
import { Route } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";


export default class App extends Component {
    // Check if credentials are in local storage
    isAuthenticated = () => (localStorage.getItem("credentials") !== null) || (sessionStorage.getItem("credentials") !== null)    
    render() {
        return (
            <React.Fragment>
                {
                    !this.isAuthenticated() &&
                    <Route exact path="/login" render={(props) => {
                        return <Login {...props} />
                    }} />
                }
                {
                    <ApplicationViews isAuthenticated={this.isAuthenticated}/>
                }
            </React.Fragment>
        )
    }
} 