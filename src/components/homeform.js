import React, {useState, useEffect }from 'react';
import { Link, Route } from 'react-router-dom';
import useScript from '../scripts/uselogin';
const Home = (props) =>{
    const loginHandler = (e) =>{
        console.log(e.target.value);
        props.setUser(e.target.value);
    };
    useScript('../scripts/login.js');
    const [employees, setEmps] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        const data = await fetch('https://ersnode.herokuapp.com/manager/employees');
        const jsonData = await data.json();
        setEmps(jsonData);
    };
    return(
        <div className="jumbotron jumbotron-fluid text-center">
        <h1 className="display-4" id="Header">Revature ERS Deployment Site</h1>
        <p className="lead">The Expense Reimbursement System</p>
        <hr className="my-4"/>
        <p className="lead">
            Employee: 
           <select id="employee-dropdown" name="user" onChange={loginHandler}> 
           <option selected="true" disabled="true">Select Employee</option>     
           {employees.map(emps=>(
            <option key = {emps.id} value={emps.name}>{emps.name}</option>))}
           </select><Link to = "/EmpHome">
           <button> Login Employee</button>
           </Link> <br/><br/>
           Manager: 
           <select id="manager-dropdown" name="user" onChange={loginHandler}>
           <option selected="true" disabled="true">Select Manager</option>     
            <option key = "Will" value="Will">Will</option>
           </select>             
           <Link to = "/ManHome">
           <button> Login Manager</button>
           </Link>
        </p>
     </div>
    );
}
export default Home;