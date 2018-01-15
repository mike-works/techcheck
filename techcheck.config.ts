module.exports = {
  verify: [
    { name: 'openssl', version: /2.2.7/ },
    { name: 'node', version: { semver: '^9.2.0' } },
    { name: 'postgres', version: { semver: { min: '9.0.0' } } },
    { name: 'git', version: { semver: { min: '2.0.0' } } },
    { name: 'ember-cli', version: { semver: { min: '2.14.0' } } },
    { name: 'travis', version: { semver: { min: '1.8.0' } } }
  ]
};
