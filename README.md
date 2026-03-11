# P_294-Passion Lecture
**Le but de ce projet était de créer une application web en Vue.js en simulant le Backend grâce à Json-server. <br>
L'application devait lister des livres ajoutés par les différents utilisateurs**

## Comment avoir accès à l'application
**Pour avoir accès à l'application, il faut dans un premier temps télécharger le zip de ce projet.<br><br>**
1. Lorsque vous l'aurez dézippé, vous devrez l'ouvrir en ligne de commande. <br>Ensuite entrez cette commande: `npm i`, cela servira à installer toutes les dépendances du projet.<br><br>
2. Lorsque vous aurez exécuté la commande:<br>
Entrez cette commande `npm run dev` pour lancer le serveur qui permettra d'afficher votre site.
3. Maintenant, dans votre navigateur, entrez l'URL `http://localhost:5173`, pour accéder au site.<br><br>
**⚠️ Assurez vous que votre serveur est tout le temps allumé lorsque vous voudrez accéder à votre site.**

## Comment lancer le server Json
**Pour lancer le Json server pour ce projet, assurez vous que les étapes précédentes ont été exécutées**
1. Dans le même dossier, ouvrez une nouvelle ligne de commande, ⚠️ laissez bien allumé l'autre serveur
2. Dans cette ligne de commande entrez la commande suivante `npx json-server --watch db.json --routes routes.json` afin de lancer le serveur.<br><br>
**Dans votre navigateur**<br>
| Table voulue |                URL                 |<br>
|  :----------- | --------------------------------- |<br>
|    Livres    |    `http://localhost:3000/books`   |<br>
| Utilisateurs |    `http://localhost:3000/users`   |<br>
|    Auteurs   |   `http://localhost:3000/authors`  |<br>
|  Catégories  | `http://localhost:3000/categories` |<br>
| Commentaires |  `http://localhost:3000/comments`  |<br>
