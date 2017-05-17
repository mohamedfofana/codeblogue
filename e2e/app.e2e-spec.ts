import { CodebloguePage } from './app.po';

describe('codeblogue App', () => {
  let page: CodebloguePage;

  beforeEach(() => {
    page = new CodebloguePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
