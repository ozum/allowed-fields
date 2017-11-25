// @flow

import InternalData from 'internal-data';
import FieldList from './field-list';
import type { Fields } from './types';

const internalData: InternalData<AllowedFields, Internal> = new InternalData(); // eslint-disable-line no-use-before-define

/**
 * Private attributes of object.
 * @typedef   {Object}          AllowedFields~Internal
 * @private
 * @property  {Fields}  whiteList             - Rule for allowed fields and relations.
 * @property  {Fields}  blackList             - Rule for disallowed fields and relations.
 */
type Internal = {
  whiteList?: FieldList,
  blackList?: FieldList
};

/**
 * Class which validates database fields using white list and black list.
 */
class AllowedFields {
  /**
   * Creates object.
   * @param     {Fields}  [whiteList]     - List of allowed identifiers (entities and fields) to be used in query.
   * @param     {Fields}  [blackList]     - List of identifiers which are prohibited to use in query.
   * @example
   * const employees = new AllowedFields(
   *   whiteList: { '': 'color', member: '*', manager: ['name', 'surname'] },
   *   blackList: { member: ['salary', 'id'] },
   * );
   * employees.isAllowed('member.name');    // true
   * employees.isAllowed('color');          // true
   * employees.isAllowed('manager.name');   // true
   * employees.isAllowed('member.salary');  // false
   * employees.isAllowed('manager.salary'); // false
   */
  constructor({ whiteList, blackList }: {| whiteList?: Fields, blackList?: Fields |}) {
    const internal = internalData.get(this);

    internal.whiteList = whiteList ? new FieldList(whiteList) : undefined;
    internal.blackList = blackList ? new FieldList(blackList) : undefined;
  }

  /**
   * Returns whether given field/relation combination is an allowed field according to given rules.
   * Field name can be provided in single parameter or two parameters: i.e ('name', 'member')  or ('member.name').
   * @param     {string}          field           - Field name to test. i.e `'name'`. Also it may contain field name such as 'member.name'
   * @param     {string}          [relation='']   - Relation name which field belongs to.
   * @returns   {boolean}                         - Whether field is valid.
   * @example
   * allowedFields.isAllowed('member.name');
   * allowedFields.isAllowed('name', 'member');
   */
  isAllowed(field: string, relation?: string = ''): boolean {
    const internal  = internalData.get(this);
    const { whiteList, blackList } = internal;

    if (field.match(/\./)) {
      [relation, field] = field.split('.');
    }

    // * return false. Also relation.* returns false if any field of the relation is in blacklist.
    const starError      = field === '*' && (!relation || (blackList && blackList.hasRelation(relation)));
    const whiteListError = whiteList && !whiteList.has(field, relation);
    const blackListError = blackList && blackList.has(field, relation);

    return !(starError || whiteListError || blackListError);
  }
}

export type { Fields };
export default AllowedFields;
