import AllowedFields from '../src';

const Code = require('code');

const { expect }  = Code;

const allowedFields = new AllowedFields({
  whiteList: { '': 'color', member: '*', manager: ['name', 'surname'] },
  blackList: { member: ['salary', 'id'] },
});

const blackOnly = new AllowedFields({
  blackList: { member: ['salary', 'id'] },
});

const whiteOnly = new AllowedFields({
  whiteList: { member: '*' },
});

describe('allowedFields.isAllowed()', () => {
  it('should return true for whitelisted field without relation.', (done) => {
    expect(allowedFields.isAllowed('color')).to.be.true();
    done();
  });

  it('should return true for whitelisted field contained by *.', (done) => {
    expect(allowedFields.isAllowed('member.name')).to.be.true();
    done();
  });

  it('should return true for whitelisted field with relation.', (done) => {
    expect(allowedFields.isAllowed('manager.name')).to.be.true();
    done();
  });

  it('should return false for blacklisted field.', (done) => {
    expect(allowedFields.isAllowed('member.salary')).to.be.false();
    done();
  });

  it('should return false for non-blacklisted fields if no whitelist is provided.', (done) => {
    expect(blackOnly.isAllowed('member.name')).to.be.true();
    done();
  });

  it('should return false for blacklisted fields if no whitelist is provided.', (done) => {
    expect(blackOnly.isAllowed('member.salary')).to.be.false();
    done();
  });

  it('should return true for whitelisted fields if no blacklist is provided.', (done) => {
    expect(whiteOnly.isAllowed('member.name')).to.be.true();
    done();
  });

  it('should return false for non-whitelisted fields if no blacklist is provided.', (done) => {
    expect(whiteOnly.isAllowed('manager.salary')).to.be.false();
    done();
  });
});
