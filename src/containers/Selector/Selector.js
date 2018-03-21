import React, { Component } from 'react';

class Selector extends Component {
  // Checking validity of input values
  findArticles = () => {
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth() + 1;
    const choosenYear = parseInt(this.year.value);
    const choosenMonth = parseInt(this.month.value);
    if(this.year.value === "" || choosenYear < 1851 || choosenYear > currentYear){
      document.getElementById('msgAlert').innerHTML = "You must insert valid year...";
      return;
    }
    if(choosenYear === currentYear && choosenMonth > currentMonth){
      document.getElementById('msgAlert').innerHTML = "You must insert valid month...";
      return;
    }
    document.getElementById('msgAlert').innerHTML = "Loading...";
    document.getElementById('searchBtn').classList.add('not-active');
    //Send date to parent App component
    this.props.getDate([this.year.value, this.month.value]);
  };

  render() {
    return(
      <div className="header__submit">
        <p id="msgAlert">Please select year and month</p>
        <input
          type="number"
          id="year"
          name="year"
          min="1851"
          max="2018"
          maxLength="4"
          placeholder="e.g.1983"
          ref={(input) => this.year = input} />
        <select
          name="month"
          id="month"
          ref={(select) => this.month = select}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <a href="#" id="searchBtn" className="btn" onClick={this.findArticles}>Find articles</a>
      </div>
    )
  }
}

export default Selector;