import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch,Link, Route } from "react-router-dom";
import EmpRequests from "./emprequests";
import Pending from "./pending";
import Resolved from "./resolved";

const ManHome = (props) => {
    const [employees, setEmps] = useState([]);
    const [selectedEmp, setselectedEmp] = useState("");
    useEffect(() => {
        fetchUsers();
    }, []);

    const userSelect = (e) =>{
        setselectedEmp(e.target.value);
        console.log(selectedEmp);
        //this.setState =  e.target.value;
    }
    const fetchUsers = async () => {
        const data = await fetch('https://ersnode.herokuapp.com/manager/employees');
        const jsonData = await data.json();
        setEmps(jsonData);
    };
    return (
        <Router>
            <div className="jumbotron jumbotron-fluid text-center">
                <h1 className="display-4">Welcome, {props.user}!</h1>
                <p className="lead">The Expense Reimbursement System</p>
                <hr className="my-4" />
                <div>
                    <select id="employee-dropdown" class="form-select" aria-label="Default select example" name="user" onChange={userSelect}>
                    <option selected="true" disabled="true">Select Employee</option> 
                        {employees.map(emps => (
                            <option key={emps.id} value={emps.name}>{emps.name}</option>))}
                    </select>
                </div>
                <div>
                <Link to="/emprequests">
                    <p className="lead">
                        <button className="badge badge-info" id="oneEmp" role="button">View One Employee's Requests</button>
                    </p>
                    </Link>
                    <Link to="/pending">
                    <p className="lead">
                        <button className="badge badge-info" id="pending" type="button">View All Pending Requests</button>
                    </p>
                    </Link>
                    <Link to="/resolved">
                    <p className="lead">
                        <button className="badge badge-info" id="resolved" type="button">View All Resolved Requests</button>
                    </p>
                    </Link>
                    {/* <p className="lead">Create a new employee:</p>
                    Name: <input type="text" id="newemp" name="newemp" required /> <br />
                    <p className="lead"><button type="button" onClick="updatelist()" id="empButton" value="Submit">Submit</button></p> */}
                </div>
                <Switch>
                    <Route path="/pending" exact render={() => <Pending/>} />
                    <Route path="/resolved" render={() => <Resolved/>} />
                    {/* <Route path="/specific" render={() => <ManHome user={user} setUser={setUser} />} /> */}
                    <Route path="/emprequests" render={() => <EmpRequests user={selectedEmp} />} />
                </Switch>
            </div>
        </Router>
    )
}

export default ManHome;


{/*  <script>
        // Create new employee
        document.getElementById("empButton").addEventListener("click", async () => {
            try {
                await axios.post('/manager/addEmp', {
                    name: document.getElementById("newemp").value,
                    title: "Employee"
                })
                
                console.log("new employee created successfully")
                alert('Employee was successfully produced')
            } catch (error) {
                console.log(error)
                alert('What went wrong? Well find out.')
            }
        })
    </script> */}