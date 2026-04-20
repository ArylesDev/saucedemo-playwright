import { Page, expect } from "@playwright/test";

export class InventoryPage {
  constructor(private page: Page) {}

  private cartBadge = ".shopping_cart_badge";
  private cartLink = ".shopping_cart_link";
  private pageTitle = ".title";

  async addToCart(productTestId: string) {
    await this.page.click(`[data-test="${productTestId}"]`);
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }

  async expectCartCount(count: number) {
    await expect(this.page.locator(this.cartBadge)).toHaveText(String(count));
  }

  async expectPageTitle() {
    await expect(this.page.locator(this.pageTitle)).toHaveText("Products");
  }
}
