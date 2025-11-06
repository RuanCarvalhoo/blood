# Blood Donation App 🩸

Uma aplicação móvel multiplataforma (iOS e Android) que utiliza gamificação para incentivar e facilitar a doação de sangue. O aplicativo transforma o ato de doar em uma jornada engajadora e recompensadora.

## 🚀 Tecnologias

- **Framework**: React Native
- **Plataforma**: Expo (Managed Workflow)
- **Linguagem**: TypeScript
- **Estilização**: Styled Components
- **Navegação**: React Navigation
- **Ícones**: @expo/vector-icons (Ionicons)

## 📱 Funcionalidades

### Gamificação
- **Sistema de Pontos**: Ganhe 100 pontos por doação
- **Níveis Progressivos**: 5 níveis de progressão (Iniciante, Doador Regular, Herói do Sangue, Lenda Viva, Salvador de Vidas)
- **Badges e Conquistas**: Desbloqueie badges especiais ao atingir marcos
- **Benefícios por Nível**: Cada nível oferece benefícios exclusivos

### Funcionalidades Principais
- **Tela Inicial (Home)**: Visualize seu nível atual, pontos, estatísticas e próxima data de doação
- **Histórico de Doações**: Acompanhe todas as suas doações realizadas
- **Recompensas**: Visualize seus badges conquistados e sistema de níveis
- **Perfil**: Gerencie suas informações pessoais e veja seu impacto

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI (opcional, mas recomendado)

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/MarceloDChagas/blood.git
cd blood
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Execute em diferentes plataformas:
```bash
# Android
npm run android

# iOS (apenas em macOS)
npm run ios

# Web
npm run web
```

## 📂 Estrutura do Projeto

```
blood/
├── App.tsx                      # Componente principal
├── app.json                     # Configuração do Expo
├── package.json                 # Dependências
├── tsconfig.json               # Configuração TypeScript
├── assets/                     # Imagens e recursos
└── src/
    ├── components/             # Componentes reutilizáveis
    │   └── StyledComponents.ts # Componentes estilizados
    ├── constants/              # Constantes da aplicação
    │   └── index.ts           # Cores, níveis, pontos
    ├── navigation/             # Configuração de navegação
    │   └── AppNavigator.tsx   # Navegação principal
    ├── screens/                # Telas da aplicação
    │   ├── HomeScreen.tsx     # Tela inicial
    │   ├── DonationsScreen.tsx # Histórico de doações
    │   ├── RewardsScreen.tsx  # Recompensas e badges
    │   └── ProfileScreen.tsx  # Perfil do usuário
    ├── types/                  # Definições TypeScript
    │   └── index.ts           # Interfaces e tipos
    └── utils/                  # Funções utilitárias
        └── index.ts           # Helpers e calculadores
```

## 🎮 Sistema de Gamificação

### Níveis
1. **Iniciante** (0-100 pontos)
   - Badge de Iniciante

2. **Doador Regular** (101-300 pontos)
   - Badge de Doador Regular
   - Prioridade em agendamentos

3. **Herói do Sangue** (301-600 pontos)
   - Badge de Herói
   - Certificado de Honra
   - Descontos em parceiros

4. **Lenda Viva** (601-1000 pontos)
   - Badge de Lenda
   - Reconhecimento Especial
   - Brindes Exclusivos

5. **Salvador de Vidas** (1001+ pontos)
   - Badge Supremo
   - Homenagem Especial
   - Benefícios VIP

### Pontuação
- Cada doação: 100 pontos
- Intervalo entre doações: 60 dias (homens) / 90 dias (mulheres)

## 🎨 Design

- **Cores Principais**:
  - Primária: `#E74C3C` (Vermelho sangue)
  - Secundária: `#3498DB` (Azul)
  - Sucesso: `#27AE60` (Verde)
  - Fundo: `#F8F9FA` (Cinza claro)

- **Componentes Estilizados**: Usando styled-components para consistência visual
- **Interface Intuitiva**: Design focado na experiência do usuário

## 📝 Licença

Este projeto está sob a licença MIT.

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ para salvar vidas através da doação de sangue
