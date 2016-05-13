Package.describe({
  name: 'cinn:publication-builder',
  version: '0.1.0',
  summary: 'Simple query generator for meteor apps',
  git: 'https://github.com/cinn-labs/publication-builder',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');

  api.export('PublicationBuilder');

  api.use('ecmascript');
  api.use('meteor-base');

  api.addFiles('publication-builder.server.js', 'server');
});
