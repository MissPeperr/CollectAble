import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import DataManager from '../modules/DataManager';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        isChecked: false
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    /*
    USE THIS FOR REGISTER
    THIS IS CHECKING FOR USERS ALREADY IN THE DATABASE
    DataManager.getAll("users").then((users) => {
    let loginUser = users.find(user => user.password === this.state.password && user.email === this.state.email)
                console.log(loginUser)
            })
    */

    handleLogin = (e) => {
        e.preventDefault()
        if (this.state.isChecked === true) {
            DataManager.getAll("users").then((users) => {
                let loginUser = users.find(user => user.username === this.state.username && user.email === this.state.email)
                if(loginUser){
                    console.log("hello")
                    localStorage.setItem("user", JSON.stringify(loginUser))
                    this.props.history.push("/homepage/collectionlist")
                }
            })
        } else {
            DataManager.getAll("users").then((users) => {
                let loginUser = users.find(user => user.username === this.state.username && user.email === this.state.email)
                if(loginUser){
                    console.log("hello")
                    sessionStorage.setItem("user", JSON.stringify(loginUser))
                    this.props.history.push("/homepage/collectionlist")
                }
            })

        }
    }


    render() {
        console.log("render login")
        return (
            <React.Fragment>
                <form onSubmit={this.handleLogin} id="login-form">
                    <h1 className="h3 mb-3 font-weight-normal">CollectAble</h1>
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
                    <button type="submit">
                        Sign in
                </button>
                    Remember Me:
                <input onClick={() => { this.setState({ isChecked: true }) }} id="isChecked" type="checkbox" name="remember" />
                </form>
                <div>
                    <h6>New to the site?</h6>
                    <Button color="light"><Link to="/login/register">Register</Link></Button>
                </div>
            </React.Fragment>
        )
    }
}