import { Page } from '@playwright/test';

export class HomePage {
  constructor(public page: Page) {}

  public get alexaLink(){
    return this.page.getByTestId('heroContainer').getByTestId('button').getByRole('paragraph');
  }

  public get stationSelector() {
    return this.page.getByTestId('STATION_SELECTOR_TITLE');
  }

  public get stationSelectorTitle() {
    return this.stationSelector.getByRole('heading');
  }

  public get drawerButton() {
    return this.page.getByTestId('DRAWER_MENU_BUTTON');
  }

  public get drawerHome() {
    return this.page.getByRole('link').filter({hasText:'Home'});
  }

  public get drawerNews() {
    return this.page.getByTestId('MENU_ITEM_31236_DRAWER');
  }

  public get drawerShows() {
    return this.page.getByTestId('MENU_ITEM_371_DRAWER');
  }

  public get drawerScheduleAndCatchup() {
    return this.page.getByTestId('MENU_ITEM_380_DRAWER');
  }

  public get drawerWIn() {
    return this.page.getByTestId('MENU_ITEM_31237_DRAWER');
  }

  public get drawerSingIn() {
    return this.page.getByTestId('SIGN_IN_DRAWER');
  }

  public get drawerMenu() {
    return this.page.getByTestId('drawer');
  }

  public get drawerCloseButton() {
    return this.drawerMenu.getByTestId('button');
  }

  public get drawerMusic() {
    return this.page.getByTestId('MENU_ITEM_31236_SUBMENU_ITEM_31238_DRAWER');
  }

  public get drawerEntertainment() {
    return this.page.getByTestId('MENU_ITEM_31236_SUBMENU_ITEM_31239_DRAWER');
  }

  public get pageSecondaryBannerHeading(){
    return this.page.getByTestId('SECONDARY_BANNER').getByRole('heading');
  }

  public get logoLink(){
    return this.page.getByTestId('logoLink');
  }

  public get radio80s(){
    return this.page.getByTestId('CARD_CLICKABLE_StationSelector_2');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async acceptConsent() {
    await this.page.frameLocator('iframe[title="SP Consent Message"]').getByLabel('I Agree').click();
  }

//   async checkIfPlayerIsVisible() {
//     return this.page.isVisible('.player-container');
//   }

//   async navigateToContact() {
//     await this.page.click('text="Contact"');
//   }
}
