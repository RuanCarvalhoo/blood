export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredDonations: number;
}

export const BADGES: readonly BadgeDefinition[] = [
  {
    id: "first-donation",
    name: "Primeira Doação",
    description: "Parabéns pela sua primeira doação!",
    icon: "🩸",
    requiredDonations: 1,
  },
  {
    id: "regular-donor",
    name: "Doador Regular",
    description: "Realizou 5 doações",
    icon: "⭐",
    requiredDonations: 5,
  },
  {
    id: "blood-hero",
    name: "Herói do Sangue",
    description: "Realizou 10 doações",
    icon: "🦸",
    requiredDonations: 10,
  },
  {
    id: "life-saver",
    name: "Salvador de Vidas",
    description: "Realizou 25 doações",
    icon: "👑",
    requiredDonations: 25,
  },
  {
    id: "living-legend",
    name: "Lenda Viva",
    description: "Realizou 50 doações",
    icon: "🏆",
    requiredDonations: 50,
  },
  {
    id: "ultimate-champion",
    name: "Campeão Supremo",
    description: "Realizou 100 doações",
    icon: "💎",
    requiredDonations: 100,
  },
] as const;

/**
 * Busca um badge por número de doações
 */
export function getBadgeByDonations(
  donations: number
): BadgeDefinition | undefined {
  return BADGES.find((badge) => badge.requiredDonations === donations);
}

/**
 * Retorna todos os badges que o usuário deve ter com base no número de doações
 */
export function getBadgesForDonationCount(
  donations: number
): BadgeDefinition[] {
  return BADGES.filter((badge) => donations >= badge.requiredDonations);
}

/**
 * Retorna badges que o usuário acabou de conquistar
 * (badges que requerem exatamente o número atual de doações)
 */
export function getNewlyEarnedBadges(donations: number): BadgeDefinition[] {
  return BADGES.filter((badge) => badge.requiredDonations === donations);
}
