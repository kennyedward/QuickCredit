const checkStatus = (status) => {
  let validateMessage = '';
  if (!status) {
    validateMessage += 'verification status is required';
  } else if (status.trim() !== 'verified' && status !== 'unverified') {
    validateMessage += 'to verify a user, Status can only be either \'verified\', or \'unverified\'';
  }
  return validateMessage;
};

export default {
  checkStatus,
};
