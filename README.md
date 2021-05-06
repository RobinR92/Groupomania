
## Installation

#### Frontend

**Installez les dépendances et lancez le serveur Create-React-App **

        > npm install
        > npm start
 ---       
### Backend

**Pour faire fonctionner le backend, vous devez disposer du gestionnaire de base de données MySQL et suivre les étapes suivantes**

1. Installez les dépendances

        > npm install
        
2. Ensuite, vous devez ajouter la configuration de votre base de données dans le fichier 'config / config.json'

        {
          "development": {
            "username": "root",
            "password": null,
            "database": "groupomania_development",
            "host": "127.0.0.1",
            "dialect": "mysql"
          },
          ...
        }
        
3. Vous pouvez maintenant exécuter les commandes suivantes pour configurer la base de données ainsi que les tables

        > npx sequelize-cli db:create
        > npx sequelize-cli db:migrate
        
      
4. Une fois les dépendances installées et la base de données configurée, vous pouvez démarrer le serveur
        > npm start