---
to: <%=absPath %>/view.tsx
---

interface <%= h.changeCase.pascalCase(component_name) %>Props {};

export const <%= h.changeCase.pascalCase(component_name) %> = (props: <%= h.changeCase.pascalCase(component_name) %>Props) => {

  return <div>Hello</div>
}



