---
to: src/entities/<%=name %>/ui/index.tsx
---
import {memo} from 'react';
import {I<%= Name %>Props} from '../lib'


export const <%= Name %> = memo<I<%=Name %>Props>((props) => {

  return <div>Hello</div>
})
<%= Name %>.displayName = '<%=Name %>'



