<!-- DO NOT EDIT README.md (It will be overridden by README.hbs) -->

# allowed-fields

# Description

This module lets developer define white listed and blacklisted database fields and provides a function to check whether
given field is allowed.

# Synopsis

```js
import AllowedFields from 'allowed-fields';
import type { Fields } from 'allowed-fields';

const fields = new AllowedFields({
  whiteList: { '': 'color', member: '*', manager: ['name', 'surname'] },
  blackList: { member: ['salary', 'id'] },
});

// Field may be provided with single string as ('table.field').
fields.isAllowed('color');            // true;
fields.isAllowed('member.name');      // true;
fields.isAllowed('manager.name');     // true;
fields.isAllowed('member.salary');    // false;
fields.isAllowed('zoo.name');         // false;

// Field may be provided with two parameters as ('field', 'table')
fields.isAllowed('name', 'member');   // true;
fields.isAllowed('salary', 'member'); // true;
```

# Details

This module is a utility for checking whether given fields are allowed according to simple blacklist and whitelist
rules.

Blacklist and whitelist are provided using object. Keys are relation (table) names, values are field names. To allow
every field in a table `*`

# API
## Classes

<dl>
<dt><a href="#AllowedFields">AllowedFields</a></dt>
<dd><p>Class which validates database fields using white list and black list.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Fields">Fields</a> : <code>Object.&lt;string, (string|Array.&lt;string&gt;)&gt;</code></dt>
<dd><p>Relation fields. Keys are relation (table) names, values are fields.
Fields can be provided as string or array of strings. ie. <code>field</code>, <code>entity.field</code> or <code>entity.*</code>.
<code>entity.*</code> covers all fields in that relation.</p>
</dd>
</dl>

<a name="AllowedFields"></a>

## AllowedFields
Class which validates database fields using white list and black list.

**Kind**: global class  

* [AllowedFields](#AllowedFields)
    * [new AllowedFields([whiteList], [blackList])](#new_AllowedFields_new)
    * [.isAllowed(field, [relation])](#AllowedFields+isAllowed) ⇒ <code>boolean</code>

<a name="new_AllowedFields_new"></a>

### new AllowedFields([whiteList], [blackList])
Creates object.


| Param | Type | Description |
| --- | --- | --- |
| [whiteList] | [<code>Fields</code>](#Fields) | List of allowed identifiers (entities and fields) to be used in query. |
| [blackList] | [<code>Fields</code>](#Fields) | List of identifiers which are prohibited to use in query. |

**Example**  
```js
const employees = new AllowedFields(
  whiteList: { '': 'color', member: '*', manager: ['name', 'surname'] },
  blackList: { member: ['salary', 'id'] },
);
employees.isAllowed('member.name');    // true
employees.isAllowed('color');          // true
employees.isAllowed('manager.name');   // true
employees.isAllowed('member.salary');  // false
employees.isAllowed('manager.salary'); // false
```
<a name="AllowedFields+isAllowed"></a>

### allowedFields.isAllowed(field, [relation]) ⇒ <code>boolean</code>
Returns whether given field/relation combination is an allowed field according to given rules.
Field name can be provided in single parameter or two parameters: i.e ('name', 'member')  or ('member.name').

**Kind**: instance method of [<code>AllowedFields</code>](#AllowedFields)  
**Returns**: <code>boolean</code> - - Whether field is valid.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | Field name to test. |
| [relation] | <code>string</code> | Relation name which field belongs to. |

**Example**  
```js
allowedFields.isAllowed('member.name');
allowedFields.isAllowed('name', 'member');
```
<a name="Fields"></a>

## Fields : <code>Object.&lt;string, (string\|Array.&lt;string&gt;)&gt;</code>
Relation fields. Keys are relation (table) names, values are fields.
Fields can be provided as string or array of strings. ie. `field`, `entity.field` or `entity.*`.
`entity.*` covers all fields in that relation.

**Kind**: global typedef  
