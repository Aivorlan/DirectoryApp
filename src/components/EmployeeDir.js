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
      
      