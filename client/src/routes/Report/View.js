import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const ViewReport = ({ report, remove }) => {
  return (
    <div>
      <h2>{report.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: report.text }} />
      <Button
        color="primary"
        variant="outlined"
        component={RouterLink}
        to={`/reports/edit/${report.id}`}
      >
        Edit
      </Button>
      <Button
        style={{ marginLeft: '10px' }}
        color="primary"
        variant="outlined"
        onClick={() => remove(report)}
      >
        Delete
      </Button>
    </div>
  );
};

export default ViewReport;
