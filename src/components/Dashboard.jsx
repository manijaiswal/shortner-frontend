import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Tables from './Tables';
import Tables2 from './Tables2';
import PieCharts from './PieCharts';

import queryString from 'query-string';
import {FTECH_DATA} from '../constants/apiConstants';
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import LineCharts from './LineChart'


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            tableData:[],
            totalView:0,
            originalUrl:'',
            shortUrl:"",
            browser:[],
            operSys:[],
            countByDate:[],
            country:[],
            loaded:false
        }
    }
    componentDidMount(){
        var data = queryString.parse(this.props.location.search);
        var qd = {code:data.code.trim()};
        this.props.fetchFunction(qd,FTECH_DATA).then((res)=>{
            console.log(res);
            var ld = res.data;
            this.setState({loaded:true});
            if(Object.keys(ld).length != 0){
                if("table" in ld){
                    var x = ld['table'];
                    this.setState({totalView:x.views,originalUrl:x.originalUrl,shortUrl:x.shortUrl,tableData:x.tableData});
                }
                if("countByDate" in ld){
                    var count= ld['countByDate'];
                    this.setState({countByDate:count});
                }
                if("browser" in ld){
                    this.setState({browser:ld.browser});
                }
                if("country" in ld){
                    this.setState({country:ld.country});
                }
                if("oper_sys" in ld){
                    this.setState({operSys:ld.oper_sys});
                }
            }

        }).catch((error)=>{
            console.log(error.response);
            swal("opps!",error.response.message,"error");
            return;
        })
    }
    render() {
        if(!this.state.loaded){
            return (
                <div>
                    <CircularProgress  />
                </div>    
            )
        }
        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col-6 col-md-4 text-center">
                        <div className="info mx-4">
                            <p>Total Views</p>
                            <h1>{this.state.totalView}</h1>
                        </div>
                        <button className="but orange">Views</button>
                    </div>
                    <div className="col-6 col-md-4 text-center">
                        <div className="info mx-4">
                            <p>Original Url</p>
                            <p>{this.state.originalUrl}</p>
                        </div>
                        <button className="but blue">Original</button>
                    </div>
                    <div className="col-12 col-md-4 text-center mt-5 mt-md-0">
                        <div className="info mx-4">
                            <p>Short Url</p>
                            <p>{this.state.shortUrl}</p>
                        </div>
                        <button className="but blue">Short Url</button>
                    </div>
                </div>
                <br /><br />
                <div className="container-fluid mt-5 mt-md-0">
                    <h3 className="heading ml-5">No of views per Date</h3>
                    <br />	<br />
                    <Tables datas = {this.state.countByDate} />
                </div>
                <br /><br />
                 <br /><br />
                <div className="container-fluid mt-5 mt-md-0">
                    <h3 className="heading ml-5">Views Deatils</h3>
                    <br />	<br />
                    <Tables2 datas = {this.state.tableData} />
                </div>
                <br /><br />
                <div className="container-fluid mt-5 mt-md-0">
                    <h3 className="heading ml-5">Views Graph</h3>
                    <br />	<br />
                    <LineCharts datas = {this.state.countByDate}/>
                </div>
                <br /><br />

                <div className="container-fluid mt-5 mt-md-0">
                    <h3 className="heading ml-5">Views pi chart Graph</h3>
                    <br />	<br />
                    <div className="row">
                        <div className="col-md-4" >
                            <PieCharts datas ={this.state.browser} />
                        </div>
                        <div className="col-md-4" >
                            <PieCharts datas ={this.state.operSys} />
                        </div>
                        <div className="col-md-4">
                            <PieCharts datas ={this.state.country} />
                        </div>
                    </div>
                </div>        
            </div>
        )
    }
}
