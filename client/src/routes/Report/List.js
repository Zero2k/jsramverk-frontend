import React from 'react';
import { inject, observer } from 'mobx-react';
import ViewReport from './View';

@inject('reportStore')
@observer
class ListReports extends React.Component {
  componentDidMount() {
    const { reportStore } = this.props;
    reportStore.loadReports();
  }

  delete = report => {
    const { reportStore } = this.props;
    const isConfirmed = window.confirm(`Delete ${report.title}?`);
    if (!isConfirmed) return;
    reportStore.deleteReport(report);
  };

  render() {
    const { reports = [], isLoading } = this.props.reportStore;

    if (isLoading) return <div>Loading...</div>;

    return (
      <div>
        <h2>Reports</h2>
        <div>
          {reports.map(report => (
            <ViewReport key={report.id} report={report} remove={this.delete} />
          ))}
        </div>
      </div>
    );
  }
}

export default ListReports;
