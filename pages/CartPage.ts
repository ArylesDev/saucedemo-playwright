import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  private cartItems = ".cart_item";
  private checkoutButton = '[data-test="checkout"]';

  async expectItemCount(count: number) {
    await expect(this.page.locator(this.cartItems)).toHaveCount(count);
  }

  async expectItemPresent(name: string) {
    await expect(
      this.page.locator(this.cartItems).filter({ hasText: name }),
    ).toBeVisible();
  }

  async goToCheckout() {
    await this.page.click(this.checkoutButton);
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }
}
