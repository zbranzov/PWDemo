import { test, expect } from '@playwright/test';

test.describe('VR home page', () => {
  let drawer;
  test.beforeEach(async ({ page }) => {
    await page.goto('https://staging.virginradio.co.uk/');
    await page.frameLocator('iframe[title="SP Consent Message"]').getByLabel('I Agree').click();
    drawer = page.getByTestId('DRAWER_MENU_BUTTON');
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('Virgin Radio UK | Listen Live | Great Fun, Great Guests, Great Music.');
  });
  
  test('get Alexa link', async ({ page }) => {
    await expect(page.getByTestId('heroContainer')
      .getByTestId('button').getByRole('paragraph')).toContainText('Link my Alexa');
  });
  
  test('has list of stations', async ({ page }) => {
    await expect(page.getByTestId('STATION_SELECTOR_TITLE')
      .getByRole('heading')).toContainText('Listen to more stations from Virgin Radio UK');
    await expect(page.getByTestId('STATION_SELECTOR')).toBeVisible();
  });
  
  test.only('has a drawer menu', async ({ page }) => {
    await expect(drawer).toBeVisible();
    await drawer.click();
    await expect(page.getByRole('link').filter({hasText:'Home'})).toBeVisible();
    await expect(page.getByRole('link').filter({hasText:'Home'})).toHaveAttribute('href','/');
    await expect(page.getByTestId('MENU_ITEM_31236_DRAWER')).toContainText('News');
    await expect(page.getByTestId('MENU_ITEM_31236_DRAWER')).toBeVisible();
    await expect(page.getByTestId('MENU_ITEM_371_DRAWER')).toContainText('Shows');
    await expect(page.getByTestId('MENU_ITEM_371_DRAWER')).toBeVisible();
    await expect(page.getByTestId('MENU_ITEM_380_DRAWER')).toContainText('Schedule & Catchup');
    await expect(page.getByTestId('MENU_ITEM_380_DRAWER')).toBeVisible();
    await expect(page.getByTestId('MENU_ITEM_31237_DRAWER')).toContainText('Win');
    await expect(page.getByTestId('MENU_ITEM_31237_DRAWER')).toBeVisible();
    await expect(page.getByTestId('SIGN_IN_DRAWER')).toContainText('Sign in');
    await expect(page.getByTestId('SIGN_IN_DRAWER')).toBeVisible();
  });
  
  test.only('close drawer', async ({ page }) => {
    await drawer.click();
    await page.getByTestId('drawer').getByTestId('button').click();
    await expect(page.getByTestId('logoLink')).toBeVisible();
  });

  test.only('UWP player', async ({ page }) => {
    const page2PopUp = page.waitForEvent('popup');
    await page.getByTestId('CARD_CLICKABLE_StationSelector_2').click();
    const page2 = await page2PopUp;
    await page2.getByText('Schedule & Catch-Up').isVisible();
    await page2.getByTestId('talksport').first().click();
    await page2.getByTestId('PLAYER_playButton').click();
    await page2.getByTestId('AUTH_MODAL_closeBtn').locator('path').click();
  });

  test.describe('Page drawer', () => {
    test.beforeEach(async ({ page }) => {
      await drawer.click();
    })

    test('has Music section', async ({ page }) => {
      await page.getByTestId('MENU_ITEM_31236_DRAWER').click();
      await expect(page.getByTestId('MENU_ITEM_31236_SUBMENU_ITEM_31238_DRAWER')).toBeVisible();
      await expect(page.getByTestId('MENU_ITEM_31236_SUBMENU_ITEM_31238_DRAWER')).toContainText('Music');
      await page.getByTestId('MENU_ITEM_31236_SUBMENU_ITEM_31238_DRAWER').click();
      await expect(page.getByTestId('SECONDARY_BANNER').getByRole('heading')).toContainText('Music');
    });

    test('has Entertainment section', async ({ page }) => {
      await page.getByTestId('MENU_ITEM_31236_DRAWER').click();
      await page.getByTestId('MENU_ITEM_31236_SUBMENU_ITEM_31239_DRAWER').click();
      await expect(page.getByTestId('SECONDARY_BANNER').getByRole('heading')).toContainText('Entertainment');
    });
  })
})



