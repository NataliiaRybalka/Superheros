module.exports = {
  FIELD_NOT_FILLED: {
    message: (error) => error,
    code: '401.1'
  },
  WRONG_MIMETYPE: {
    message: 'Mimetype is not supported',
    code: '415.1'
  },
  WRONG_FILE_SIZE: {
    message: 'Too big file',
    code: '415.2'
  },
};
