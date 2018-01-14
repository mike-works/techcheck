module.exports = {
  verify: [
    { name: 'openssl', version: /2.2.7/ },
    { name: 'node', version: { semver: '^9.2.0' } },
    { name: 'postgres', version: { semver: { min: '9.0.0' } } }
  ]
};
