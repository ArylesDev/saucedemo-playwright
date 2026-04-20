# Plan de test — SauceDemo Checkout

## 1. Portée

### Pages concernées

| Page                | URL                       |
| ------------------- | ------------------------- |
| Login               | `/`                       |
| Produits            | `/inventory.html`         |
| Panier              | `/cart.html`              |
| Informations client | `/checkout-step-one.html` |
| Récapitulatif       | `/checkout-step-two.html` |
| Confirmation        | `/checkout-complete.html` |

### Actions testées

- Connexion avec identifiants valides
- Ajout de plusieurs produits au panier
- Vérification du compteur panier
- Vérification des produits et prix dans le panier
- Remplissage du formulaire de checkout
- Vérification du calcul Total = Item total + Tax
- Confirmation de commande
- Retour à l'accueil via "Back Home"

---

## 2. Scénarios de test

| #     | Scénario                                           | Page         | Priorité   | Statut        |
| ----- | -------------------------------------------------- | ------------ | ---------- | ------------- |
| TC-01 | Login redirige vers la page produits               | Login        | 🔴 Haute   | ✅ Automatisé |
| TC-02 | Ajout de deux produits et vérification du compteur | Produits     | 🔴 Haute   | ✅ Automatisé |
| TC-03 | Vérification du contenu du panier                  | Panier       | 🔴 Haute   | ✅ Automatisé |
| TC-04 | Checkout et vérification de l'overview             | Checkout     | 🔴 Haute   | ✅ Automatisé |
| TC-05 | Total = Item total + Tax                           | Overview     | 🔴 Haute   | ✅ Automatisé |
| TC-06 | Confirmation de commande                           | Confirmation | 🔴 Haute   | ✅ Automatisé |
| TC-07 | Bouton Back Home ramène aux produits               | Confirmation | 🟡 Moyenne | ✅ Automatisé |

---

## 3. Vérifications clés

### Panier

- Le compteur affiche le bon nombre d'articles après ajout
- Les produits ajoutés sont bien présents dans le panier
- Les prix unitaires sont cohérents

### Checkout

- Le formulaire accepte des données valides
- La page Overview affiche les bons produits
- **Item total + Tax = Total** (vérification mathématique)

### Confirmation

- Le message "Thank you for your order!" est visible
- L'image de confirmation est présente
- Le bouton "Back Home" ramène bien à la liste des produits

---

## 4. Hypothèses et limites

- Les tests utilisent uniquement le compte `standard_user`
- Les prix et taxes sont ceux affichés par SauceDemo (non modifiables)
- Les tests sont exécutés sur Chrome en mode headless en CI
- On ne teste pas les cas d'erreur de connexion (hors périmètre)
- SauceDemo est un site de démonstration externe —
  une indisponibilité du site ferait échouer les tests

---

## 5. Risques et contraintes

| Risque                       | Impact   | Mitigation                               |
| ---------------------------- | -------- | ---------------------------------------- |
| Indisponibilité de SauceDemo | 🔴 Élevé | Retry automatique x2 en CI               |
| Changement de sélecteurs     | 🟡 Moyen | Pattern POM — 1 seul fichier à modifier  |
| Changement des prix          | 🟡 Moyen | Calcul dynamique du total dans les tests |
| Flakiness réseau             | 🟡 Moyen | Retry automatique x2 en CI               |

---

## 6. Environnement de test

| Paramètre      | Valeur                           |
| -------------- | -------------------------------- |
| Site testé     | https://www.saucedemo.com        |
| Navigateur     | Chrome (Chromium)                |
| Framework      | Playwright + TypeScript          |
| CI/CD          | GitHub Actions / Azure Pipelines |
| Compte de test | standard_user / secret_sauce     |

---

## 7. Résultats

| Métrique               | Valeur |
| ---------------------- | ------ |
| Total de tests         | 7      |
| Tests passants         | 7 ✅   |
| Tests échouants        | 0      |
| Durée d'exécution      | ~2.7s  |
| Couverture du parcours | 100%   |
