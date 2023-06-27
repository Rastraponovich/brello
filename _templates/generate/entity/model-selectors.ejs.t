---
to: src/entities/<%=name %>/model/selectors.ts
---
import {useUnit} from 'effector-react';
import {$<%= h.changeCase.camelCase(name) %>} from './model';


export const use<%= h.changeCase.pascalCase(name) %> = () => useUnit($<%= h.changeCase.camelCase(name) %>)



