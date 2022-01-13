import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch, Redirect}from 'react-router-dom';
import Login from '../views/login/Login'
import NewsSandBox from '../views/newssandbox/NewsSandBox'

export default function indexRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                {/* <Route path="/" component={NewsSandBox} /> */}
                <Route path="/" render={()=>
                    localStorage.getItem("token")?
                    <NewsSandBox></NewsSandBox>:
                    <Redirect to="/login"/>
                }/>
            </Switch>
        </Router>
    )
}