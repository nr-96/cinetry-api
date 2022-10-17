const authEntry = require('../../src/entry/auth');
const authService = require('../../src/functions/auth/service');
const eventAdapter = require('../adapter/event');

describe('integration > auth', () => {
  let token;

  it('should login successfully with default user', async () => {
    const { event, context } = eventAdapter.getLambdaURLEvent({
      method: 'POST',
      service: 'auth',
      path: 'login'
    });

    const result = await authEntry(event, context);
    expect(result.statusCode).toBe(200);
    expect(result).toHaveProperty('body');
    expect(typeof result.body).toBe('string');

    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('data');
    expect(body.data).toBeTruthy();

    token = body.data;
  });

  it('should return user when token verified successfully', () => {
    let verified;

    try {
      const user = authService.verify(token);
      if (user) {
        verified = true;
      }
    } catch {
      verified = false;
    }

    expect(verified).toBeTruthy();
  });
});
