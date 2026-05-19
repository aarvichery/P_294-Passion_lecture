<template>
  <div class="user-container" v-for="user in users" v-show="user.id == id" :key="user.id">
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

      <h1 class="user-title">{{ user.username }}</h1>

      <div class="user-details">
        <p><strong>Prénom:</strong> {{ user.firstname }}</p>
        <p><strong>Nom:</strong> {{ user.lastname }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Rôle:</strong> {{ user.role }}</p>
        <p><strong>Livres ajoutés:</strong> {{ nbBooks(user) }}</p>
      </div>

      <div class="user-footer">
        <p class="user-date">
        Membre depuis le : 
        <!--Je vais me permettre de commenter cette ligne donc je voulais m'épargner le faite de faire une fonction séparer que pour ce champ,
        //j'ai donc fais un if else qui sois affiche la date formater dans le systeme francophone suisse sinon affiche 3 points pour indiquer que la date n'est pas encore disponible (car peut etre que le user n'est pas encore chargé)
        -->
        {{ user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-CH') : '...' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import userServices from '../../Services/userServices';
import bookServices from '../../Services/bookServices';


export default {
  name: 'UserDetail',
  props: ['id'],
  data() {
    return {
      books: [],
      users: [],
    }
  },
  mounted() {
    this.loadUsers()
    this.loadBooks()
  },
  methods: {
    async loadUsers() {
      try {
        const response = await userServices.getUsers()
        this.users = response.data
      } catch (error) {
        console.error("Erreur lors du chargement des user :", error);
      }
    },
    async loadBooks() {
      try {
        const response = await bookServices.getBooks()
        this.books = response.data
      } catch (error) {
        console.error("Erreur lors du chargement des livres :", error);
      }
    },
    nbBooks(user) {
      const livresDeLutilisateur = this.books.filter((book) => book.userId == user.id)
      return livresDeLutilisateur.length
    },
    async deleteUser(id) {
      if (confirm('Es-tu sûr de vouloir supprimer cet utilisateur ?')) {
        try {
          await userServices.deleteUser(id)
          this.$router.push('/allbooks')
        } catch (error) {
          alert('Impossible de supprimer l’utilisateur. Serveur injoignable ou droits insuffisants.')
        }
      }
    },
  },
}
</script>

<style scoped>
/* Conteneur des icônes (livre et poubelle) */
.user-actions {
  display: flex;
  flex-direction: column; 
  gap: 20px;
  margin-right: 20px; 
}

.user-actions img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
  padding: 10px;
  background-color: #ffffff;
  border: 3px solid #000000;
  border-radius: 15px;
  box-shadow: 4px 4px 0px #4b5fa9; 
}

.user-actions img:hover {
  transform: scale(1.1);
  filter: brightness(1.1);
  background-color: #e8eeff;
}

.user-actions img[src*='poubelle']:hover {
  border-color: #a94b4b;
  box-shadow: 4px 4px 0px #a94b4b;
}

.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 500px;
}

.user-card {
  background-color: #e8eeff;
  width: 450px; 
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 35px;
  border: 4px solid #000000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: Arial, sans-serif;
}

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

.user-title {
  color: #4b5fa9;
  font-family: 'Times New Roman', serif;
  font-size: 38px;
  font-weight: normal;
  margin: 0 0 20px 0;
  text-transform: capitalize;
}

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