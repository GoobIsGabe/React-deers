import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table"; 
import 'react-table/react-table.css'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      rem: [],
      loading:true
    }
  }
  async getRemData(){
    const res = await axios.get('https://ersnode.herokuapp.com/resolved/')
    console.log(res.data)
    this.setState({loading:false, rem: res.data})
  }
  componentDidMount(){
    this.getRemData()
  }
  render() {
    const columns = [{  
      Header: 'ID',  
      accessor: '_id',
     },{  
      Header: 'Name',  
      accessor: 'empname' ,
      },{  
     Header: 'Amount',  
     accessor: 'amount' ,
     },{  
     Header: 'Reason',  
     accessor: 'reason',
     },{  
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
      <ReactTable data={this.state.rem} columns={columns} defaultPageSize={5} />
    )
  }
}
