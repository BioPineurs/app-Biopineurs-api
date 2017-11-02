# app-Biopineurs-api

## Récupération de l'API

On va commencer par lancer un terminal faire un `git clone https://github.com/BioPineurs/app-Biopineurs-api.git`.
Le code va maintenant est en local sur votre machine. Vous pouvez ouvrir le dossier ainsi récupéré avec votre éditeur (Sublime Text par exemple).

## Avant de lancer l'application
Vous allez maintenant entrer dans le dossier en faisant un `cd app-Biopineurs-api` puis vous allez devoir lancer l'installation des dépendances avec `npm install`

## Lancer l'application
Pour lancer l'application, vous avez besoin de vous connecter sur une base de données. Dans un temps 1, nous allons nous connecter sur une base de données à distance pour simplifier la situation, qui est hébergée sur [https://mlab.com/](https://mlab.com/) et dont nous allons vous donner les identifiants juste en dessous.

### Mac et Linux
`DB_USERNAME=test-user DB_PASSWORD=test-password NODE_ENV=development npm run dev`

### Windows
```bash
setx DB_USERNAME test-user
setx DB_PASSWORD test-password
setx NODE_ENV development
npm run dev
```

Vous allez maintenant tester que le serveur est bien lancé en vous rendant dans votre navigateur sur [http://localhost:5000/](http://localhost:5000/) qui correspond au backoffice.
