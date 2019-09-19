import React,{Component}from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import NavBar from '../components/utils/NavBar';
import DashBoard from '../components/Dashboard';
const RenderComponent = ({Comp,props,routerProps})=>{
    return (
        <div>
            <NavBar />
            <div className={'main_container'}>
                <Comp {...props}  {...routerProps} />
            </div>
        </div>
    )
}

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={(props) => <RenderComponent Comp={Home} props={this.props} routerProps={props} />} />
                    <Route exact path='/login' render={(props) => <RenderComponent Comp={Login} props={this.props} routerProps={props} />} />
                    <Route exact path='/dashboard' render={(props) => <RenderComponent Comp={DashBoard} props={this.props} routerProps={props} />} />
                </Switch>
            </Router>
        )
    }
}