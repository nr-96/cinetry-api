const defaultResolve = (res, result) => {
  const formattedResult = {};

  if (result.data && result.meta) {
    formattedResult.data = result.data;
    formattedResult.meta = result.meta;
  } else {
    formattedResult.data = result;
  }

  return res
    .status(200)
    .json(formattedResult);
};

const defaultReject = (res, { statusCode, message } = {}) => res.error(statusCode, { message });

module.exports = async function controller(req, res, params) {
  try {
    let payload = {};
    if (params.validator) {
      payload = await params.validator(req);
    }

    if (req.user) {
      payload.auth = { user: req.user };
    }

    const data = await params.service(payload);
    return defaultResolve(res, data);
  } catch (err) {
    console.error('controller error:', err);
    return defaultReject(res, err);
  }
};
