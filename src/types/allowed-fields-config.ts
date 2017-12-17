/**
 * Aloowed fields sonfiguration.
 * @interface AllowedFieldsConfig
 * @property {Fields}  [whiteList]  - List of allowed identifiers (entities and fields) to be used in query.
 * @property {Fields}  [blackList]  - List of identifiers which are prohibited to use in query.
 */

import * as Joi   from 'joi';
import { Fields, FieldsSchema } from './fields';

export interface AllowedFieldsConfig {
  whiteList?: Fields;
  blackList?: Fields;
}

export const AllowedFieldsConfigSchema = Joi.object({
  whiteList: FieldsSchema.optional(),
  blackList: FieldsSchema.optional(),
});
