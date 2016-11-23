
import { protractor } from 'protractor';
import { BlogsPage } from './app.blogs';

describe('Blogs Page', function() {
  let page: BlogsPage;
  var ptor;

  beforeEach(() => {
    ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;

    page = new BlogsPage();
  });

  it('addButton should open popup', () => {
    page.navigateTo();
    let addButton = page.getAddButton();
    addButton.click();
  });
});
