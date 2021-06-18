import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table";
import 'react-table/react-table.css'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: true
        }
    }
    async getUsersData() {
        const res = await axios.get('https://ersnode.herokuapp.com/pending/')
        console.log(res.data)
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
        }, {
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
        }, {
            width: 100,
            Header: '',
            Cell: ({ row, original }) => {
                console.log(original._id)
                return (<button className="btn btn-success btn-sm" onClick={() => axios.put(`https://ersnode.herokuapp.com/resolve/${original._id}/approved`)}>Approve</button>)
            }
        }, {
            width: 100, Header: '',
            Cell: ({ row, original }) => {
                return (<button className="btn btn-danger btn-sm" onClick={() => axios.put(`https://ersnode.herokuapp.com/resolve/${original._id}/denied`)} >Deny</button>)
            }
        }
        ]
        return (
            <ReactTable data={this.state.users} columns={columns} defaultPageSize={5} />
        )
    }
}
