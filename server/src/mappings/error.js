const methods = {};

module.exports = methods;

methods.genericErrorResponseHandler = (source, message) => {
  try {
    return { source: source, message: message };
  } catch (err) {
    console.log(err)
    return unexpectedExceptionResponse();
  }
}

methods.unexpectedExceptionResponse = () => {
  return { source: 'ERROR:UNEXPECTED', message: 'SOMETHING BAD HAPPENED' };
}