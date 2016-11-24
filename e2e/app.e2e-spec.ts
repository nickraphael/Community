import { CommunityPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('sapphire App', function() {
  let page: CommunityPage;
  var ptor;

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    page = new CommunityPage();
  });

  it('should display message saying ngCommunity', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ngCommxunity');
  });
});
