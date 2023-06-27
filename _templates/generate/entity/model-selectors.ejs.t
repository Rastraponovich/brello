---
to: src/entities/<%=name %>/model/selectors.ts
---
import {useUnit} from 'effector-react';
import {$<%= name %>} from './model';


export const use<%=Name%> = () => useUnit($<%= name %>)



