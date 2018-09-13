import { Component } from "react";
import React from "react";
import Login from "./components/login/loginDOM";
import { Route } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";


export default class App extends Component {
    // Check if user are in local/session storage
    isAuthenticated = () => (localStorage.getItem("user") !== null) || (sessionStorage.getItem("user") !== null)    
    render() {
        console.log("render app.js")
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