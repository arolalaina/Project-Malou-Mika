# Project-Malou-Mika
Il y a deux dossiers dans le projet 

1 - Le front-malou

2 - le back-malou

Je tiens a préciser les versions que j'ai utilisé pour le projet :
- Angular CLI 10.2.0
- Node 14.15.5


--->Pour le back, il faudra aussi vérifier le port 3000 sur votre ordinateur.
Si celle-ci n'est pas libre, il faudra aller dans Back-Malou/bin/. Vous allez apercevoir un fichier www. Il faut l'editer avec un editeur de code et aller vers la ligne 15
var port = normalizePort(process.env.PORT || '3000');
Changez le port 3000 par celle que vous voulez.

-IMPORTANT-- si vous changez ce port, il faudra revenir vers le front pour changer le variable d'environement apiURl.
-Pour cela, allez vers Front-Malou\src\environments, editez les 2 fichiers d'environement en changeant la ligne suivante 
apiUrl: 'http://localhost:3000/products/' Changez 3000 par le port de votre nodeJs

--Après, il suffira d'aller dans le répértoire Back-Malou et ouvrir une ligne de commande et entrez "npm start"

---> Pour le front , il faudra vérifier que le port 4200 est libre sur votre ordinateur
Si celle-ci est libre, ouvrer un ligne de commande dans le répértoire Front-Malou et entrez "ng serve --open"
Dans l'autre cas, si le port 4000 est occupé, ouvrez une ligne de commande dans le répértoire Front-Malou et entrez "ng serve --open --port 5000" 
Vous pouvez remplacer 5000 par le port de votre choix

Si il n'y pas d'erreur, une page de présentation doit s'ouvrir automatiquement, dans le cas contraire, allez dans votre navigateur et taper http://localhost:(numéro de port angular)/



RAHARISON Mika
