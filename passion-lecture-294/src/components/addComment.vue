<template>
  <div class="flex">
    <form @submit.prevent="submitComment" class="comment-form">
      <label for="rating">Note :</label>
      <select id="rating" v-model="form.note" required>
        <option value="" disabled>Sélectionnez une note</option>
        <option class="rate" :value="1">★☆☆☆☆</option>
        <option class="rate" :value="2">★★☆☆☆</option>
        <option class="rate" :value="3">★★★☆☆</option>
        <option class="rate" :value="4">★★★★☆</option>
        <option class="rate" :value="5">★★★★★</option>
      </select>

      <label for="commentaire">Commentaire</label>
      <textarea
        id="commentaire"
        placeholder="Ecrivez votre commentaire ici"
        v-model="form.comment"
        required
      ></textarea>

      <button type="submit" class="save-btn">Enregistrer</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['id'], // On récupère l'id du livre via les props du router
  data() {
    return {
      form: {
        id: '',
        comment: '',
        userId: 1, // Assure-toi d'envoyer un ID utilisateur existant
        bookId: null, // On le remplira dans la méthode
        note: '',
      },
      comments: [],
    }
  },
  methods: {
    async submitComment() {
      // ÉTAPE CRUCIALE : On s'assure que le commentaire est lié au bon livre
      this.form.bookId = Number(this.id)

      try {
        const response = await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        })

        if (response.ok) {
          const createdComment = await response.json()

          // Reset du formulaire
          this.form.comment = ''
          this.form.note = ''
          this.$router.push(`/book/${this.id}`)

          // Optionnel : rediriger l'utilisateur ou rafraîchir la liste
        } else {
          alert('Erreur serveur : ' + response.status)
        }
      } catch (error) {
        console.error('Erreur réseau :', error)
      }
    },
  },
}
</script>

<style scoped>
/* Centrage vertical et horizontal sur toute la page */
.rate {
  color: #ffcc00;
}
.container-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Ajuste selon la hauteur de ton écran */
  font-family: 'Inter', sans-serif;
}

/* Carte du formulaire plus imposante */
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  max-width: 500px; /* Largeur augmentée */
  padding: 40px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #445ca5;
  margin-bottom: 10px;
  font-size: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}

/* Inputs plus gros */
.large-input {
  padding: 15px;
  font-size: 1.2rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.3s;
}

.large-input:focus {
  border-color: #445ca5;
}

textarea.large-input {
  height: 150px;
  resize: none;
}

/* Étoiles en jaune dans les options */
.rate-option {
  color: #ffcc00; /* Jaune d'or */
  background-color: #fff;
  font-size: 1.3rem;
}

/* Bouton plus gros et centré */
.save-btn {
  background-color: #445ca5;
  color: white;
  border: none;
  padding: 18px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 12px;
  transition:
    background 0.3s,
    transform 0.2s;
}

.save-btn:hover {
  background-color: #354a85;
  transform: translateY(-2px);
}
</style>
