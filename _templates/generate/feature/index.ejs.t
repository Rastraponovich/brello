---
to: src/features/<%=name %>/index.ts
---
export * from './ui';
export * as <%= h.changeCase.camelCase(name) %>Lib from './lib';
export * as <%= h.changeCase.camelCase(name) %>Model from './model'


