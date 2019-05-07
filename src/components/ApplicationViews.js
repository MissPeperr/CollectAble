import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import NavBar from './navbar/navbar'
import HomePage from './homepage/homepageDOM'
import 'bootstrap/dist/css/bootstrap.min.css';




export default class ApplicationViews extends Component {

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isAuthenticated() &&
                    <div className="viewArea">
                        <NavBar />
                        <Route path="/" render={(props) => {
                            return <HomePage {...props} />
                        }} />
                    </div>
                }
                {
                    !this.props.isAuthenticated() &&
                    <Redirect to="/login" />
                }
            </React.Fragment>
        )
    }
}