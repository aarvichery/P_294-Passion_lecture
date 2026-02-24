1: Installer myjson-server en local
npm i json-server
2: crée le fichier routes.json
{
"/users/:userId/books": "/books?userId=:userId"
}
3: le lancé
npx json-server --watch db.json --routes routes.json
