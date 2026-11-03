ERP FOURRIERE — PACKAGE DE DEPLOIEMENT (DEMO / PREPRODUCTION)

Contenu:
- server.js : serveur Node.js et API /api/state
- package.json : commande de démarrage pour Render
- public/index.html : interface ERP
- data/ : stockage local de test

GitHub:
1) Décompressez le ZIP.
2) Ouvrez le dossier erp-fourriere-render.
3) Téléversez TOUT le CONTENU du dossier dans la racine du repository GitHub (pas le ZIP lui-même).

Render:
- New + > Web Service
- Connectez le repository GitHub
- Runtime: Node
- Build Command: npm install
- Start Command: npm start
- Health Check Path: /health

Persistance Render:
Pour conserver les données après redémarrage, ajoutez un Persistent Disk monté sur /var/data,
puis ajoutez la variable d'environnement DATA_DIR=/var/data.

AVERTISSEMENT IMPORTANT:
Cette version est une base de démonstration/préproduction. L'API de sauvegarde n'est pas protégée
par une authentification serveur suffisante et les codes d'accès côté interface ne constituent
pas une sécurité adaptée à Internet. N'y mettez aucune donnée réelle de citoyens/véhicules,
ni documents personnels, avant ajout d'une authentification serveur, contrôle des rôles,
validation et protections de sécurité, ainsi qu'une base de données adaptée.
