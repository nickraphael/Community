import { browser, element, by } from 'protractor';

export class BlogsPage {
  navigateTo() {
    return browser.get('/blogs');
  }

  getAddButton() {
    browser.sleep(2000);
    return element(by.id('addButton')).getWebElement();
  }
}
