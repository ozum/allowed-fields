/**
 * Relation fields. Keys are relation (table) names, values are fields.
 * Fields can be provided as string or array of strings. ie. `field`, `entity.field` or `entity.*`.
 * `entity.*` covers all fields in that relation.
 * @typedef  {Object.<string, string | string[]>} Fields
 * @example
 * const fields = {
 *   '': 'name',                  // Field name without table.
 *   'person': 'name',            // Single field from `person` table.
 *   'cart':   ['name', 'color'], // Some fields from `cart` table.
 *   'report': '*',               // All fields from `report` table.
 * }
 */

import * as Joi from "joi";

export type Fields = { [relationName: string]: string | string[] };

export const FieldsSchema = Joi.object().pattern(/.*?/, Joi.alternatives(Joi.string(), Joi.array().items(Joi.string())));
