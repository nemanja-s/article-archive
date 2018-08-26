import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './DateSelector.css';
import * as actions from '../../store/actions/actionCreators';


class DateSelector extends Component {
  state = {
    year: '',
    month: ''
  };

  findArticles = () => {
    const { onMessageChanged, onFetchArticles } = this.props;
    const { year, month } = this.state;
    // Checking validity of input values
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth() + 1;
    const chosenYear = parseInt(year, 10);
    const choosenMonth = parseInt(month, 10);
    if(year === "" || chosenYear < 1851 || chosenYear > currentYear){
      onMessageChanged("You must insert valid year.");
      return;
    }
    if(month === "" || (chosenYear === currentYear && choosenMonth > currentMonth)){
      onMessageChanged("You must insert valid month.");
      return;
    }
    // Calling NYT API to get list of articles
    onMessageChanged("Loading... Please wait");
    onFetchArticles(year, month);
  };

  getBtnClasses() {
    // disable anchor tag while fetching articles
    return this.props.loading ? [classes.Btn, classes.Disabled] : [classes.Btn];
  }

  render() {
    const { message, loading } = this.props;
    const { year, month } = this.state;

    return(
      <div className={classes.Selector}>
        <p>{message}</p>
        <input
          name="year"
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => this.setState({ year: e.currentTarget.value })} />
        <select
          name="month"
          value={month}
          onChange={(e) => this.setState({ month: e.currentTarget.value })} >
          <option value="" disabled hidden>Month</option>
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
           className={this.getBtnClasses().join(' ')}
           onClick={this.findArticles}
        >{loading ? 'Loading' : 'Search'}
        </a>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.message,
    loading: state.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onMessageChanged: (message) => dispatch(actions.changeMessage(message)),
    onFetchArticles: (year, month) => dispatch(actions.fetchArticles(year, month))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);