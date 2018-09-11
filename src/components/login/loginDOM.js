import React, { Component } from "react"


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

    handleLogin = (e) => {
        e.preventDefault()

        /*
            write an if/else statement that if 'isChecked' is true, put it in localStorage
            else, put it in sesssionStorage
        */
       if(this.state.isChecked === true){
           localStorage.setItem(
               "credentials",
               JSON.stringify({
                   email: this.state.email,
                   password: this.state.password
               })
           )
           this.props.history.push("/homepage")
       } else {
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        )
        this.props.history.push("/homepage")

       }
    }

    render() {
        return (
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
                <input onClick={ () => {this.setState({isChecked: true})}} id="isChecked" type="checkbox" name="remember"/>
            </form>
        )
    }
}