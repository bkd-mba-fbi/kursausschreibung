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
  ],
});
