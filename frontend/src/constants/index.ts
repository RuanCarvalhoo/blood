export const COLORS = {
  // Cores Principais (Vibrantes)
  primary: "#EF4444", // Vermelho Gota
  primaryDark: "#B91C1C", // Sombra 3D do Vermelho

  secondary: "#3B82F6", // Azul
  secondaryDark: "#1D4ED8", // Sombra 3D do Azul

  success: "#22C55E", // Verde
  successDark: "#15803D", // Sombra 3D do Verde

  warning: "#EAB308", // Amarelo/Ouro
  warningDark: "#A16207", // Sombra 3D do Amarelo

  // Neutros
  dark: "#374151", // Cinza Escuro (Texto)
  mediumGray: "#9CA3AF", // Cinza Médio
  light: "#F3F4F6", // Cinza Claro (Background de inputs)
  white: "#FFFFFF",
  background: "#FFFFFF", // Fundo geral
  border: "#E5E7EB",
  gray: "#6B7280",
  danger: "#DC2626",
};

export const LEVELS = [
  {
    level: 1,
    name: "Gota de Esperança",
    minPoints: 0,
    maxPoints: 100,
    benefits: ["Badge de Iniciante"],
  },
  {
    level: 2,
    name: "Doador Regular",
    minPoints: 101,
    maxPoints: 300,
    benefits: ["Prioridade no agendamento"],
  },
  {
    level: 3,
    name: "Coração Solidário",
    minPoints: 301,
    maxPoints: 600,
    benefits: ["Certificado Digital", "Descontos parceiros"],
  },
  {
    level: 4,
    name: "Guardião da Vida",
    minPoints: 601,
    maxPoints: 1000,
    benefits: ["Kit Doador Exclusivo"],
  },
  {
    level: 5,
    name: "Lenda do Sangue",
    minPoints: 1001,
    maxPoints: Infinity,
    benefits: ["Evento de Gala Anual", "Reconhecimento Público"],
  },
];

export const POINTS_PER_DONATION = 100;

export const DONATION_INTERVAL_DAYS = {
  male: 60,
  female: 90,
};
