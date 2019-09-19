import React, { Component } from "react";
import { CREATE_URL } from '../constants/apiConstants';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import swal from "sweetalert";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import '../styles/loginCss.scss'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            baseUrl: "",
            genUrl: "",
            loading: false,
            show: false,
            originUrl:"",
            shortUrl:"",
            copied:false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.url.length < 3) {
            swal("Error", "Url cannot be empty", "error");
            return;
        }
        this.setState({ loading: true });
        var data = { originalUrl: this.state.url, baseUrl: 'localhost:3001' };
        this.props.postData(data, CREATE_URL).then((res) => {
            console.log(res);
            var data = res.data
            this.setState({ loading: false, show: true ,originalUrl:data.originalUrl,shortUrl:data.shortUrl});

        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                swal("Opps!", error.response.data.message, "error");
                this.setState({ loading: false });
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
                        <span className="">Url Shortner</span>
                    </div>
                    <div className="container">
                        <div className="row" style={{marginBottom:50}}>
                            <div className="col-md-12">
                                <form onSubmit={this.onSubmit} className="form-signin">
                                    <label htmlFor="inputEmail" className="sr-only">
                                        Please enter your url
                                    </label>
                                    <input
                                        disabled={this.state.loading}
                                        value={this.state.url}
                                        name="url"
                                        onChange={this.onChange}
                                        type="url"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="please enter Url"
                                        required
                                        autoFocus={true}
                                    />
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
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                        {this.state.show && (<div>
                            <p><span style={{color:'red'}}>Generate Url:</span>{this.state.shortUrl}</p>
                            <CopyToClipboard text={this.state.shortUrl}
                                onCopy={() => this.setState({copied: true})}>
                                <Button variant="contained" color="primary">
                                    Copy
                                    <Icon>send</Icon>
                                </Button>
                            </CopyToClipboard>
                            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;