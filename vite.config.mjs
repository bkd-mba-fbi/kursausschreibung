import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

// Consumers (evento-portal and the schools' pages) host the module in a
// sub directory and embed it with classic <script src="assets/app.js">
// and <link href="assets/app.css"> tags, so the production output must be:
//   * exactly one JS and one CSS file (no chunks, see #221),
//   * with stable, unhashed names,
//   * referenced by relative paths.
// The test build (`vite build --mode development`) has a second entry
// (tests/index.html) and cannot be forced into a single bundle.
const singleBundleOutput = {
  // classic script (no type="module" needed by consumers)
  format: 'iife',
  inlineDynamicImports: true,
  // What Embroider otherwise serves as /@embroider/virtual/vendor.js:
  // must run before ember-source is evaluated. Keep in sync with
  // config/optional-features.json and config/environment.js EmberENV.
  banner: [
    'window.EmberENV={ ...(window.EmberENV || {}), ...{',
    '  "EXTEND_PROTOTYPES": false,',
    '  "FEATURES": {},',
    '  "_APPLICATION_TEMPLATE_WRAPPER": false,',
    '  "_JQUERY_INTEGRATION": false,',
    '  "_TEMPLATE_ONLY_GLIMMER_COMPONENTS": true',
    '} };window.runningTests=false;',
  ].join('\n'),
  entryFileNames: 'assets/app.js',
  chunkFileNames: 'assets/[name].js',
  assetFileNames: (asset) =>
    asset.names?.some((n) => n.endsWith('.css')) ||
    asset.name?.endsWith('.css')
      ? 'assets/app.css'
      : 'assets/[name][extname]',
};

// Embroider still emits /@embroider/virtual/{vendor,app,test-support}.*
// into dist. In production nothing references them (vendor.js content is
// the banner above, the css is bundled into assets/app.css), so keep them
// out of the deliverable.
const dropEmbroiderVirtualFiles = {
  name: 'kursausschreibung:drop-embroider-virtual-files',
  apply: 'build',
  generateBundle(_options, bundle) {
    for (const fileName of Object.keys(bundle)) {
      if (fileName.startsWith('@embroider/virtual/')) {
        delete bundle[fileName];
      }
    }
  },
};

export default defineConfig(({ mode }) => ({
  // Relative paths for the embedded production build only. The test build
  // has tests/index.html as a second entry, where './@embroider/...' would
  // point into dist/tests/ instead of dist/.
  base: mode === 'production' ? './' : '/',
  server: {
    // same port as `ember serve` used to have
    port: 4200,
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: mode === 'production' ? singleBundleOutput : {},
    },
  },
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
    ...(mode === 'production' ? [dropEmbroiderVirtualFiles] : []),
  ],
}));
