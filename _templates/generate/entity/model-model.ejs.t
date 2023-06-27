---
to: src/entities/<%=name %>/model/model.ts
---

import {createStore} from 'effector';
import {T<%= h.changeCase.pascalCase(name) %>} from '../lib';


export const $<%=h.changeCase.camelCase(name) %> = createStore<T<%= h.changeCase.pascalCase(name) %> | null>(null);

export const actions = {};



