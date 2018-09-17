import React, { Component } from "react";
import { Alert } from 'reactstrap';
import DataManager from '../modules/DataManager';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Register extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        registerEmail: "",
        registerPassword: "",
        isChecked: false
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }


    handleRegister = () => {
        if (!this.state.registerEmail) {
            document.querySelector("#email").value = "";
            document.querySelector("#password").value = "";
            this.setState({ email: "", password: "" })
        } else if (this.state.registerEmail) {
            DataManager.getAll("users").then((users) => {
                let loginUser = users.find(user => user.email === this.state.registerEmail)
                console.log("register", loginUser)
                if (loginUser) {
                    return(
                        <Alert color="danger">This email has already been registered</Alert>
                    )
                } else {
                    let newUser = {
                        password: this.state.registerPassword,
                        email: this.state.registerEmail,
                        DOB: "",
                        firstName: "",
                        lastName: ""
                    }
                    DataManager.add("users", newUser)
                        .then(() => alert("You've successfully registered."))
                }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
            <form id="register-form">
                <h1 className="h3 mb-3 font-weight-normal">CollectAble</h1>
                <label htmlFor="inputEmail">
                    Email:
            </label>
                <input onChange={this.handleFieldChange} 
                    defaultValue={this.state.registerEmail}
                    type="email"
                    id="email"
                    placeholder="Email address"
                    required="" 
                    autoFocus="" />
                <label htmlFor="inputPassword">
                    Password:
            </label>
                <input onChange={this.handleFieldChange} 
                    defaultValue={this.state.registerEmail}
                    type="password"
                    id="password"
                    placeholder="Password"
                    required="" />
                <button type="submit" onClick={this.handleRegister}>
                    Register
                </button>
            </form>
            </React.Fragment>
        )
    }
}