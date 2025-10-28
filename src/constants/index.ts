export const COLORS = {
  primary: '#E74C3C',
  secondary: '#3498DB',
  success: '#27AE60',
  warning: '#F39C12',
  danger: '#C0392B',
  dark: '#2C3E50',
  light: '#ECF0F1',
  white: '#FFFFFF',
  gray: '#95A5A6',
  background: '#F8F9FA',
};

export const LEVELS = [
  {
    level: 1,
    name: 'Iniciante',
    minPoints: 0,
    maxPoints: 100,
    benefits: ['Badge de Iniciante'],
  },
  {
    level: 2,
    name: 'Doador Regular',
    minPoints: 101,
    maxPoints: 300,
    benefits: ['Badge de Doador Regular', 'Prioridade em agendamentos'],
  },
  {
    level: 3,
    name: 'Herói do Sangue',
    minPoints: 301,
    maxPoints: 600,
    benefits: ['Badge de Herói', 'Certificado de Honra', 'Descontos em parceiros'],
  },
  {
    level: 4,
    name: 'Lenda Viva',
    minPoints: 601,
    maxPoints: 1000,
    benefits: ['Badge de Lenda', 'Reconhecimento Especial', 'Brindes Exclusivos'],
  },
  {
    level: 5,
    name: 'Salvador de Vidas',
    minPoints: 1001,
    maxPoints: Infinity,
    benefits: ['Badge Supremo', 'Homenagem Especial', 'Benefícios VIP'],
  },
];

export const POINTS_PER_DONATION = 100;

export const DONATION_INTERVAL_DAYS = {
  male: 60,
  female: 90,
};
