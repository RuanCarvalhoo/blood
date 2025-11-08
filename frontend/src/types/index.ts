// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  bloodType: BloodType;
  gender: "male" | "female";
  level: number;
  points: number;
  totalDonations: number;
  totalDonationsThisYear: number;
  badges: Badge[];
  donations?: Donation[];
  donationHistory?: DonationHistory[];
  nextDonationDate?: Date;
  lastDonationDate?: Date;
}

export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

// Donation Types
export interface Donation {
  id: string;
  userId: string;
  date: Date;
  location: string;
  pointsEarned: number;
}

// Usage Details Types
export type PatientType =
  | "Cirurgia de emergência"
  | "Paciente oncológico"
  | "Acidente de trânsito"
  | "Parto complicado"
  | "Criança com anemia"
  | "Cirurgia eletiva"
  | "Paciente idoso"
  | "Doença hematológica";

export type UsageDescription =
  | "Transfusão durante cirurgia cardíaca"
  | "Tratamento de leucemia"
  | "Reposição após trauma múltiplo"
  | "Hemorragia pós-parto"
  | "Tratamento de anemia severa"
  | "Cirurgia de transplante de fígado"
  | "Tratamento de úlcera digestiva"
  | "Transfusão para anemia aplástica";

export type HospitalName =
  | "Hospital Central"
  | "Hospital Santa fé"
  | "Maternidade São José";

export interface UsageDetails {
  patientType: PatientType;
  usage: UsageDescription;
  date: Date;
  hospital: HospitalName;
}

export interface DonationHistory {
  id: string;
  date: Date;
  location: HospitalName;
  usageDetails: UsageDetails[];
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
}

export interface Level {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
}

// Navigation Types
export type RootStackParamList = {
  MainTabs: undefined;
  Schedule: undefined;
  Impact: undefined;
  DonationDetail: { donationId: string };
};

export type TabParamList = {
  Home: undefined;
  Donations: undefined;
  Rewards: undefined;
  Profile: undefined;
};
