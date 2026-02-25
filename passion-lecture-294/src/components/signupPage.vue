<script setup lang="ts">
import { atomtest } from 'globals'
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <div class="modal-left">
        <img src="../assets/livres.png" alt="Stack of books" />
      </div>

      <div class="modal-right">
        <button class="modal-close-x">×</button>

        <h2 class="modal-title">Bienvenue...</h2>

        <div class="modal-avatar-zone">
          <div class="modal-plus-icon">+</div>
        </div>

        <div class="modal-inputs">
          <input type="text" placeholder="Name..." />
          <input type="text" placeholder="Firstname..." />
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
        </div>

        <div class="modal-footer">
          <button class="modal-submit-btn">Rejoignez-nous!</button>
          <p class="modal-login-text">Se connecter...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Couche qui assombrit tout l'écran en arrière-plan */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* Intensité du noir transparent */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Boîte principale avec bordure noire comme sur la maquette */
.modal-card {
  background-color: #e8eeff;
  width: 820px;
  height: 540px;
  display: flex;
  border-radius: 35px;
  overflow: hidden;
  border: 4px solid #000000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Gestion de l'image de gauche */
.modal-left {
  width: 55%;
  height: 100%;
}

.modal-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Conteneur de droite pour les éléments du formulaire */
/* On centre aussi la zone de l'avatar et du titre pour la cohérence */
.modal-right {
  width: 45%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centre tout le contenu de la colonne de droite */
  position: relative;
  justify-content: center; /* Centre verticalement le bloc complet */
}

/* Bouton de fermeture X */
.modal-close-x {
  position: absolute;
  top: 15px;
  right: 25px;
  background: none;
  border: none;
  font-size: 35px;
  color: #4b5fa9;
  cursor: pointer;
}

.modal-title {
  color: #4b5fa9;
  font-family: 'Times New Roman', serif;
  font-size: 48px;
  font-weight: normal;
  margin: 0 0 10px 0;
  align-self: center; /* Centre le titre par rapport au formulaire */
}

/* Cercle gris d'avatar */
.modal-avatar-zone {
  margin: 15px 0;
}

.modal-plus-icon {
  width: 95px;
  height: 95px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 55px;
  color: #000;
}

/* Modifie cette partie dans ton code */
.modal-inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center; /* Aligne les enfants (inputs) au centre horizontalement */
}

.modal-inputs input {
  width: 85%; /* Réduit un peu la largeur pour que le centrage soit visible */
  padding: 14px 22px;
  border-radius: 25px;
  border: 2px solid #e2e2e2;
  background-color: #eeeeee;
  color: #555;
  font-size: 16px;
  outline: none;
  text-align: left; /* Garde le texte à gauche à l'intérieur de l'input */
}

/* Pied de page avec bouton souligné */
.modal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}

.modal-submit-btn {
  background-color: #4b5fa9;
  color: white;
  border: none;
  padding: 12px 35px;
  border-radius: 25px;
  font-size: 19px;
  cursor: pointer;
  text-decoration: underline; /* Texte souligné comme sur l'image */
}

.modal-login-text {
  color: #888;
  font-size: 13px;
  margin-top: 8px;
  cursor: pointer;
}
</style>
