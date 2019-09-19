import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function dateDiff(date2, date1) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
function genData(days) {
    //generating fake data for charts
    var data = [];
    for (var i = 0; i < days; i++)
        data.push({ 'name': `Date ${i + 1}`, clients: 0 });
    return data;
}

export default class LineCharts extends Component {

    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            data:[]
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
        var x = this.props.datas;
        var data = [];
        var days = dateDiff(this.state.startDate, this.state.endDate);
        var i =0;
        for(i=0;i<x.length;i++){
            data.push({ 'name': `Date ${i + 1}`, views: x[i].num });
        }
        for(var m=i;m<days-i;m++){
            data.push({ 'name': `Date ${m + 1}`, views: 0 });
        }
        return (
            <div>
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
                    <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
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
        )
    }
}