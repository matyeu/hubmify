export interface ReleaseNote {
  id: number;
  version: string;
  date: string;
  title: string;
  description: string;
  features?: string[];
  improvements?: string[];
  fixes?: string[];
  illustration?: string;
}

export const releaseNotes: ReleaseNote[] = [
  {
    id: 1,
    version: "1.0.0",
    date: "7 mars 2024",
    title: "Version initiale de Hubmify",
    description:
      "Nous sommes ravis de vous présenter la première version de Hubmify !",
    features: [
      "Système de gestion de projets",
      "Modules personnalisables",
      "Tableau de bord analytique",
      "Système d'abonnement Pro",
    ],
    improvements: [
      "Interface utilisateur moderne et intuitive",
      "Performance optimisée",
    ],
  },
  {
    id: 2,
    version: "0.9.0",
    date: "1 mars 2024",
    title: "Améliorations du tableau de bord",
    description:
      "Cette mise à jour apporte de nombreuses améliorations à l'expérience utilisateur.",
    features: [
      "Nouveau système de navigation",
      "Amélioration des graphiques analytiques",
    ],
    improvements: [
      "Temps de chargement réduit de 40%",
      "Interface responsive améliorée",
    ],
    fixes: [
      "Correction des bugs d'affichage sur mobile",
      "Résolution des problèmes de synchronisation",
    ],
  },
  {
    id: 3,
    version: "0.8.5",
    date: "20 février 2024",
    title: "Corrections de bugs",
    description:
      "Cette mise à jour se concentre sur la stabilité et les corrections de bugs.",
    fixes: [
      "Correction du problème de connexion",
      "Résolution des erreurs d'affichage",
      "Amélioration de la gestion des erreurs",
    ],
    improvements: ["Optimisation des requêtes API"],
  },
];
