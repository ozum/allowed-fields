// @flow
/**
 * Relation fields. Keys are relation (table) names, values are fields.
 * Fields can be provided as string or array of strings. ie. `field`, `entity.field` or `entity.*`.
 * `entity.*` covers all fields in that relation.
 * @typedef  {Object.<string, string | string[]>} Fields
 */
export type Fields = { [relationName: string]: string | string[] };

1; // eslint-disable-line no-unused-expressions
