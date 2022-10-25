import React from 'react';
import moment from 'moment';

class DateTimeFormatter extends React.Component {
  render() {
    return (
      dateTimeFormatter(this.props.text, this.props.formatter)
    );
  }
};

function dateTimeFormatter(string, formatter = "DD/MM/yyyy - HH:mm:ss") {
  return moment(new Date(string)).format(formatter);
}

export default DateTimeFormatter;