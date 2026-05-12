<script setup>
import { atomtest } from 'globals'
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <div class="modal-left">
        <img src="/livres/livres.png" alt="Stack of books" />
      </div>

      <div class="modal-right">
        <RouterLink to="/">
          <button class="modal-close-x">×</button>
        </RouterLink>

        <h2 class="modal-title">Bienvenue...</h2>

        <div class="modal-avatar-zone">
          <div class="modal-plus-icon">+</div>
        </div>

        <div class="modal-inputs">
          <form @submit.prevent="registerUser">
          <input type="text" placeholder="Name..." v-model="form.lastname" required/>
          <input type="text" placeholder="Firstname..." v-model="form.firstname" required/>
          <input type="text" placeholder="Username..." v-model="form.username" required/>
          <input type="email" placeholder="Email..." v-model="form.email" required/>
          <input type="password" placeholder="Password..." v-model="form.password" required/>
          <button type="submit" class="modal-submit-btn">Rejoignez-nous!</button>
          </form>
        </div>

        <div class="modal-footer">
          <RouterLink to="/login">
            <a class="modal-login-text">Se connecter...</a>
          </RouterLink>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import authServices from '../../Services/authServices';
export default {
  data() {
    return {
      form: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        username: '',
        role: 'User'

      }
    }
  },
  methods: {
    async registerUser() { 
      console.log("Calling registerUser with form:", this.form);
      try {
        const response = await authServices.register(this.form);
          this.$router.push(`/login`);
      } catch (error) {
        console.error("Erreur :", error);
        if (error.response) {
      console.error(error.response.data)
        }
      }
    }
  },
}
</script>

<style scoped>
/* Couche overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Carte principale */
.modal-card {
  background-color: #e8eeff;
  width: 820px;
  height: 580px;
  display: flex;
  border-radius: 35px;
  overflow: hidden;
  border: 4px solid #000000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Image gauche */
.modal-left {
  width: 55%;
  height: 100%;
}

.modal-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Partie droite */
.modal-right {
  width: 45%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Bouton fermer */
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

/* Titre */
.modal-title {
  color: #4b5fa9;
  font-family: 'Times New Roman', serif;
  font-size: 48px;
  font-weight: normal;
  margin-bottom: 10px;
  text-align: center;
}

/* Avatar */
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
}

/* Inputs container */
.modal-inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

/* Inputs */
.modal-inputs input {
  width: 85%;
  padding: 14px 22px;
  border-radius: 25px;
  border: 2px solid #e2e2e2;
  background-color: #eeeeee;
  font-size: 16px;
  outline: none;
}

/* Bouton submit */
.modal-submit-btn {
  width: 100%;
  background-color: #4b5fa9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 19px;
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
  margin-top: 5px;
}

/* Footer login */
.modal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}

.modal-login-text {
  color: #888;
  font-size: 13px;
  margin-top: 8px;
  cursor: pointer;
}
</style>
