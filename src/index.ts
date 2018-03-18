import * as Joi from "joi";
import FieldList from "./field-list";
import { AllowedFieldsConfig, AllowedFieldsConfigSchema } from "./types/index";

/**
 * Class which validates database fields using white list and black list.
 */
class AllowedFields {
  private _whiteList?: FieldList;
  private _blackList?: FieldList;

  /**
   * Creates object.
   * @param     {Object}  [config]            - Configuration
   * @param     {Fields}  [config.whiteList]  - List of allowed identifiers (entities and fields) to be used in query.
   * @param     {Fields}  [config.blackList]  - List of identifiers which are prohibited to use in query.
   * @return    {AllowedFields}               - Allowed fields
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
  constructor(config: AllowedFieldsConfig) {
    const validation = Joi.validate(config, AllowedFieldsConfigSchema);
    const { whiteList, blackList } = config;

    if (validation.error) {
      throw new Error(validation.error.annotate());
    }

    this._whiteList = whiteList ? new FieldList(whiteList) : undefined;
    this._blackList = blackList ? new FieldList(blackList) : undefined;
  }

  /**
   * Returns whether given field/relation combination is an allowed field according to given rules.
   * Field name can be provided in single parameter or two parameters: i.e ('name', 'member')  or ('member.name').
   * @param     {string}          fieldName           - Field name to test. i.e `'name'`. Also it may contain field name such as 'member.name'
   * @param     {string}          [relationName='']   - Relation name which field belongs to.
   * @returns   {boolean}                             - Whether field is valid.
   * @example
   * allowedFields.isAllowed('member.name');    // Table and field as a single string.
   * allowedFields.isAllowed('name', 'member'); // Field, Table.
   */
  isAllowed(fieldName: string, relationName: string = ""): boolean {
    const [relation, field] = fieldName.match(/\./) ? fieldName.split(".") : [relationName, fieldName];

    // * return false. Also relation.* returns false if any field of the relation is in blacklist.
    const starError = field === "*" && (!relation || (this._blackList && this._blackList.hasRelation(relation)));
    const whiteListError = this._whiteList && !this._whiteList.has(field, relation);
    const blackListError = this._blackList && this._blackList.has(field, relation);

    return !(starError || whiteListError || blackListError);
  }
}

export { AllowedFieldsConfig };
export default AllowedFields;
