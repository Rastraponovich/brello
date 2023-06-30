---
to: src/entities/<%=name %>/index.ts
---
export * from './ui';
<<<<<<< HEAD
export * as <%= name %>Lib from './lib';
export * as <%= name %>Model from './model'
=======
export * as <%= h.changeCase.camelCase(name) %>Lib from './lib';
export * as <%= h.changeCase.camelCase(name) %>Model from './model'
>>>>>>> dev

