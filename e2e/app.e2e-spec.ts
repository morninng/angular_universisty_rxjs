import { Rxjs11PracticePage } from './app.po';

describe('rxjs-11-practice App', function() {
  let page: Rxjs11PracticePage;

  beforeEach(() => {
    page = new Rxjs11PracticePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
