import { test, expect, chromium } from '@playwright/test';
import { HomePage } from './pages/homePage';
import { UWPPage } from './pages/uwpPage';

test.describe('VR home page', () => {
  let homePage:HomePage;
  let page;
  // test.beforeAll('setup', async ({browser}) => {
  //   const context = await browser.newContext();
  //   page = await context.newPage();
  //   homePage = new HomePage(page);
  // })
  test.beforeEach(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.acceptConsent();
  })

  test.afterEach('setup', async ({browser}) => {
    await page.close();
  })

  test.only('has title', async () => {
    await expect(homePage.page).toHaveTitle('Virgin Radio UK | Listen Live | Great Fun, Great Guests, Great Music.');
  });
  
  test('get Alexa link', async () => {
    await expect(homePage.alexaLink).toContainText('Link my Alexa');
  });
  
  test('has list of stations', async () => {
    await expect(homePage.stationSelectorTitle).toContainText('Listen to more stations from Virgin Radio UK');
    await expect(homePage.stationSelector).toBeVisible();
  });
  
  test('has a drawer menu', async () => {
    await expect(homePage.drawerButton).toBeVisible();
    await homePage.drawerButton.click();
    await expect(homePage.drawerHome).toBeVisible();
    await expect(homePage.drawerHome).toHaveAttribute('href','/');
    await expect(homePage.drawerNews).toContainText('News');
    await expect(homePage.drawerNews).toBeVisible();
    await expect(homePage.drawerShows).toContainText('Shows');
    await expect(homePage.drawerShows).toBeVisible();
    await expect(homePage.drawerScheduleAndCatchup).toContainText('Schedule & Catchup');
    await expect(homePage.drawerScheduleAndCatchup).toBeVisible();
    await expect(homePage.drawerWIn).toContainText('Win');
    await expect(homePage.drawerWIn).toBeVisible();
    await expect(homePage.drawerSingIn).toContainText('Sign in');
    await expect(homePage.drawerSingIn).toBeVisible();
  });
  
  test('close drawer', async () => {
    await homePage.drawerButton.click();
    await homePage.drawerCloseButton.click();
    await expect(homePage.logoLink).toBeVisible();
  });

  test('UWP player', async () => {
    const page2PopUp = homePage.page.waitForEvent('popup');
    await homePage.radio80s.click();
    const page2 = await page2PopUp;
    const uwpPage = new UWPPage(page2);
    await uwpPage.scheduleTitle.isVisible();
    await uwpPage.talkSportStation.click();
    await uwpPage.playerPlayButton.click();
    await uwpPage.authDialogCloseButton.click();
  });

  test.describe('Page drawer', () => {
    test.beforeEach(async ({  }) => {
      await homePage.drawerButton.click();
    })

    test('has Music section', async ({  }) => {
      await homePage.drawerNews.click();
      await expect(homePage.drawerMusic).toBeVisible();
      await expect(homePage.drawerMusic).toContainText('Music');
      await homePage.drawerMusic.click();
      await expect(homePage.pageSecondaryBannerHeading).toContainText('Music');
    });

    test('has Entertainment section', async ({  }) => {
      await homePage.drawerNews.click();
      await homePage.drawerEntertainment.click();
      await expect(homePage.pageSecondaryBannerHeading).toContainText('Entertainment');
    });
  })
})



