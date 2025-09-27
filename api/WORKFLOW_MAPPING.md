# Mapping du Workflow de Tour de Jeu

## Diagramme du Workflow Original

```
graph TD
    K["Début du tour"]-->A
    A["Deck ou défausse ? __GET_CARD_IN_DECK_OR_DEFAUSSE__"] --> |deck|B("`Tirer une carte dans le Deck
    __SWITCH_WITH_DECK__`")
    A --> |defausse|C("Tirer une carte dans la Défausse __SWITCH_WITH_DEFAUSSE__")
    B --> |deckToDefausse|D["Déposer dans la défausse"]
    B --> |deckToPlayer|E["Switch avec une carte du joueur"]
    C --> |defausseToPlayer|F["Switch avec une carte du joueur"]
    F --> L
    D --> L
    E --> L["Carte Spéciale ?"]
    L --> M["Ouverture interventions"]
    M --> G["Fin du tour"]
```

## Mapping avec les Événements WebSocket

### 1. **Étape 1: Début du tour**

- **Événement WebSocket**: `turn:started`
- **Handler**: `TurnHandler` (à implémenter)
- **Description**: Le joueur commence son tour

### 2. **Étape 2: Choix Deck/Défausse**

- **Événement WebSocket**: `getCardInDeckOrDefausse`
- **Événement Broadcast**: `turn:card-source-chosen`
- **Handler**: `TurnHandler.handleGetCardInDeckOrDefausse()`
- **Description**: Le joueur choisit entre deck ou défausse

### 3. **Étape 3A: Switch avec le Deck**

- **Événement WebSocket**: `switchWithDeck`
- **Événement Broadcast**: `turn:card-switched`
- **Handler**: `TurnHandler.handleSwitchWithDeck()`
- **Actions possibles**:
  - `deckToDefausse`: Déposer la carte dans la défausse
  - `deckToPlayer`: Échanger avec une carte de sa main

### 3. **Étape 3B: Switch avec la Défausse**

- **Événement WebSocket**: `switchWithDefausse`
- **Événement Broadcast**: `turn:card-switched`
- **Handler**: `TurnHandler.handleSwitchWithDefausse()`
- **Action**: `defausseToPlayer`: Échanger avec une carte de sa main

### 4. **Étape 4: Détection Carte Spéciale**

- **Événement Broadcast**: `turn:special-card-detected`
- **Handler**: `CardHandler.handleSpecialCard()` (à implémenter)
- **Description**: Vérification si la carte tirée a un effet spécial

### 5. **Étape 5: Ouverture des Interventions**

- **Événement Broadcast**: `turn:intervention-phase-opened`
- **Événement WebSocket**: `intervention`
- **Événement Broadcast**: `intervention:used`
- **Handler**: `InterventionHandler.handleIntervention()`
- **Description**: Les autres joueurs peuvent intervenir

### 6. **Étape 6: Fermeture des Interventions**

- **Événement WebSocket**: `interventionResponse`
- **Événement Broadcast**: `intervention:response`
- **Événement Broadcast**: `intervention:phase-ended`
- **Handler**: `InterventionHandler.handleInterventionResponse()`

### 7. **Étape 7: Fin du Tour**

- **Événement WebSocket**: `endTurn`
- **Événement Broadcast**: `turn:ended`
- **Handler**: `TurnHandler.handleEndTurn()`
- **Description**: Passage au joueur suivant

## Types d'Événements par Catégorie

### **TurnEvents** (Gestion des tours)

- `turn:started` - Début du tour
- `turn:card-source-chosen` - Choix deck/défausse
- `turn:card-switched` - Échange de cartes
- `turn:special-card-detected` - Carte spéciale détectée
- `turn:intervention-phase-opened` - Phase d'interventions ouverte
- `turn:intervention-phase-closed` - Phase d'interventions fermée
- `turn:ended` - Fin du tour

### **CardEvents** (Actions sur les cartes)

- `card:played` - Carte jouée
- `card:drawn` - Carte tirée
- `card:discarded` - Carte défaussée
- `card:special-used` - Effet spécial utilisé
- `card:player-dodged` - Joueur a esquivé
- `card:swapped` - Cartes échangées

### **InterventionEvents** (Système d'interventions)

- `intervention:used` - Intervention utilisée
- `intervention:response` - Réponse à l'intervention
- `intervention:phase-ended` - Phase d'interventions terminée
- `intervention:cancelled` - Intervention annulée

### **GameEvents** (États de jeu globaux)

- `game:started` - Partie commencée
- `game:ended` - Partie terminée
- `game:round-started` - Round commencé
- `game:round-ended` - Round terminé
- `game:player-joined` - Joueur rejoint
- `game:player-left` - Joueur quitte
- `game:state-changed` - État de jeu changé

## Pattern d'Événements

Chaque action suit le pattern :

```
Client A → WebSocket Event → Validation → Logique Métier → Broadcast à tous les clients
```

### Exemple concret :

1. **Client A** envoie `getCardInDeckOrDefausse` avec `{gameId, playerId, choice: 'deck'}`
2. **Serveur** valide que c'est bien le tour du joueur
3. **Serveur** exécute la logique métier
4. **Serveur** broadcast `turn:card-source-chosen` à tous les joueurs de la partie
5. **Tous les clients** reçoivent l'événement avec les détails de l'action
