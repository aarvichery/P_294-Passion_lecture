<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <div class="wrapper">
        <nav>
          <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

          <div class="links">
            <RouterLink to="/">Accueil</RouterLink>
            <RouterLink to="/allbooks">Tous les livres</RouterLink>
            <RouterLink to="/mybooks">Mes livres</RouterLink>
          </div>

          <img
            alt="User icon"
            class="logo"
            src="@/assets/utilisateur.png"
            width="125"
            height="125"
          />
        </nav>
      </div>
    </header>

    <main class="content">
      <RouterView />
    </main>

    <footer class="main-footer">
      Elias Veya pl01psa@eduvaud.ch - Aaron Vichery pa84igb@eduvaud.ch
    </footer>
  </div>
</template>

<style>
/* Style appliqué au HTML/BODY pour s'assurer que toute la hauteur est prise */
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>

<style scoped>
/* Conteneur principal en Flexbox colonne */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Prend au moins 100% de la hauteur de l'écran */
}

/* La partie contenu prend tout l'espace disponible (flex-grow: 1) */
.content {
  flex-grow: 1;
}

/* ===== HEADER ===== */
header {
  background-color: #4b5fa9;
  padding: 10px 40px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  align-items: center;
  width: 100%;
}

.logo:first-of-type {
  width: 60px;
  height: 60px;
}

.links {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.links a {
  margin: 0 20px;
  text-decoration: none;
  color: white;
  font-size: 30px;
  font-weight: 500;
}

.links a.router-link-exact-active {
  color: rgb(0, 0, 0);
  text-decoration: underline;
}

.logo:last-of-type {
  width: 45px;
  height: 45px;
  margin-left: 20px;
}

/* ===== FOOTER ===== */
.main-footer {
  text-align: center;
  font-size: 14px;
  color: #888;
  padding: 30px 0; /* Un peu plus d'espace */
  margin-top: auto; /* Sécurité supplémentaire pour pousser vers le bas */
  background-color: transparent; /* Ou la couleur de ton choix */
}
</style>
