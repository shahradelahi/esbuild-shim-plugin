# esbuild-shim-plugin

_esbuild-shim-plugin_ is an [esbuild](https://esbuild.github.io/) plugin that polyfills support for the `import.meta.url` property for [ESM modules](https://nodejs.org/api/esm.html) and the `require`, `__filename`, and `__dirname` properties for [CommonJS modules](https://nodejs.org/api/modules.html).

## 📦 Installation

```sh
pnpm i -D esbuild-shim-plugin
```

## 📖 Usage

```typescript
import { build } from 'esbuild';
import { shimPlugin } from 'esbuild-shim-plugin';

await build({
  format: 'esm',
  plugins: [shimPlugin()],
  // ... rest of the configuration
});
```

###### With `tsup` configuration

```typescript
import { shimPlugin } from 'esbuild-shim-plugin';
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    format: ['cjs', 'esm'],
    esbuildPlugins: [shimPlugin()],
    // ... rest of the configuration
  },
]);
```

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/esbuild-shim-plugin).

Thanks again for your support, it is much appreciated! 🙏

## Relevant

- [ESBuild](https://esbuild.github.io/)
- [EMCAScript Modules](https://nodejs.org/api/esm.html)
- [CommonJS Modules](https://nodejs.org/api/modules.html)

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi)
