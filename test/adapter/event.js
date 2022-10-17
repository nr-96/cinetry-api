/**
 * Get sample event & context comes to the lambda via LambdaURL
 * @param {object} params
 * @param {string} params.method - eg: GET, POST, PUT...
 * @param {string} params.path - eg: v1/orders/1/sales/list
 * @param {string} [params.cookie] - eg: sails.sid=xxx-xxx-xxx
 * @param {string} [params.queryString] - eg: limit=10&skip=2
 * @param {string} [params.queryParams] - eg: { limit: '10', skip: '2' }
 * @returns
 */
const getLambdaURLEvent = ({
  method,
  service,
  path,
  authorization,
  queryString = '',
  queryParams = null,
  body = {}
}) => {
  const event = {
    version: '2.0',
    routeKey: `${method} /${service}/${path}`,
    rawPath: `/${service}/${path}`,
    rawQueryString: queryString,
    headers: {},
    body: JSON.stringify(body),
    requestContext: {
      accountId: '000000000000',
      apiId: '',
      authorizer: {},
      domainName: '',
      domainPrefix: '',
      http: {
        method, path: `/${service}/${path}`, protocol: 'HTTP/1.1', sourceIp: '172.20.0.1', userAgent: 'PostmanRuntime/7.29.2'
      },
      requestId: 'e6bc3f53-8d16-4b0f-b632-17cd687ea7ee',
      routeKey: `${method} /${service}/${path}`,
      stage: '$default',
      time: '17/Oct/2022:15:47:14 +0000',
      timeEpoch: 1666021634961
    },
    isBase64Encoded: false,
    queryStringParameters: queryParams,
    stageVariables: {},
    pathParameters: { proxy: path },
    cookies: []
  };

  const context = {
    callbackWaitsForEmptyEventLoop: true,
    functionVersion: '$LATEST',
    functionName: `cinetry-api-local-${service}`,
    memoryLimitInMB: '1536',
    logGroupName: `/aws/lambda/cinetry-api-local-${service}`,
    logStreamName: '2022/10/17/[$LATEST]61f66042ad61e279471efd175963f2af',
    invokedFunctionArn: `arn:aws:lambda:eu-west-1:000000000000:function:cinetry-api-local-${service}`,
    awsRequestId: 'a52088db-41c8-1aef-30f5-2041b1046277'
  };

  if (authorization) {
    event.headers.Authorization = authorization;
  }

  return {
    event, context
  };
};

module.exports = {
  getLambdaURLEvent
};
