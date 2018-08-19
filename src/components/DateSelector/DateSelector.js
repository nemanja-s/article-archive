import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './DateSelector.css';
import * as actions from '../../store/actions/actionCreators';


class DateSelector extends Component {
  // Checking validity of input values
  findArticles = () => {
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth() + 1;
    const choosenYear = parseInt(this.year.value, 10);
    const choosenMonth = parseInt(this.month.value, 10);
    if(this.year.value === "" || choosenYear < 1851 || choosenYear > currentYear){
      this.props.onMessageChanged("You must insert valid year...");
      return;
    }
    if(choosenYear === currentYear && choosenMonth > currentMonth){
      this.props.onMessageChanged("You must insert valid month...");
      return;
    }
    this.props.onMessageChanged("Loading...");
    this.props.onDatePicked(this.year.value, this.month.value);
  };

  render() {
    return(
      <div className={classes.Selector}>
        <p>{this.props.message}</p>
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
        <a href="javascript:void(0)"
           className={classes.Btn}
           onClick={this.findArticles}>Find articles
        </a>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onMessageChanged: (message) => dispatch(actions.changeMessage(message)),
    onDatePicked: (year, month) => dispatch(actions.setChoosenDate(year, month))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);