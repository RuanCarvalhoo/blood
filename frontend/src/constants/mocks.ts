export const MOCK_HEMOCENTERS = [
  {
    id: "1",
    name: "Hemocentro Principal",
    address: "Av. Dr. Enéas Carvalho de Aguiar, 155 - Cerqueira César",
    city: "São Paulo",
    state: "SP",
    distance: "2.5 km",
    availableSlots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
  },
  {
    id: "2",
    name: "Hospital das Clínicas",
    address: "Rua Dr. Ovídio Pires de Campos, 225",
    city: "São Paulo",
    state: "SP",
    distance: "3.8 km",
    availableSlots: ["08:30", "09:30", "11:00", "13:30", "16:00"],
  },
  {
    id: "3",
    name: "Santa Casa de Misericórdia",
    address: "Rua Dr. Cesário Mota Júnior, 112",
    city: "São Paulo",
    state: "SP",
    distance: "5.1 km",
    availableSlots: ["07:00", "08:00", "12:00", "14:00"],
  },
];

export const MOCK_DONATION_HISTORY = [
  {
    id: "1",
    date: "2023-10-15",
    location: "Hemocentro Principal",
    amount: "450ml",
    type: "Sangue Total",
  },
  {
    id: "2",
    date: "2023-06-10",
    location: "Hospital das Clínicas",
    amount: "450ml",
    type: "Sangue Total",
  },
  {
    id: "3",
    date: "2023-02-05",
    location: "Santa Casa de Misericórdia",
    amount: "450ml",
    type: "Sangue Total",
  },
];

export const MOCK_REWARDS = [
  {
    id: "1",
    title: "Ingresso de Cinema",
    cost: 500,
    image: "https://img.freepik.com/free-vector/cinema-tickets-concept-illustration_114360-6116.jpg",
    description: "Um ingresso para qualquer filme na rede Cinemark.",
  },
  {
    id: "2",
    title: "Desconto em Livraria",
    cost: 300,
    image: "https://img.freepik.com/free-vector/book-lovers-concept-illustration_114360-1094.jpg",
    description: "R$ 30,00 de desconto em compras acima de R$ 100,00.",
  },
  {
    id: "3",
    title: "Café Grátis",
    cost: 150,
    image: "https://img.freepik.com/free-vector/coffee-break-concept-illustration_114360-3779.jpg",
    description: "Um café expresso ou cappuccino pequeno.",
  },
];

export const MOCK_IMPACT = [
  {
    id: "1",
    date: "2023-10-20",
    patient: "João S.",
    hospital: "Hospital das Clínicas",
    condition: "Cirurgia Cardíaca",
    message: "Obrigado por salvar minha vida!",
  },
  {
    id: "2",
    date: "2023-06-15",
    patient: "Maria O.",
    hospital: "Santa Casa",
    condition: "Tratamento Oncológico",
    message: "Sua doação fez a diferença no meu tratamento.",
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "Sua doação salvou vidas!",
    message: "O sangue que você doou em 15/10 foi utilizado hoje.",
    date: "2023-10-20T10:00:00",
    read: false,
    type: "impact",
  },
  {
    id: "2",
    title: "Hora de doar novamente!",
    message: "Já se passaram 60 dias desde sua última doação.",
    date: "2023-12-15T09:00:00",
    read: true,
    type: "reminder",
  },
  {
    id: "3",
    title: "Novo nível alcançado!",
    message: "Parabéns! Você atingiu o nível Ouro.",
    date: "2023-10-15T14:30:00",
    read: true,
    type: "achievement",
  },
];
