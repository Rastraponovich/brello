---
to: src/entities/<%=name %>/model/model.ts
---

import {createStore} from 'effector';
import {T<%= Name %>} from '../lib';


export const $<%=name %> = createStore<T<%= Name %> | null>(null);

export const actions = {};



