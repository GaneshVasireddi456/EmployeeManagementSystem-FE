import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = React.useState("")
  const [depart, setDepart] = React.useState("")
  const [phNo, setPhNo] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [id, setId] = React.useState("")
  const [employeeList, setEmployeeList] = React.useState([])
  const resetForm = () => {
    setPhNo("")
    setEmail("")
    setDepart("")
    setName("")
  }
  //For adding employee
  const addEmployee = () => {
    axios.post('http://localhost:3001/addEmployee', { "name": name, "phoneNo": phNo, "department": depart, "email": email }).then(
      (res) => {
        alert("Inserted Successsfully");
        getEmployeeData()
      }
    )
  }
  //To fetch the all employee details on page load
  useEffect(() => {
    getEmployeeData()
  }, [])
  //For getting employee list
  const getEmployeeData = () => {
    axios.get('http://localhost:3001/getEmployeeDetails').then(
      res => { setEmployeeList(res.data) }
    )
  }
  //For patching the employee data
  const patchDeatails = (data) => {
    console.log(data);
    setDepart(data.department);
    setEmail(data.email);
    setName(data.name)
    setId(data._id)
    setPhNo(data.phoneNo)
  }
  //To edit the emloyee data
  const editEmployee = () => {
    let reqData = {
      name: name,
      phoneNo: phNo,
      department: depart,
      email: email
    }
    axios.put('http://localhost:3001/editEmployee/' + id, reqData).then(
      res => { alert("Updated successfully"); getEmployeeData() }
    )
  }
  //To delete employee data
  const deleteEmployee = (id) => {
    axios.delete('http://localhost:3001/deleteEmployee/' + id).then(
      res => { alert("deleted successfully"); getEmployeeData() }
    )
  }
  return (
    <>
      <div className="App">
        <h2>Employee Management System</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={resetForm}>Add Employee </button>&nbsp;
      </div>
      {/* Table  */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">PhoneNo</th>
            <th scope="col">Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee, index) => <tr key={index}>
            <th scope="row">{index}</th>
            <td>{employee.name}</td>
            <td>{employee.department}</td>
            <td>{employee.phoneNo}</td>
            <td>{employee.email}</td>
            <td>
              <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { patchDeatails(employee) }}>Edit</button>
              &nbsp;<button type="button" className="btn btn-warning" onClick={() => deleteEmployee(employee._id)}>Delete</button>
            </td>
          </tr>)
          }
        </tbody>
      </table>
      {/* Add dialog */}
      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Employee </h5>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <label>Name</label>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Name' value={name} onInput={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col">
                    <label>Department</label>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Department' value={depart} onInput={(e) => setDepart(e.target.value)} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label>PhoneNo</label>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='PhoneNo' value={phNo} onInput={(e) => setPhNo(e.target.value)} />
                  </div>
                  <div className="col">
                    <label>Email</label>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Email' value={email} onInput={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addEmployee}>Add</button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Dialog */}
      <div className="modal fade " id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Employee </h5>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <label>Name</label>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Name' value={name} onInput={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col">
                    <label>Department</label>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Department' value={depart} onInput={(e) => setDepart(e.target.value)} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label>PhoneNo</label>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='PhoneNo' value={phNo} onInput={(e) => setPhNo(e.target.value)} />
                  </div>
                  <div className="col">
                    <label>Email</label>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Email' value={email} onInput={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={editEmployee}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
