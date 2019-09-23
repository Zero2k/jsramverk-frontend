const formatError = response => {
  let errorMap = {};
  errorMap[response.error.field] = response.error.msg;
  return errorMap;
};

export default formatError;
