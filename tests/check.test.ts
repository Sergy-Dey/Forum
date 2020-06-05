describe('Test for test', () => {
  let mongoServer;
  const someVar = 'some value';

  beforeAll(async () => {
    console.log("Test Before");
  });

  afterAll(async () => {
    console.log("Test After");
  });

  it('test-1', async () => {

    expect(null).toEqual(null);
  });

  it('someVar is String', () => {
    expect(typeof someVar).toEqual('string');
  });
});
