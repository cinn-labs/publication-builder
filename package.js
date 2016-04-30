Package.describe({
  name: 'publication-builder',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');

  api.export('PublicationBuilder');

  api.use('ecmascript');
  api.use('meteor-base');

  api.addFiles('publication-builder.server.js', 'server');
});
