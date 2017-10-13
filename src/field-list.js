// @flow

const getInternal: (FieldList) => Internal = require('internal-data')(); // eslint-disable-line no-use-before-define

/**
 * Relation fields. Keys are relation (table) names, values are fields.
 * Fields can be provided as string or array of strings. ie. `field`, `entity.field` or `entity.*`.
 * `entity.*` covers all fields in that relation.
 * @typedef  {Object.<string, string | string[]>} Fields
 */
type Fields = { [relationName: string]: string | string[] };

/**
 * Private attributes of object.
 * @typedef   {Object}  FieldList~Internal
 * @private
 * @property  {Set} fields - Fields covered by rule.
 */
type Internal = {
  fields: Set<string>
}

const hasDotRx = /\./;

/**
 * @private
 * Class representing db fields rule. A rule consists of relations and fields.
 * Relations and fields can be tested if they are covered by this rule.
 */
class FieldList {
  /**
   * Creates a new DB field rule. `{ entity: '*' }` covers all fields in that relation. Fields without relation name can
   * be added as `{ '': 'surname' }`.
   * @param {Fields} relationFields - Configuration
   * @example
   * const fieldList = new FieldList({ '': ['id'], 'member': '*', manager: ['name', 'surname'], color: 'code' });
   * fieldList.has('member.salary');  // true
   * fieldList.has('member.name');    // true
   * fieldList.has('id');             // true
   * fieldList.has('manager.salary'); // false
   */
  constructor(relationFields: Fields) {
    const internal = getInternal(this);

    internal.fields = new Set();

    Object.keys(relationFields).forEach((relation) => {
      const fields = Array.isArray(relationFields[relation]) ? relationFields[relation] : [relationFields[relation]]; // Make array

      fields.forEach((field) => {
        internal.fields.add(`${relation}.${field}`);
      });
    });
  }

  /**
   * Returns whether given field is covered by this rule. Field name can be provided in single parameter or
   * two parameters: i.e ('name', 'member')  or ('member.name')
   * @param   {string}    field         - Field name to test whether rule contains given field.
   * @param   {string}    [relation=''] - Relation name of the field. If provided field must be in list as `relation.field` or `relation.*`.
   * @returns {boolean}                 - Whether given field is covered by rule.
   * @example
   * fieldList.has('member.name');
   * fieldList.has('name', 'member');
   */
  has(field: string, relation?: string = ''): boolean {
    const internal = getInternal(this);

    if (field.match(hasDotRx)) {
      [relation, field] = field.split('.');
    }

    const fullName = `${relation}.${field}`;
    return internal.fields.has(`${relation}.*`) || internal.fields.has(fullName);
  }
}

export type { Fields };
export default FieldList;
