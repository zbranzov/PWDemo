import { Page } from '@playwright/test';

export class UWPPage {
  constructor(public page: Page) {}
  
  public get scheduleTitle(){
    return this.page.getByText('Schedule & Catch-Up');
  }

  public get talkSportStation(){
    return this.page.getByTestId('talksport').first();
  }

  public get playerPlayButton(){
    return this.page.getByTestId('PLAYER_playButton');
  }

  public get authDialogCloseButton() {
    return this.page.getByTestId('AUTH_MODAL_closeBtn').locator('path');
  }
}
