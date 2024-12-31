import type { Plugin, PluginBuild } from 'esbuild';

export const shimPlugin = (): Plugin => ({
  name: 'shimPlugin',
  setup(build: PluginBuild) {
    const options = build.initialOptions;
    const format =
      (options?.define ?? {})['TSUP_FORMAT']?.toLowerCase().replaceAll('"', '') ?? options.format;

    if (!format) {
      throw new Error(`options.format needs to be defined in order to use plugin`);
    }

    if (format !== 'esm' && format !== 'cjs') {
      throw new TypeError(`options.format must be either "esm" or "cjs". Got "${format}"`);
    }

    if (format === 'esm') {
      options.banner = {
        js: `
const Module = await import('node:module'); 
const require = /* @__PURE__ */ (Module?.default?.createRequire ?? Module?.createRequire)(import.meta.url);
const __filename = /* @__PURE__ */ (await import("node:url")).fileURLToPath(import.meta.url);
const __dirname = /* @__PURE__ */ (await import("node:path")).dirname(__filename);`,
      };
    }

    if (format === 'cjs') {
      options.banner = {
        js: `
const importMetaUrl = /* @__PURE__ */ require("node:url").pathToFileURL(__filename).toString();
const importMetaFilename = /* @__PURE__ */ __filename;
const importMetaDirname = /* @__PURE__ */ __dirname;
const importMetaResolve = /* @__PURE__ */ require.resolve;`,
      };
      options.define = {
        'import.meta.url': 'importMetaUrl',
        'import.meta.filename': 'importMetaFilename',
        'import.meta.dirname': 'importMetaDirname',
        'import.meta.resolve': 'importMetaResolve',
      };
    }
  },
});

export default shimPlugin;
