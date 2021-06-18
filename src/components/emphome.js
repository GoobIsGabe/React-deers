import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import EmpRequests from "./emprequests";

const EmpHome = (props) => {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");

    const amountHandler = (e) => {
        setAmount(e.target.value);
    }
    const reasonHandler = (e) => {
        setReason(e.target.value);
    }
    async function newRem(name, reason, amount) {
        console.log(props.user)
        console.log(reason)
        console.log("$" + amount)
        const newRem = {
            empname: props.user,
            amount: "$" + amount,
            reason:  reason,
            status: "pending"
        }
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRem)
        }
        await fetch("https://ersnode.herokuapp.com/emphome/newrmb", requestOptions);
    }
    return (
        <Router>
            <div className="jumbotron jumbotron-fluid text-center">
                <h1 className="display-4">Welcome,&nbsp;
                    {props.user}!</h1>
                <p className="lead">The Expense Reimbursement System</p>
                <hr className="my-4" />
                <p className="lead">Create a new request:</p>
                Name: <input type="text" id="name" name="name" value={props.user} disabled="true" /> <br />
                Reason: <input type="text" id="reason" name="reason" onChange={reasonHandler} required /> <br />
                Amount: <input type="number" id="amount" name="amount" onChange={amountHandler} required /> <br />
                <p className="lead">
                    <input type="button" id="rmbButton" value="Submit" onClick={() => newRem(name, reason, amount)} />
                </p>

                <Link to="/emprequests">
                    <p className="lead">
                        <button className="badge badge-info" id="oneEmp" role="button">View Your Requests</button>
                    </p>
                </Link>
                <Switch>
                    <Route path="/emprequests" render={() => <EmpRequests user={props.user} />} />
                </Switch>
            </div>
        </Router>
    )
}

export default EmpHome;
