<script setup>
import WelcomeItem from './MyBooks.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend bibendum risus id
    pharetra. Aliquam erat volutpat. In consectetur turpis sit amet tellus commodo, quis sodales
    magna accumsan. Fusce iaculis, elit at malesuada facilisis, ligula metus feugiat turpis, quis
    molestie erat sem in sapien. Suspendisse feugiat id arcu ut consequat. Aliquam arcu orci,
    molestie at pulvinar ac, tempus ac nunc. Nullam sed lorem tincidunt, varius nisi vel, rhoncus
    quam. Sed lectus du.
  </p>
  <div class="livres">
    <div>
      <img src="../assets/livres.png" />
      <h2>Titre #1</h2>
    </div>
    <div>
      <img src="../assets/livres.png" />
      <h2>Titre #2</h2>
    </div>
    <div>
      <img src="../assets/livres.png" />
      <h2>Titre #3</h2>
    </div>
    <div>
      <img src="../assets/livres.png" />
      <h2>Titre #4</h2>
    </div>
    <div>
      <img src="../assets/livres.png" />
      <h2>Titre #5</h2>
    </div>
  </div>
  <p class="footer">Elias Veya pl01psa@eduvaud.ch - Aaron Vichery pa84igb@eduvaud.ch</p>
</template>

<style scoped>
/* ====== STYLE GLOBAL ====== */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #e6e6e6;
}

/* ====== TEXTE INTRO ====== */
p {
  max-width: 800px;
  margin: 40px auto;
  background-color: #4b5fa9;
  color: white;
  padding: 25px;
  border-radius: 10px;
  text-align: left;
  line-height: 1.6;
}

/* ====== SECTION LIVRES ====== */
.livres {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 40px 0;
}

/* ====== CARTE LIVRE ====== */
.livres div {
  width: 180px;
  background-color: #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.livres div:hover {
  transform: scale(1.05);
}

/* Image livre */
.livres img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: #cfcfcf;
}

/* Bande bleue titre */
.livres h2 {
  margin: 0;
  padding: 15px 0;
  background-color: #4b5fa9;
  color: white;
  font-size: 18px;
  font-weight: normal;
}

/* ====== FOOTER ====== */
.footer {
  text-align: center;
  font-size: 12px;
  color: #888;
  background: none;
  margin-top: 60px;
}
</style>
