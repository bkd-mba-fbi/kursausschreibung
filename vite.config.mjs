import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  // Consumers (Evento ASPX pages, evento-portal) host the module in a
  // sub directory and embed it with classic <script src="assets/app.js">
  // and <link href="assets/app.css"> tags, so the output must be:
  //   * exactly one JS and one CSS file (no chunks, see #221),
  //   * with stable, unhashed names,
  //   * referenced by relative paths.
  base: './',
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
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
      },
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
  ],
});
