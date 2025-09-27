/**clear: () => {
    set({
      currentPlayerId: "",
      playerIdWhoPlays: "",
      focusMode: false,
      actionQueue: [],
      currentAction: {
        time: 0,
        countdownState: false,
        idTimer: 0,
        action: null,
      },
      actionsHistory: { players: [], datas: [] },
      game: { id: 0, gameState: "WAITING", round: 0 },
      options: { nbCards: 0, timeToPlay: 0, maxPlayers: 6 },
      players: [],
    });
  },

  dodge: () => {
    console.log("dodge");
    // TODO: socket.emit('dodge_player', game.id);
  },

  distributionCoupOeil: () => {
    // TODO: Implémenter l'animation de distribution
    console.log("distributionCoupOeil");
  },

  startCountdownActionPlayer: () => {
    const state = get();
    const timeToPlay = state.options.timeToPlay * 2; // car il y a 2 actions minimums
    const newId = state.currentAction.idTimer + 1;

    set({
      currentAction: {
        ...state.currentAction,
        time: timeToPlay,
        idTimer: newId,
      },
    });

    setTimeout(() => {
      const currentState = get();
      if (currentState.currentAction.idTimer === newId) {
        set({
          currentAction: {
            ...currentState.currentAction,
            time: 0,
            countdownState: false,
          },
        });
      }
    }, state.options.timeToPlay * 1000);
  },

  addPlayerToHistorique: (player: Player) => {
    set((state) => {
      const newPlayers = [...state.actionsHistory.players];
      const newDatas = [...state.actionsHistory.datas];

      /*const lastPlayer = newPlayers.length - 1;
      if (lastPlayer >= 0) {
        newPlayers[lastPlayer] = {
          ...newPlayers[lastPlayer],
          finishTour: true,
        };
      }

      newPlayers.push(player);
      newDatas.push([]);

      return {
        actionsHistory: {
          players: newPlayers,
          datas: newDatas,
        },
      };
    });
  },

  addActionToHistorique: (action: unknown) => {
    set((state) => {
      const newDatas = [...state.actionsHistory.datas];
      const nbPlayers = state.actionsHistory.players.length;

      /*if (newDatas[nbPlayers - 1]) {
        newDatas[nbPlayers - 1] = [...newDatas[nbPlayers - 1], action];
      }

      return {
        actionsHistory: {
          ...state.actionsHistory,
          datas: newDatas,
        },
      };
    });
  },

  setLastActionToHistorique: (message: string) => {
    set((state) => {
      /*const newDatas = [...state.actionsHistory.datas];
      const nbPlayers = state.actionsHistory.players.length;
      const nbActions = newDatas[nbPlayers - 1]?.length || 0;

      if (newDatas[nbPlayers - 1] && newDatas[nbPlayers - 1][nbActions - 1]) {
        newDatas[nbPlayers - 1][nbActions - 1] = {
          ...newDatas[nbPlayers - 1][nbActions - 1],
          message,
        };
      }

      return {
        actionsHistory: {
          ...state.actionsHistory,
          //datas: newDatas,
        },
      };
    });*/
