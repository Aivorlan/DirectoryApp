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
