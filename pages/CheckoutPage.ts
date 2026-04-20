import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  // Sélecteurs formulaire
  private firstNameInput = '[data-test="firstName"]';
  private lastNameInput = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private backHomeButton = '[data-test="back-to-products"]';

  // Sélecteurs overview
  private cartItems = ".cart_item";
  private subtotalLabel = '[data-test="subtotal-label"]';
  private taxLabel = '[data-test="tax-label"]';
  private totalLabel = '[data-test="total-label"]';

  // Sélecteurs confirmation
  private confirmationHeader = '[data-test="complete-header"]';
  private confirmationImage = '[data-test="pony-express"]';

  async fillForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async expectProductsInOverview(count: number) {
    await expect(this.page.locator(this.cartItems)).toHaveCount(count);
  }

  async expectPriceSummaryVisible() {
    await expect(this.page.locator(this.subtotalLabel)).toBeVisible();
    await expect(this.page.locator(this.taxLabel)).toBeVisible();
    await expect(this.page.locator(this.totalLabel)).toBeVisible();
  }

  async getTotalAmounts() {
    const subtotalText = await this.page
      .locator(this.subtotalLabel)
      .innerText();
    const taxText = await this.page.locator(this.taxLabel).innerText();
    const totalText = await this.page.locator(this.totalLabel).innerText();

    return {
      subtotal: parseFloat(subtotalText.replace("Item total: $", "")),
      tax: parseFloat(taxText.replace("Tax: $", "")),
      total: parseFloat(totalText.replace("Total: $", "")),
    };
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
    await expect(this.page).toHaveURL(/checkout-complete/);
  }

  async expectConfirmationPage() {
    await expect(this.page.locator(this.confirmationHeader)).toHaveText(
      "Thank you for your order!",
    );
    await expect(this.page.locator(this.confirmationImage)).toBeVisible();
    await expect(this.page.locator(this.backHomeButton)).toBeVisible();
  }

  async goBackHome() {
    await this.page.click(this.backHomeButton);
    await expect(this.page).toHaveURL(/inventory/);
  }
}
