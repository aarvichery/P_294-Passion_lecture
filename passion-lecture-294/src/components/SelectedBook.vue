<template>
  <div class="bookinfo" v-if="book">
    <h1>{{ book.title }}</h1>

    <div class="main-layout">
      <div class="info-column">
        <div class="image-placeholder"></div>
        
        <div class="details-card">
          <p v-for="author in authors" :key="author.id" v-show="book.authorId == author.id">
            <strong>Auteur :</strong> {{ author.firstName }} {{ author.lastName }}
          </p>
          <p><strong>Editeur :</strong> {{ book.editeur }}</p>
          <p><strong>Catégorie :</strong> {{ book.categorieId }}</p>
          <p><strong>Nb pages :</strong> {{ book.nbPage }}</p>
          
          <p><strong>Note moyenne :</strong> <span class="stars-yellow">{{ starAverage }}</span></p>
          
          <a :href="'https://cdn.bookey.app/files/pdf/book/fr/le-petit-prince.pdf'" target="_blank" class="pdf-link">
            Lien pdf : {{ book.link || 'Consulter le document' }}
          </a>

          <div class="resume-section">
            <strong>Résumé :</strong>
            <p>{{ book.resume }}</p>
          </div>
        </div>
      </div>

      <div class="comments-column">
        <div 
          class="bookcomments" 
          v-for="comment in filteredComments" 
          :key="comment.id"
        >
          <div class="user-info" v-for="user in users" :key="user.id" v-show="user.id == comment.userId">
            <p class="pseudo">{{ user.pseudo }}</p>
          </div>
          
          <p class="stars-rating">{{ renderStars(comment.note) }}</p>
          <p class="comment-text">{{ comment.comment }}</p>
        </div>
      <RouterLink :to="`/books/${book.id}/addcomment`">
        <button class="add-button">Ajouter un commentaire</button>
      </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      book: null,
      authors: [],
      comments: [],
      users: [],
    }
  },
  computed: {
    filteredComments() {
      if (!this.book) return [];
      return this.comments.filter(c => c.bookId == this.book.id);
    },

    starAverage() {
      const bookComments = this.filteredComments;
      if (bookComments.length === 0) return this.renderStars(0);

      const sum = bookComments.reduce((acc, comment) => acc + comment.note, 0);
      const average = sum / bookComments.length;
      return this.renderStars(Math.ceil(average));
    }
  },
  mounted() {
    this.loadAllData();
  },
  methods: {
    renderStars(note) {
      const rating = Math.round(note || 0);
      const safeRating = Math.min(Math.max(rating, 0), 5); // Entre 0 et 5
      return '★'.repeat(safeRating) + '☆'.repeat(5 - safeRating);
    },

    async loadAllData() {
      try {
        const resBook = await fetch(`http://localhost:3000/books/${this.id}`);
        this.book = await resBook.json();

        const [resAuthors, resComments, resUsers] = await Promise.all([
          fetch('http://localhost:3000/authors'),
          fetch('http://localhost:3000/comments'),
          fetch('http://localhost:3000/users')
        ]);

        this.authors = await resAuthors.json();
        this.comments = await resComments.json();
        this.users = await resUsers.json();
      } catch (error) {
        console.error("Erreur chargement:", error);
      }
    }
  }
}
</script>

<style scoped>
/* --- Structure --- */
.bookinfo {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

h1 {
  color: #445ca5;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 30px;
}

.main-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 40px;
  align-items: start;
}

/* --- Colonne Gauche --- */
.info-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-placeholder {
  width: 240px;
  height: 320px;
  background-color: #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.details-card {
  background-color: #445ca5;
  color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(68, 92, 165, 0.2);
  line-height: 1.7;
}

.details-card p {
  margin: 8px 0;
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 5px;
}

.pdf-link {
  color: #add8e6;
  text-decoration: underline;
  font-weight: bold;
  display: block;
  margin: 15px 0;
}

.resume-section {
  margin-top: 15px;
  font-size: 0.9rem;
}

/* --- Colonne Droite --- */
.comments-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bookcomments {
  background-color: #445ca5;
  color: white;
  padding: 25px;
  border-radius: 25px; /* Look bulle comme l'image */
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}

.bookcomments:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.pseudo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.pseudo::before {
  content: "👤";
  background: #1a1a1a;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.stars-rating, .stars-yellow {
  color: #ffcc00;
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin: 10px 0;
}

.comment-text {
  line-height: 1.6;
  font-size: 1rem;
  opacity: 0.95;
  font-style: italic;
}

/* --- Bouton --- */
.add-button {
  background-color: #445ca5;
  color: white;
  border: none;
  padding: 16px 35px;
  border-radius: 14px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  align-self: flex-start;
  box-shadow: 0 8px 20px rgba(68, 92, 165, 0.3);
  transition: all 0.3s ease;
}

.add-button:hover {
  background-color: #354a85;
  transform: scale(1.03);
}

/* Responsive */
@media (max-width: 900px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
}
</style>