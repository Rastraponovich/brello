---
to: src/features/<%=name %>/lib/models.ts
---

export type T<%= Name %> = {
  foo?:'bar'
}

export interface I<%= Name %>Props {
  item: T<%= Name %>;
}


