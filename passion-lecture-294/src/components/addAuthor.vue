<template>
  <div class="flex">
    <form @submit.prevent="createAuthor" class="comment-form">

      <label for="firstname">Auteur</label>
      <input 
        id="firstname" 
        placeholder="Prénom de l'auteur" 
        v-model="form.firstName" 
        required
      ></input>
       <input 
        id="lastname" 
        placeholder="Nom de l'auteur" 
        v-model="form.lastName" 
        required
      ></input>

      <button type="submit" class="save-btn">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import authorServices from '../../Services/authorServices'

      const form = {
        id: '',
        fisrtname: '',
        name: '',
      }

      const hasAccess = ref(false)

    const createAuthor = async () => {
      if (!form.value.name || !form.value.firstname) {
        alert('Faut tout rmeplir !!')
        return
      }

      try {
        const response = await authorServices.createAuthor(form.value)

        if (response.status === 200 || response.status === 201) {
          alert('Auteur enregistré avec succès !')
          router.push("/addbooks")
        }
        return response
      } catch (error) {
        console.log(form.value)
        console.error("Erreur lors de l'envoi :", error)
        alert("Impossible d'enregistrer l'auteur via le service.")
      }
    }

    onMounted(() => {
      const token = localStorage.getItem('token')

      if(token) {
        hasAccess.value = true
        loadData()
      } else {
        alert("Veuillez vous connecter");
        router.push("/signup");
      }
    })
</script>

<style scoped>
/* Centrage vertical et horizontal sur toute la page */
.rate  {
    color:#ffcc00
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
  transition: background 0.3s, transform 0.2s;
}

.save-btn:hover {
  background-color: #354a85;
  transform: translateY(-2px);
}
</style>