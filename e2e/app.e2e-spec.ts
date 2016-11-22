import { CommunityPage } from './app.po';

describe('ng-raphael App', function() {
  let page: CommunityPage;

  beforeEach(() => {
    page = new CommunityPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
