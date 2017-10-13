import FieldList from '../src/field-list';

const Code = require('code');

const { expect }  = Code;

const fieldList = new FieldList({
  '':      ['id'],
  member:  '*',
  manager: ['name', 'surname'],
  color:   'code',
});

describe('fieldList.has()', () => {
  it('should return true for existing field without relation. (1 parameter)', (done) => {
    expect(fieldList.has('id')).to.be.true();
    done();
  });

  it('should return true for existing field contained by * (1 parameter).', (done) => {
    expect(fieldList.has('member.name')).to.be.true();
    done();
  });

  it('should return true for existing field contained by * (2 parameters).', (done) => {
    expect(fieldList.has('name', 'member')).to.be.true();
    done();
  });

  it('should return true for existing field with relation. (1 parameter)', (done) => {
    expect(fieldList.has('manager.name')).to.be.true();
    done();
  });

  it('should return true for existing field with relation. (2 parameters)', (done) => {
    expect(fieldList.has('name', 'manager')).to.be.true();
    done();
  });

  it('should return true for existing field included by string. (1 parameter)', (done) => {
    expect(fieldList.has('color.code')).to.be.true();
    done();
  });

  it('should return true for existing field included by string. (2 parameters)', (done) => {
    expect(fieldList.has('code', 'color')).to.be.true();
    done();
  });

  it('should return false for non-existing field. (1 parameter)', (done) => {
    expect(fieldList.has('color.xyz')).to.be.false();
    done();
  });

  it('should return false for non-existing field. (2 parameters)', (done) => {
    expect(fieldList.has('xyz', 'color')).to.be.false();
    done();
  });

  it('should return false for non-existing relation. (1 parameters)', (done) => {
    expect(fieldList.has('zoo.id')).to.be.false();
    done();
  });
});
