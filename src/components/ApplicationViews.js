import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import NavBar from './navbar/navbar'
import HomePage from './homepage/homepageDOM'
import Register from './login/registerDOM'
import 'bootstrap/dist/css/bootstrap.min.css';




export default class ApplicationViews extends Component {

    render() {
        console.log("render application views")
        return (
            <React.Fragment>
                {
                    this.props.isAuthenticated() &&
                    <div className="viewArea">
                        <NavBar />
                        {/* <Route path="/homepage/collectionlist" render={(props) => {
                                return <HomePage {...props} />
                            }} /> */}
                            <Route path="/" render={(props) => {
                                return <HomePage {...props} />
                            }} />
                    </div>
                }
                {
                    
                    !this.props.isAuthenticated() &&
                    <Redirect to="/login" />
                }
                {/* 
         ///////// REGISTER PAGE IS CURRENTLY NOT IN USE. ALL FUNCTIONALITY IS ON LOGIN PAGE /////////
                { 
                    !this.props.isAuthenticated() &&
                    <Route path="/register" render={(props) => {
                        return <Register />
                    }}/>
                }
                 */}
            </React.Fragment>
        )
    }
}