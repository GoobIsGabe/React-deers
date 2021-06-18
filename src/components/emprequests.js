import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import '../style/added-reacttable.css'
import { useParams } from 'react-router-dom';

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            users: [props],
            loading: true
        }
    }
    async getUsersData(props) {
        const res = await axios.get(`https://ersnode.herokuapp.com/emprequests/${this.state.user}`)
        //console.log(res.data)
        this.setState({ loading: false, users: res.data })
    }
    componentDidMount() {
        this.getUsersData()
    }
    render() {

        const columns = [{
            Header: 'ID',
            accessor: '_id',
        }, {
            Header: 'Name',
            accessor: 'empname',
        }, {
            Header: 'Amount',
            accessor: 'amount',
        }
            , {
            Header: 'Reason',
            accessor: 'reason',
        }, {
            Header: 'Status',
            accessor: 'status',
            getProps: (state, rowInfo, column) => {
                if (rowInfo && rowInfo.row) {
                    return {
                        style: {
                            color:
                            rowInfo.row.status == 'approved' ? 'green' :
                            rowInfo.row.status == 'pending' ? 'grey' :
                            rowInfo.row.status == 'denied' ? 'red' : null
                        },
                    };
                }
                return {};
            }
        }
        ]

        return (
            <ReactTable data={this.state.users} columns={columns} defaultPageSize={5} />
        )
    }
}
