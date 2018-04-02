describe('Todo app', function() {

beforeEach(function() {
var origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function () {
var args = arguments;
// queue 100ms wait
origFn.call(browser.driver.controlFlow(), function () {
return protractor.promise.delayed(10);   // here we can adjust the execution speed
});
return origFn.apply(browser.driver.controlFlow(), args);
};

});



  it('edit task', function() {

    browser.get('http://todomvc.com/examples/vue/');

    $('.new-todo').click();

    $('.new-todo').sendKeys('test item');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    browser.actions().doubleClick(element.all(by.css('.todo')).get(0)).perform();

    element.all(by.css('.edit')).get(0).sendKeys(' - edited');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    var editItem = element.all(by.css('.todo')).get(0);

    expect(editItem.getText()).toBe('test item - edited');

    browser.executeScript('window.localStorage.clear();');
  });

  it('delete a task', function() {

    browser.get('http://todomvc.com/examples/vue/');

    $('.new-todo').click();

    $('.new-todo').sendKeys('test item');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    browser.actions().mouseMove(element.all(by.css('.todo')).get(0)).perform();

    browser.actions().click(element.all(by.css('.destroy')).get(0)).perform();

    expect(element.all(by.css('.todo')).count()).toBe(0);

    browser.executeScript('window.localStorage.clear();');
  });

  it('complete a task', function() {

    browser.get('http://todomvc.com/examples/vue/');

    $('.new-todo').click();

    $('.new-todo').sendKeys('test item');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    browser.actions().mouseMove(element.all(by.css('.todo')).get(0)).perform();

    browser.actions().click(element.all(by.css('.toggle')).get(0)).perform();

    browser.actions().click(element.all(by.css('.completed')).get(0)).perform();

    expect(element.all(by.css('.todo')).get(0).getText()).toBe('test item');

    browser.executeScript('window.localStorage.clear();');

  });

  it('adding multiple task', function() {

    browser.get('http://todomvc.com/examples/vue/');

    $('.new-todo').click();

    $('.new-todo').sendKeys('task a');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    $('.new-todo').click();

    $('.new-todo').sendKeys('task b');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    $('.new-todo').click();

    $('.new-todo').sendKeys('task c');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    ['a', 'b', 'c'].forEach(function(char, index) {
      element.all(by.css('.todo')).get(index).getText().then(function(text) {
        expect(text).toBe('task ' + char);
      });
    });

    expect(element(by.css('.todo-count')).getText()).toBe('3 items left');

    browser.executeScript('window.localStorage.clear();');
  });

  it('should accept multiple spaces', function() {

    browser.get('http://todomvc.com/examples/vue/');

    $('.new-todo').click();

    $('.new-todo').sendKeys('test      item');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    var todoItem = $$('.todo-list label').last();

    expect(todoItem.getText()).toContain('test      item');

    browser.executeScript('window.localStorage.clear();');

  });


});
