import { MinesweeperNgPage } from './app.po';

describe('minesweeper-ng App', () => {
  let page: MinesweeperNgPage;

  beforeEach(() => {
    page = new MinesweeperNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
