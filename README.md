# Exercice Zeliq

## A lire pour Thomas Jablonski

### Mon environnement de dev
- node version: v20.18.0
- npm version: v10.8.2
- npx version: 10.8.2
- nest version: 10.4.5

### Pour run en local sur ta machine
```bash
$ npm install
$ cp .env.template .env
$ docker-compose up -d
$ npx prisma migrate dev
$ npm run start:dev
```

1. J'ai également un fichier postman pour test les endpoints à la racine du dépot postman.json
2. Tu dois te créer un compte avant de pouvoir faire quoi que ce soit ->
POST /auth/signup
3. Le token (Bearer JWT) sera automatiquement inseré dans le header des requetes postman (j'ai mit un script à la réponse), assure toi de bien avoir selectionné l'environnement localhost dans postman avant. (Sinon tu peux manuellement choper le token dans la réponse de signup/signin et l'ajouter manuellement dans les headers des requetes que tu veux utilser)
4. Enjoy ;-)

### Coté exercice
J'ai tout fait sauf la partie Jest !

Tu as de codé dans les grandes lignes
- Système d'auth JWT + Guard
- Prisma évidement avec les fichiers de migrations
- Une collection Postman
- Les 3 models, users, cars et booking en relation one-to-many + edition/suppression en cascade
- La reservation avec la gestion des conflits des dates (+ transaction SQL pour eviter le cas d'une double reservation silmutanée)
- La modification des reservation avec les mêmes règles plus haut
- J'ai également activer le "ValidationPipe" sur Nest pour jouer avec les class-validator

Voilà j'ai pas su faire plus ou "plus quali" en deux heures. J'espere que ça te conviendra ;-)