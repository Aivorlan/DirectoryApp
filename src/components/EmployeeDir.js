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
  