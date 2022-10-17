const ApplicationError = require('./errorHelper');

const validate = (attributes, validateFunction) => {
  const result = validateFunction().validate(attributes, {
    allowUnknown: true,
    abortEarly: false
  });

  if (result.error) {
    throw new ApplicationError({ statusCode: 422, message: 'Request validation error' });
  }

  return attributes;
};

const isUndefined = (value) => typeof value === 'undefined';

const omitBy = (obj, condition) => {
  const dataset = { ...obj };
  Object.entries(dataset).forEach(
    ([key, value]) => condition(value) && delete dataset[key]
  );
  return dataset;
};

const clean = (object) => omitBy(object, isUndefined);

module.exports = {
  validate,
  clean
};
