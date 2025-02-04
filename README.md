# Portfolio Personnel

Ce projet est un portfolio personnel développé avec React, TypeScript et Vite.

## Technologies Utilisées

- React 18.2.0
- TypeScript
- Vite 4.4.5
- TailwindCSS 3.4.1
- Framer Motion 10.16.4
- React Router DOM 6.18.0
- Lucide React pour les icônes
- Radix UI pour les composants d'interface

## Structure du Projet

```
src/
├── components/     # Composants React
│   ├── ui/        # Composants d'interface utilisateur réutilisables
│   └── ...        # Autres composants
├── hooks/         # Hooks personnalisés
├── types/         # Définitions de types TypeScript
├── App.tsx        # Composant principal
├── main.tsx       # Point d'entrée
└── index.css      # Styles globaux
```

## Fonctionnalités

### Navigation
- Navigation fluide entre les sections avec défilement automatique
- Gestion du retour en haut de page lors des changements de route
- Menu responsive pour mobile

### Interface Utilisateur
- Mode sombre/clair avec persistance des préférences
- Animations fluides avec Framer Motion
- Design responsive
- Composants UI réutilisables

### Projets
- Présentation des projets avec descriptions détaillées
- Intégration de médias (images, vidéos YouTube)
- Filtrage par catégories
- Liens vers les démos et codes sources

## Prérequis

- Node.js (version LTS recommandée)
- npm (inclus avec Node.js)

## Installation

1. Clonez le repository
2. Naviguez vers le dossier du projet :
   ```bash
   cd project
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```

## Commandes Disponibles

- `npm run dev` : Lance le serveur de développement (http://localhost:5173)
- `npm run build` : Crée une version de production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint

## Configuration de Développement

Le projet utilise Vite comme outil de build avec la configuration suivante :
- Hot Module Replacement (HMR)
- Support TypeScript
- Optimisation automatique des imports
- Chunking intelligent pour la production

## Dernières Modifications

### Structure
- Simplification de l'architecture du projet
- Retrait de la section blog pour une expérience plus focalisée
- Ajout d'une section dédiée aux projets dans la navigation principale

### Interface
- Amélioration des transitions entre les sections
- Optimisation du mode sombre/clair
- Mise à jour des animations de navigation
- Intégration des médias sociaux (GitHub, LinkedIn, Twitter)

### Performance
- Optimisation du chargement des composants avec React.lazy
- Amélioration du chunking pour une meilleure performance de chargement
- Nettoyage des dépendances non utilisées

## Prochaines Étapes Possibles

1. Amélioration de l'expérience utilisateur
2. Optimisation des performances
3. Ajout d'animations supplémentaires
4. Intégration de tests automatisés
