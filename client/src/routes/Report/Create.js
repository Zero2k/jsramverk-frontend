import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import ReportForm from '../../components/ReportForm/ReportForm';

@inject('reportStore')
@observer
class CreateReport extends React.Component {
  handleSubmit = values => {
    return this.props.reportStore.createReport(values);
  };

  redirect = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div>
        <h2>Create</h2>
        <ReportForm submit={this.handleSubmit} onSuccess={this.redirect} />
      </div>
    );
  }
}

export default withRouter(CreateReport);
