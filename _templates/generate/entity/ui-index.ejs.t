---
to: src/entities/<%=name %>/ui/index.tsx
---
import {memo} from 'react';
import {I<%= h.changeCase.pascalCase(name) %>Props} from '../lib'


export const <%= h.changeCase.pascalCase(name) %> = memo<I<%=h.changeCase.pascalCase(name) %>Props>((props) => {

  return <div>Hello</div>
})
<%= h.changeCase.pascalCase(name) %>.displayName = '<%=h.changeCase.pascalCase(name) %>'



