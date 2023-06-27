---
to: src/entities/<%=name %>/lib/models.ts
---

export type T<%= h.changeCase.pascalCase(name) %> = {
  foo?:'bar'
}

export interface I<%= h.changeCase.pascalCase(name) %>Props {
  item: T<%= h.changeCase.pascalCase(name) %>;
}


