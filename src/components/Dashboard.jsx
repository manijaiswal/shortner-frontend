import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];


function dateDiff(date2, date1) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
function genData(days) {
    //generating fake data for charts
    var data = [];
    for (var i = 0; i < days; i++)
        data.push({ 'name': `Date ${i + 1}`, clients: Math.floor(Math.random() * 4000) });
    return data;
}

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
        }
        this.state.startDate.setDate(this.state.startDate.getDate() - 7);
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
    }
    startDateChange(date) {
        this.setState({
            startDate: date
        })
    }
    endDateChange(date) {
        this.setState({
            endDate: date
        })
    }
    render() {
        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col-6 col-md-4 text-center">
                        <div className="info mx-4">
                            <p>Total Views</p>
                            <h1>3</h1>
                        </div>
                        <button className="but orange">Views</button>
                    </div>
                    <div className="col-6 col-md-4 text-center">
                        <div className="info mx-4">
                            <p>Total browser</p>
                            <h1>3</h1>
                        </div>
                        <button className="but blue">Browser</button>
                    </div>
                    <div className="col-12 col-md-4 text-center mt-5 mt-md-0">
                        <div className="info mx-4">
                            <p>Total ip</p>
                            <h1>7,6</h1>
                        </div>
                        <button className="but blue">Ip Address</button>
                    </div>
                </div>
                <br /><br />
                <div className="container-fluid mt-5 mt-md-0">
                    <h3 className="heading ml-5">Views Graph</h3>
                    <br />	<br />
                    <center>
                        <ResponsiveContainer width="80%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </center>
                    <br />
                    <div className="d-flex flex-row justify-content-center">
                        <div className="info">
                            <p>Start Date</p>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.startDateChange}
                                name="startDate"
                                className="text-center w-100"
                            />
                        </div>
                        <div className="info">
                            <p>End Date</p>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.endDateChange}
                                name="endDate"
                                className="text-center w-100"
                            />
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        )
    }
}
