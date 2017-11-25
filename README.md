<!-- DO NOT EDIT README.md (It will be overridden by README.hbs) -->

# allowed-fields

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [Synopsis](#synopsis)
    - [Flow](#flow)
    - [Vanilla JS](#vanilla-js)
- [Details](#details)
- [API](#api)
  - [Classes](#classes)
  - [Typedefs](#typedefs)
  - [AllowedFields](#allowedfields)
    - [new AllowedFields([whiteList], [blackList])](#new-allowedfieldswhitelist-blacklist)
    - [allowedFields.isAllowed(field, [relation]) ⇒ <code>boolean</code>](#allowedfieldsisallowedfield-relation-%E2%87%92-codebooleancode)
  - [Fields : <code>Object.&lt;string, (string\|Array.&lt;string&gt;)&gt;</code>](#fields--codeobjectltstring-string%5Carrayltstringgtgtcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Description

This module lets developer define white listed and black listed database fields and provides a function to check whether
given field is allowed.

# Synopsis

### Flow

```js
import AllowedFields from 'allowed-fields';
import type { Fields } from 'allowed-fields';   // In case you need the type (see API below) for whiteList and blackList
```

### Vanilla JS

```js
const AllowedFields = require('allowed-fields');

const fields = new AllowedFields({
  whiteList: { '': 'color', member: '*', company: '*', manager: ['name'] },
  blackList: { member: ['salary'] },
});

// Field may be provided with single string as ('table.field').
fields.isAllowed('color');            // true  (color is allowed without relation name)
fields.isAllowed('member.name');      // true  (All fields (*) of member except 'salary' is allowed)
fields.isAllowed('manager.name');     // true  (It is in white list)
fields.isAllowed('member.salary');    // false (It is in black list)
fields.isAllowed('zoo.name');         // false (It is not in white list)
fields.isAllowed('member.*');         // false (Member salary is black listed. All fields (*) except salary are allowed)
fields.isAllowed('company.*');        // true  (All fields (*) of company is in white list)

// Field may be provided with two parameters as ('field', 'table')
fields.isAllowed('name', 'member');   // true;
fields.isAllowed('salary', 'member'); // false;
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
<dd><p>Class which validates database fields using white list and black list.</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Fields">Fields</a> : <code>Object.&lt;string, (string|Array.&lt;string&gt;)&gt;</code></dt>
<dd><p>Relation fields. Keys are relation (table) names, values are fields.
Fields can be provided as string or array of strings. ie. <code>field</code>, <code>entity.field</code> or <code>entity.<em></code>.
<code>entity.</em></code> covers all fields in that relation.</p></dd>
</dl>

<a name="AllowedFields"></a>

## AllowedFields
<p>Class which validates database fields using white list and black list.</p>

**Kind**: global class  

* [AllowedFields](#AllowedFields)
    * [new AllowedFields([whiteList], [blackList])](#new_AllowedFields_new)
    * [.isAllowed(field, [relation])](#AllowedFields+isAllowed) ⇒ <code>boolean</code>

<a name="new_AllowedFields_new"></a>

### new AllowedFields([whiteList], [blackList])
<p>Creates object.</p>


| Param | Type | Description |
| --- | --- | --- |
| [whiteList] | [<code>Fields</code>](#Fields) | <p>List of allowed identifiers (entities and fields) to be used in query.</p> |
| [blackList] | [<code>Fields</code>](#Fields) | <p>List of identifiers which are prohibited to use in query.</p> |

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
<p>Returns whether given field/relation combination is an allowed field according to given rules.
Field name can be provided in single parameter or two parameters: i.e ('name', 'member')  or ('member.name').</p>

**Kind**: instance method of [<code>AllowedFields</code>](#AllowedFields)  
**Returns**: <code>boolean</code> - <ul>
<li>Whether field is valid.</li>
</ul>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| field | <code>string</code> |  | <p>Field name to test. i.e <code>'name'</code>. Also it may contain field name such as 'member.name'</p> |
| [relation] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | <p>Relation name which field belongs to.</p> |

**Example**  
```js
allowedFields.isAllowed('member.name');
allowedFields.isAllowed('name', 'member');
```
<a name="Fields"></a>

## Fields : <code>Object.&lt;string, (string\|Array.&lt;string&gt;)&gt;</code>
<p>Relation fields. Keys are relation (table) names, values are fields.
Fields can be provided as string or array of strings. ie. <code>field</code>, <code>entity.field</code> or <code>entity.*</code>.
<code>entity.*</code> covers all fields in that relation.</p>

**Kind**: global typedef  
