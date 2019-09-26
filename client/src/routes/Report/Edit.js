import React from 'react';
import EditForm from '../../components/EditForm/EditForm';

const EditReport = props => {

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <div>
      <h2>Edit</h2>
      <EditForm submit={handleSubmit} />
    </div>
  )
}

export default EditReport
