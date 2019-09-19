import React,{Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Tables2 extends Component{
    render(){
        const  rows = this.props.datas;
        return(
            <Paper>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Date/Time</TableCell>
                  <TableCell align="right">Code</TableCell>
                  <TableCell align="right">Browser</TableCell>
                  <TableCell align="right">OS</TableCell>
                  <TableCell align="right">IP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.createdAt}
                    </TableCell>
                    <TableCell align="right">{row.code}</TableCell>
                    <TableCell align="right">{row.browser}</TableCell>
                    <TableCell align="right">{row.os}</TableCell>
                    <TableCell align="right">{row.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )
    }
}