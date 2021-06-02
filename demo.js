var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder()
            .usingServer('http://10.10.31.211:6666/wd/hub')
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
driver.get("http://www.google.com");
driver.getTitle().then(function(title) {
  console.log('Page title is: ' + title);
});
driver.quit();
console.log("Done");