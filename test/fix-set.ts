import { expect } from 'chai';
import FixSet  from '../src/index';

describe('FieldList', () => {
  it('should throw error if invalid config is provided.', (done) => {
    expect(() => new FixSet({ blackList: 3 as any })).to.throw('"blackList" must be an object');
    done();
  });
});
