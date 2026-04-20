import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Lance tous les tests en parallèle
  fullyParallel: true,

  // Interdit .only en CI pour éviter les oublis
  forbidOnly: !!process.env.CI,

  // Retry automatique en CI si un test échoue
  retries: process.env.CI ? 2 : 0,

  // Un seul worker en CI pour la stabilité
  workers: process.env.CI ? 1 : undefined,

  // Rapport HTML généré après les tests
  reporter: "html",

  use: {
    // L'adresse de base de SauceDemo
    baseURL: "https://www.saucedemo.com",

    // Capture une trace si un test échoue (très utile pour déboguer)
    trace: "on-first-retry",

    // Screenshot automatique en cas d'échec
    screenshot: "only-on-failure",
  },

  // On teste uniquement sur Chrome pour ce projet
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
