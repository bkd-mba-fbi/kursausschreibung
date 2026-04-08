self.deprecationWorkflow = self.deprecationWorkflow || {};

self.deprecationWorkflow.config = {
  workflow: [
    { handler: 'throw', matchId: 'ember-global' },
    { handler: 'throw', matchId: 'ember.built-in-components.import' },
    { handler: 'throw', matchId: 'deprecated-run-loop-and-computed-dot-access' },
    { handler: 'throw', matchId: 'this-property-fallback' },
  ],
  throwOnUnhandled: false,
};
