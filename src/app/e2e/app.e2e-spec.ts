
import { protractor } from 'protractor';
import { CommunityPage } from './app.po';

describe('community App', function() {
  let page: CommunityPage;
  var ptor;

  beforeEach(() => {
    ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;

    page = new CommunityPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
