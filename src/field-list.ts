import { Fields } from "./types";

/**
 * @private
 * Class representing db fields rule. A rule consists of relations and fields.
 * Relations and fields can be tested if they are covered by this rule.
 */
class FieldList {
  private _relations: Map<string, Set<string>>;

  /**
   * Creates a new DB field rule. `{ entity: '*' }` covers all fields in that relation. Fields without relation name can
   * be added as `{ '': 'surname' }`.
   * @param {Fields} relationFields - Configuration
   * @return {FieldList}            - Object
   * @example
   * const fieldList = new FieldList({ '': ['id'], 'member': '*', manager: ['name', 'surname'], color: 'code' });
   * fieldList.has('member.salary');  // true
   * fieldList.has('member.name');    // true
   * fieldList.has('id');             // true
   * fieldList.has('manager.salary'); // false
   */
  constructor(relationFields: Fields) {
    this._relations = new Map();

    Object.keys(relationFields).forEach(relation => {
      const relationField = relationFields[relation];
      const fields = new Set(Array.isArray(relationField) ? relationField : [relationField]);
      this._relations.set(relation, fields);
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
    const fields = this._relations.get(relation);
    return fields !== undefined && (fields.has("*") || fields.has(field));
  }

  /**
   * Returns whether given relation is covered by list.
   * @param   {string}    relation      - Relation name of the field.
   * @returns {boolean}                 - Whether given relation is covered by rule.
   * @example
   * fieldList.hasRelation('member');
   */
  hasRelation(relation: string): boolean {
    return this._relations.has(relation);
  }
}

export default FieldList;
