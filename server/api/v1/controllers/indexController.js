const getIndex = (req, res) => {
  res.json({
    status: 200,
    message: 'You\'re welcome to index API Endpoint',
  });
};

export default {
  getIndex,
};
