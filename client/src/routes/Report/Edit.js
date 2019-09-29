import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import ReportForm from '../../components/ReportForm/ReportForm';

@inject('reportStore')
@observer
class EditReport extends React.Component {
  componentDidMount() {
    const { reportStore } = this.props;
    reportStore.loadReport(this.props.match.params.id);
  }

  handleSubmit = values => {
    return this.props.reportStore.updateReport(values);
  };

  redirect = path => {
    this.props.history.push(path);
  };

  render() {
    const { report = {}, isLoading } = this.props.reportStore;

    if (isLoading) return <div>Loading...</div>;

    return (
      <div>
        <h2>Edit</h2>
        <ReportForm
          submit={this.handleSubmit}
          data={report}
          onSuccess={this.redirect}
        />
      </div>
    );
  }
}

export default withRouter(EditReport);
