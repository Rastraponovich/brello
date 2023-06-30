---
to: src/features/<%=name %>/ui/index.tsx
---
import {memo} from 'react';
<<<<<<< HEAD
import {I<%= Name %>Props} from '../lib'


export const <%= Name %> = memo<I<%=Name %>Props>((props) => {

  return <div>Hello</div>
})
<%= Name %>.displayName = '<%=Name %>'
=======
import {I<%= h.changeCase.pascalCase(name) %>Props} from '../lib'


export const <%= h.changeCase.pascalCase(name) %> = memo<I<%=h.changeCase.pascalCase(name) %>Props>((props) => {

  return <div>Hello</div>
})
<%= h.changeCase.pascalCase(name) %>.displayName = '<%= h.changeCase.pascalCase(name) %>'
>>>>>>> dev



