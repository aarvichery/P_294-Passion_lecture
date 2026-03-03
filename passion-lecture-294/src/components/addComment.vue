<template>
  <div class="flex">
    <form @submit.prevent="submitComment" class="comment-form">
      <label for="rating">Note :</label>
      <select id="rating" v-model="form.note" required>
        <option value="" disabled>Sélectionnez une note</option>
        <option :value="1">★☆☆☆☆</option>
        <option :value="2">★★☆☆☆</option>
        <option :value="3">★★★☆☆</option>
        <option :value="4">★★★★☆</option>
        <option :value="5">★★★★★</option>
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
      comments: []
    }
  },
  methods: {
    async submitComment() {
      // ÉTAPE CRUCIALE : On s'assure que le commentaire est lié au bon livre
      this.form.bookId = Number(this.id); 
      
      try {
        const response = await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });

        if (response.ok) {
          const createdComment = await response.json();
          alert("Commentaire ajouté avec succès !");
          
          // Reset du formulaire
          this.form.comment = "";
          this.form.note = "";
          
          // Optionnel : rediriger l'utilisateur ou rafraîchir la liste
        } else {
          alert("Erreur serveur : " + response.status);
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }
  },
}
</script>

<style scoped>
/* Un petit style pour rendre ça propre */
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}
.save-btn {
  background-color: #445ca5;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>