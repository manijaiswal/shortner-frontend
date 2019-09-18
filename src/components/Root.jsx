import React,{Component}from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from '../components/Home';
const RenderComponent = ({Comp,props,routerProps})=>{
    return (
        <div className={'main_container'}>
            <Comp {...props}  {...routerProps} />
        </div>
    )
}

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={(props) => <RenderComponent Comp={Home} props={this.props} routerProps={props} />} />
                </Switch>
            </Router>
        )
    }
}