import React, { Component } from 'react'
import DataManager from '../modules/DataManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'


export default class Login extends Component {

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



    handleRegister = (e) => {
        e.preventDefault()
        if (!this.state.registerEmail) {
            document.querySelector("#email").value = "";
            document.querySelector("#password").value = "";
            this.setState({ email: "", password: "" })
        } else if (this.state.registerEmail) {
            DataManager.getAll("users").then((users) => {
                let loginUser = users.find(user => user.email === this.state.registerEmail)
                if (loginUser) {
                    alert("This email has already been registered")
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

    handleLogin = (e) => {
        e.preventDefault()
        if (this.state.isChecked === true) {
            DataManager.getAll("users").then((users) => {
                let loginUser = users.find(user => user.username === this.state.username && user.email === this.state.email)
                if (loginUser) {
                    localStorage.setItem("user", JSON.stringify(loginUser))
                    this.props.history.push("/collectionlist")
                }
            })
        } else {
            DataManager.getAll("users").then((users) => {
                let loginUser = users.find(user => user.username === this.state.username && user.email === this.state.email)
                if (loginUser) {
                    sessionStorage.setItem("user", JSON.stringify(loginUser))
                    this.props.history.push("/collectionlist")
                }
            })

        }
    }


    render() {
        return (
            <div id="login-div">
                <div id="form-container">
                    <form onSubmit={this.handleLogin} id="login-form">
                        <h4 className="h3 mb-3 font-weight-normal">CollectAble</h4>
                        <label htmlFor="inputEmail">
                            Email:
                </label>
                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                        <label htmlFor="inputPassword">
                            Password:
                </label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                        <div id="remember-me-div">
                            Remember Me:
                <input onClick={() => { this.setState({ isChecked: true }) }} id="isChecked" type="checkbox" name="remember" />
                        </div>
                        <button type="submit">
                            Sign in
                        </button>

                    </form>
                    <form id="register-form">
                        <h4 className="h3 mb-3 font-weight-normal">New here?</h4>
                        <label htmlFor="inputEmail">
                            Email:
            </label>
                        <input onChange={this.handleFieldChange}
                            defaultValue={this.state.registerEmail}
                            type="email"
                            id="registerEmail"
                            placeholder="Email address"
                            required=""
                            autoFocus="" />
                        <label htmlFor="inputPassword">
                            Password:
            </label>
                        <input onChange={this.handleFieldChange}
                            defaultValue={this.state.registerPassword}
                            type="password"
                            id="registerPassword"
                            placeholder="Password"
                            required="" />
                        <button type="submit" onClick={this.handleRegister}>
                            Register
                </button>
                    </form>
                </div>
            </div>
        )
    }
}