import XHJsonApi from '../../src/xhjsonapi';

describe('XHJsonApi', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(XHJsonApi, 'greet');
      XHJsonApi.greet();
    });

    it('should have been run once', () => {
      expect(XHJsonApi.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(XHJsonApi.greet).to.have.always.returned('hello');
    });
  });
});
