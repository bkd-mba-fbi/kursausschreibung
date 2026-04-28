import setupDeprecationWorkflow from 'ember-cli-deprecation-workflow';

setupDeprecationWorkflow({
  throwOnUnhandled: true,
  workflow: [
    { handler: 'throw', matchId: 'ember-global' },
    { handler: 'throw', matchId: 'ember.built-in-components.import' },
    {
      handler: 'throw',
      matchId: 'deprecated-run-loop-and-computed-dot-access',
    },
    { handler: 'throw', matchId: 'this-property-fallback' },
    // ember-cli-deprecation-workflow v4.0.1 itself imports from the ember barrel.
    // Silence that addon-internal warning until the addon ships a fix.
    {
      handler: 'silence',
      matchMessage: /importing .* from the 'ember' barrel file is deprecated/i,
    },
  ],
});
