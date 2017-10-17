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
 * @property  {Map.<string, Set<string>>} relations - Relations covered by rule. Map keys are relation names, map values are set of field names.
 */
type Internal = {
  relations: Map<string, Set<string>>
}

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

    internal.relations = new Map();

    Object.keys(relationFields).forEach((relation) => {
      const fields = new Set(Array.isArray(relationFields[relation]) ? relationFields[relation] : [relationFields[relation]]);
      internal.relations.set(relation, fields);
    });
  }

  /**
   * Returns whether given field in relation is covered by this rule.
   * @param   {string}    field         - Field name to test whether rule contains given field.
   * @param   {string}    relation      - Relation name of the field. Field must be in list as `relation.field` or `relation.*`.
   * @returns {boolean}                 - Whether given field is covered by rule.
   * @example
   * fieldList.has('name', 'member');
   */
  has(field: string, relation: string): boolean {
    const internal = getInternal(this);
    const fields   = internal.relations.get(relation);

    return (fields !== undefined) && (fields.has('*') || fields.has(field));
  }

  /**
   * Returns whether given relation is covered by list.
   * @param   {string}    relation      - Relation name of the field.
   * @returns {boolean}                 - Whether given relation is covered by rule.
   * @example
   * fieldList.hasRelation('member');
   */
  hasRelation(relation: string): boolean {
    return getInternal(this).relations.has(relation);
  }
}

export type { Fields };
export default FieldList;
