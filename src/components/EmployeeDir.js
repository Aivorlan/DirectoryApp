import React, { Component } from 'react';
import axios from "axios";
import Search from "./Search";


class EmployeeDir extends Component {
  state = {
    employees: [],
    searchTerm: null,
    filteredArr: [],
    sortType: "asc"
  }

 componentDidMount() {
    this.loadData()
  }

 
  loadData = () => {
    axios.get("https://randomuser.me/api/?nat=us&results=15").then((result) => {
      // console.log(result.data.results)
      this.setState({
        employees: [...result.data.results],
        filteredArr: [...result.data.results]

      })

    })
  }

  
  handleInputChange = event => {

    const value = event.target.value;
    let found = this.state.employees.filter(user => user.name.last.toLowerCase().includes(value) || user.name.first.toLowerCase().includes(value))
    console.log(found)
    this.setState({
      searchTerm: value,
      filteredArr: [...found]
    });

  };

  handleClickEvent = () => {
    let ascSort = [...this.state.filteredArr].sort((a, b) => {
      if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
        return -1;
      }
      if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    let descSort = [...this.state.filteredArr].sort((a, b) => {
        if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
          return -1;
        }
        if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      
      
      if (this.state.sortType === "asc") {
        this.setState({ sortType: "desc", filteredArr: descSort }) //if the sortType is asc, turn it to desc and assign descSort to filtered array 
      } else {
        this.setState({ sortType: "asc", filteredArr: ascSort })
      }
    }
  
    /
    render() {
  
        return (
    
            <div className="container-fluid">
              <h1>Employee Directory</h1>
              <Search searchTerm={this.state.searchTerm} handleInputChange={this.handleInputChange} />
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Photo</th>
                    <th onClick={() => { this.handleClickEvent() }} scope="col" className={`${this.state.sortType === "asc" ? "stylesAsc" : "stylesDesc"} hover`}>Name</th>
    
                    <th onClick={() => { this.handleClickEvent() }} scope="col" className={`${this.state.sortType === "asc" ? "stylesAsc" : "stylesDesc"} hover`}>Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filteredArr.map((employee, index) => {
                    return (
                      <tr key={employee.email}>
                        <th scope="row">{index + 1}</th>
                        <td><img src={employee.picture.medium} alt={employee.name.first} /></td>
                        <td>{employee.name.first} {employee.name.last}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
    
        );
      }
    }
    
    export default EmployeeDir 