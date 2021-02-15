import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";

import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import Home from "../components/Home/Home";
import Chats from "../components/Chats/Chats";
import Calls from "../components/Calls/Calls";
import Friends from "../components/Friends/Friends";
import Account from "../components/Account/Account";
import Documentation from "../components/Documentation/Documentation";

// Route component to manage app routes
class Routing extends Component {

    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={Home} exact/>
                <Route path="/SignIn" component={SignIn} exact/>
                <Route path="/SignUp" component={SignUp} exact/>
                <Route path="/reset-password" component={ResetPassword} exact/>
                <Route path="/Chats" component={Chats}/>
                <Route path="/Calls" component={Calls}/>
                <Route path="/Friends" component={Friends}/>
                <Route path="/Account" component={Account}/>
                <Route path="/Documentation" component={Documentation}/>
            </BrowserRouter>
        );
    }
}

export default Routing;
