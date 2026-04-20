# 🧪 SauceDemo — Tests automatisés avec Playwright

## 📋 Description

Suite de tests automatisés end-to-end couvrant le parcours complet
d'achat sur [SauceDemo](https://www.saucedemo.com) :
connexion → ajout de produits → panier → checkout → confirmation.

---

## 🛠️ Stack technique

- **Playwright** — framework de tests E2E
- **TypeScript** — typage statique pour plus de robustesse
- **GitHub Actions** — CI/CD automatisée à chaque push
- **Azure Pipelines** — CI/CD sur environnement Microsoft

---

## 🏗️ Structure du projet

saucedemo-playwright/
├── tests/
│ └── checkout.spec.ts # Fichier de tests principal
├── pages/ # Pattern Page Object Model
│ ├── LoginPage.ts # Page de connexion
│ ├── InventoryPage.ts # Page des produits
│ ├── CartPage.ts # Page du panier
│ └── CheckoutPage.ts # Pages checkout et confirmation
├── data/
│ └── testData.ts # Données de test centralisées
├── .github/
│ └── workflows/
│ └── playwright.yml # Pipeline GitHub Actions
├── azure-pipelines.yml # Pipeline Azure Pipelines
└── playwright.config.ts # Configuration Playwrigh

---

## 🧩 Scénarios testés

| #   | Test                                               | Statut |
| --- | -------------------------------------------------- | ------ |
| 1   | Login redirige vers la page produits               | ✅     |
| 2   | Ajout de deux produits et vérification du compteur | ✅     |
| 3   | Vérification du contenu du panier                  | ✅     |
| 4   | Checkout et vérification de l'overview             | ✅     |
| 5   | Total = Item total + Tax                           | ✅     |
| 6   | Confirmation de commande                           | ✅     |
| 7   | Bouton Back Home ramène aux produits               | ✅     |

---

## 🚀 Installation et lancement

### Prérequis

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/TONPSEUDO/saucedemo-playwright.git
cd saucedemo-playwright
npm install
npx playwright install
```

### Lancer les tests

```bash
# Lancer tous les tests
npx playwright test

# Lancer avec le rapport HTML
npx playwright test --reporter=html
npx playwright show-report

# Lancer en mode interface graphique
npx playwright test --ui
```

---

## 🏛️ Choix techniques

### Page Object Model (POM)

Chaque page du site est représentée par une classe TypeScript.
Les tests appellent des méthodes en langage naturel sans
connaître les détails techniques. Si un sélecteur change,
on ne modifie qu'un seul fichier.

### Données centralisées

Toutes les données de test (identifiants, informations client,
produits) sont centralisées dans `data/testData.ts`.
Un seul endroit à modifier si les données changent.

### TypeScript

Le typage statique permet de détecter les erreurs avant
l'exécution des tests — plus robuste que JavaScript pur.

---

## 📊 Rapport de tests

Après chaque push, un rapport HTML détaillé est généré et disponible
dans l'onglet **Actions** de GitHub → section **Artifacts**.

Pour le consulter en local :

```bash
npx playwright test
npx playwright show-report
```

---

## ⚙️ CI/CD

## ⚙️ CI/CD

### GitHub Actions ✅

Les tests se lancent automatiquement à chaque push sur `main`
via GitHub Actions — pipeline configuré dans `.github/workflows/playwright.yml`.

### Azure Pipelines 📄

Pipeline préparé dans `azure-pipelines.yml` pour une intégration
dans un environnement Microsoft Azure DevOps.
