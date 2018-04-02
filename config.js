exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    'browserName' : 'chrome'
  },
  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },
  specs: ['spec.js'],

jasmineNodeOpts: {
  showColors : true,
  defaultTimeoutInterval: 30000
}
};
