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
    name: "Corrente de Vida",
    description: "Parabéns pela sua primeira doação!",
    icon: "🩸", 
    requiredDonations: 1,
  },
  {
    id: "regular-donor",
    name: "Emblema do Ciclo",
    description: "Alcançou 5 doações, estabelecendo um ciclo regular.",
    icon: "⭐", 
    requiredDonations: 5,
  },
  {
    id: "blood-hero",
    name: "O Guardião",
    description: "Um marco de 10 doações. Você é um pilar da comunidade.",
    icon: "🦸",
    requiredDonations: 10,
  },
  {
    id: "life-saver",
    name: "Rei da Solidariedade",
    description: "Com 25 doações, sua influência na vida dos outros é notável.",
    icon: "👑",
    requiredDonations: 25,
  },
  {
    id: "living-legend",
    name: "Cinquentenário de Honra",
    description: "Atingiu 50 doações. Uma dedicação lendária à causa.",
    icon: "🏆",
    requiredDonations: 50,
  },
  {
    id: "ultimate-champion",
    name: "Legado de Sangue",
    description: "Um feito de 100 doações. Você construiu um verdadeiro legado de vidas salvas.",
    icon: "💎",
    requiredDonations: 100,
  },
] as const;

export function getBadgeByDonations(
  donations: number
): BadgeDefinition | undefined {
  return BADGES.find((badge) => badge.requiredDonations === donations);
}

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
