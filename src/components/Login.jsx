import React, { Component } from "react";
import {LOGIN} from '../constants/apiConstants';
import swal from "sweetalert";

import '../styles/loginCss.scss'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.email.length < 3)
            swal("Error", "Email cannot be empty", "error");
        else if (this.state.password.length < 3)
            swal("Error", "Password field cannot be empty", "error");
        this.setState({ loading: true });
        var data = {email:this.state.email,password:this.state.password,role:1};
        this.props.postData(data,LOGIN).then((res)=>{
            console.log(res);
            this.state({loading:false});
            this.props.history.push('/dashboard');
        }).catch((error)=>{
            if(error){
                console.log(error.response)
                swal("Opps!",error.response.data.message,"error");
                this.setState({loading:false});
            }
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        console.log(this.props);
        return (
            <div className="w-100 form-singin-wrapper d-flex align-items-center justify-content-center">
                <div className="info">
                    <div className="corner">
                        <span className="">Log in</span>
                    </div>
                    <div className="container">
                        <form onSubmit={this.onSubmit} className="form-signin">
                            <label htmlFor="inputEmail" className="sr-only">
                                Email address
                            </label>
                            <input
                                disabled={this.state.loading}
                                value={this.state.email}
                                name="email"
                                onChange={this.onChange}
                                type="email"
                                id="inputEmail"
                                className="form-control"
                                placeholder="Email address"
                                required
                                autoFocus={true}
                            />
                            <label htmlFor="inputPassword" className="sr-only">
                                Password
                            </label>
                            <input
                                disabled={this.state.loading}
                                value={this.state.password}
                                name="password"
                                onChange={this.onChange}
                                type="password"
                                id="inputPassword"
                                className="form-control mt-4"
                                placeholder="Password"
                                required
                            />
                            {/* <div className="checkbox mb-3">
                                <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                             </div> */}
                            <button
                                disabled={this.state.loading}
                                className="btn btn-lg btn-primary btn-block mt-5"
                                type="submit"
                            >
                                {this.state.loading ? (
                                    <span>
                                        <i className="fas fa-circle-notch fa-spin" />
                                        &nbsp;&nbsp;
                                    </span>
                                ) : null}
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;