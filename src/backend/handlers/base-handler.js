exports.getBaseView = (req, res) => {
  res.render('web', {
    error: res.locals.error ?
      {message: `${res.locals.error}`, status: res.locals.error.status} :
      null,
  });
};
