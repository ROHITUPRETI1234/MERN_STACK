const validate = (schema) => async (req, _, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    return next();
  } catch (error) {
    // const err = error.issues[0].message;
    // res.status(400).json({ msg: err });
    const status = 400;
    const message = "fill the input properly";
    const extraDetails = error.issues[0].message;

    const err = {
      status,
      message,
      extraDetails,
    };
    next(err);
  }
};

module.exports = validate;
