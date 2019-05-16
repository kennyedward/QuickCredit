const checkStatus = (status) => {
  let validationMessage = '';
  if (!status) {
    validationMessage += 'Status is required';
  } else if (status.trim() !== 'approved' && status !== 'rejected') {
    validationMessage += 'Status can only be either \'approved\', or \'rejected\'';
  }
  return validationMessage;
};

export default {
  checkStatus,
};
