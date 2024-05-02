import { setup } from 'xstate';

export const machine = setup({
  types: {
    context: {} as {
      audioRef: string;
      currentTime: number;
      trackSource: string;
      audioContext: string;
    },
    events: {} as
      | { type: 'loading' }
      | { type: 'init-error' }
      | { type: 'error' }
      | { type: 'loaded' }
      | { type: 'play' }
      | { type: 'pause' }
      | { type: 'restart' }
      | { type: 'end' }
      | { type: 'time' },
  },
  actions: {
    onPause: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    onPlay: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    onError: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    onLoad: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    onRestart: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    onUpdateTime: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
  },
  schemas: {
    events: {
      loading: {
        type: 'object',
        properties: {},
      },
      'init-error': {
        type: 'object',
        properties: {},
      },
      error: {
        type: 'object',
        properties: {},
      },
      loaded: {
        type: 'object',
        properties: {},
      },
      play: {
        type: 'object',
        properties: {},
      },
      pause: {
        type: 'object',
        properties: {},
      },
      restart: {
        type: 'object',
        properties: {},
      },
      end: {
        type: 'object',
        properties: {},
      },
      time: {
        type: 'object',
        properties: {},
      },
    },
    context: {
      audioRef: {
        type: 'string',
        description: '',
      },
      currentTime: {
        type: 'number',
        description: '',
      },
      trackSource: {
        type: 'string',
        description: '',
      },
      audioContext: {
        type: 'string',
        description: '',
      },
    },
  },
}).createMachine({
  context: {
    audioRef: null,
    currentTime: 0,
    trackSource: null,
    audioContext: null,
  },
  id: 'Audio Player',
  initial: 'Init',
  states: {
    Init: {
      on: {
        'init-error': {
          target: 'Error',
          actions: {
            type: 'onError',
          },
        },
        loading: {
          target: 'Loading',
          actions: {
            type: 'onLoad',
          },
        },
      },
    },
    Error: {
      type: 'final',
    },
    Loading: {
      on: {
        error: {
          target: 'Error',
          actions: {
            type: 'onError',
          },
        },
        loaded: {
          target: 'Active',
        },
      },
    },
    Active: {
      initial: 'Paused',
      states: {
        Paused: {
          on: {
            play: {
              target: 'Playing',
            },
            restart: {
              target: 'Playing',
              actions: {
                type: 'onRestart',
              },
            },
          },
          entry: {
            type: 'onPause',
          },
        },
        Playing: {
          on: {
            pause: {
              target: 'Paused',
            },
            end: {
              target: 'Paused',
            },
            restart: {
              target: 'Playing',
              actions: {
                type: 'onRestart',
              },
            },
            time: {
              target: 'Playing',
              actions: {
                type: 'onUpdateTime',
              },
            },
          },
          entry: {
            type: 'onPlay',
          },
        },
      },
    },
  },
});
