import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { credentials, customer, products } from "../data/testData";

test.describe("SauceDemo — Parcours checkout complet", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.expectRedirectedToInventory();
  });

  test("1 — Login redirige vers la page produits", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectPageTitle();
  });

  test("2 — Ajout de deux produits et vérification du compteur", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.expectCartCount(2);
  });

  test("3 — Vérification du contenu du panier", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.goToCart();

    await cartPage.expectItemCount(2);
    await cartPage.expectItemPresent("Sauce Labs Backpack");
    await cartPage.expectItemPresent("Sauce Labs Bike Light");
  });

  test("4 — Checkout et vérification de l'overview", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    await checkoutPage.fillForm(
      customer.firstName,
      customer.lastName,
      customer.postalCode,
    );
    await checkoutPage.expectProductsInOverview(2);
    await checkoutPage.expectPriceSummaryVisible();
  });

  test("5 — Vérification que Total = Item total + Tax", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillForm(
      customer.firstName,
      customer.lastName,
      customer.postalCode,
    );

    const { subtotal, tax, total } = await checkoutPage.getTotalAmounts();
    expect(subtotal + tax).toBeCloseTo(total, 2);
  });

  test("6 — Confirmation de commande", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillForm(
      customer.firstName,
      customer.lastName,
      customer.postalCode,
    );
    await checkoutPage.finishOrder();
    await checkoutPage.expectConfirmationPage();
  });

  test("7 — Bouton Back Home ramène aux produits", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillForm(
      customer.firstName,
      customer.lastName,
      customer.postalCode,
    );
    await checkoutPage.finishOrder();
    await checkoutPage.goBackHome();
  });
});
