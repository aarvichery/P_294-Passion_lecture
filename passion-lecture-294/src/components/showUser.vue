<template>
  <div class="user-container" v-for="user in users" v-show="user.id == this.id" :key="user.id">
    <div class="user-actions" v-show="user.role === 'admin'">
      <RouterLink to="/allbooks">
        <img src="../assets/livre-ouvert.png" title="Voir mes livres" />
      </RouterLink>

      <img
        src="../assets/poubelle-n.png"
        title="Supprimer le compte"
        @click="deleteUser(user.id)"
      />
    </div>

    <div class="user-card">
      <div class="user-avatar-zone">
        <img alt="User icon" class="user-logo" src="@/assets/utilisateur.png" />
      </div>

      <h1 class="user-title">{{ user.pseudo }}</h1>

      <div class="user-details">
        <p><strong>Prénom:</strong> {{ user.firstName }}</p>
        <p><strong>Nom:</strong> {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Rôle:</strong> {{ user.role }}</p>
        <p><strong>Livres ajoutés:</strong> {{ nbBooks(user) }}</p>
      </div>

      <div class="user-footer">
        <p class="user-date">Membre depuis le : {{ user.dateEntree }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      books: [],
      users: [],
    }
  },
  computed: {},
  mounted() {
    this.loadUsers()
    this.loadBooks()
  },
  methods: {
    async loadUsers() {
      const response = await fetch('http://localhost:3000/users')
      this.users = await response.json()
    },
    async loadBooks() {
      const response = await fetch('http://localhost:3000/books')
      this.books = await response.json()
    },
    nbBooks(user) {
      const livresDeLutilisateur = this.books.filter((book) => book.userId == user.id)
      return livresDeLutilisateur.length
    },
  },
}
</script>

<style scoped>
/* Conteneur des icônes (livre et poubelle) */
.user-actions {
  display: flex;
  flex-direction: column; /* Aligne les icônes verticalement */
  gap: 20px;
  margin-right: 20px; /* Espace entre les icônes et la carte */
}

/* Style commun pour les images d'action */
.user-actions img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;
  padding: 10px;
  background-color: #ffffff;
  border: 3px solid #000000;
  border-radius: 15px;
  box-shadow: 4px 4px 0px #4b5fa9; /* Ombre décalée style rétro/BD */
}

/* Effet au survol */
.user-actions img:hover {
  transform: scale(1.1);
  filter: brightness(1.1);
  background-color: #e8eeff;
}

/* Ajustement spécifique pour la poubelle (rouge discret au survol ?) */
.user-actions img[src*='poubelle']:hover {
  border-color: #a94b4b;
  box-shadow: 4px 4px 0px #a94b4b;
}
/* Conteneur principal pour centrer la carte */
.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 500px;
}

/* Carte principale calquée sur .modal-card */
.user-card {
  background-color: #e8eeff;
  width: 450px; /* Plus petit qu'une modal car une seule colonne */
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 35px;
  border: 4px solid #000000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: Arial, sans-serif;
}

/* Zone de l'image (Avatar) */
.user-avatar-zone {
  margin-bottom: 20px;
}

.user-logo {
  width: 125px;
  height: 125px;
  background-color: #d9d9d9;
  border-radius: 50%;
  border: 3px solid #4b5fa9;
  object-fit: cover;
}

/* Titre (Pseudo) calqué sur .modal-title */
.user-title {
  color: #4b5fa9;
  font-family: 'Times New Roman', serif;
  font-size: 38px;
  font-weight: normal;
  margin: 0 0 20px 0;
  text-transform: capitalize;
}

/* Bloc des informations (Prénom, Nom, etc.) */
.user-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-details p {
  background-color: #eeeeee;
  padding: 12px 20px;
  border-radius: 20px;
  border: 2px solid #e2e2e2;
  color: #444;
  margin: 0;
  font-size: 16px;
  text-align: left;
}

.user-details strong {
  color: #4b5fa9;
  margin-right: 5px;
}

/* Pied de page de la carte */
.user-footer {
  margin-top: 25px;
  border-top: 1px solid #c5d0f5;
  width: 100%;
  text-align: center;
}

.user-date {
  color: #888;
  font-size: 14px;
  margin-top: 15px;
  font-style: italic;
}
</style>
