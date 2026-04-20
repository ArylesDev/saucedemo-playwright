import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  // Les sélecteurs de la page
  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private loginButton = '[data-test="login-button"]';

  // Les actions
  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async expectRedirectedToInventory() {
    await expect(this.page).toHaveURL(/inventory/);
  }
}
