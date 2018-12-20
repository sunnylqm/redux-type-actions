import { ActionValueType } from './actions';
const intialState = {
  counter: 0,
  counterEnabled: false,

  loadingText: '',
  resultText: '',
  resultTime: null,
};

function reducers(state = intialState, action: ActionValueType) {
  switch (action.type) {
    case 'showLoading':
      return {
        ...state,
        loadingText: action.payload,
      };
    case 'showResult':
      const { text, time } = action.payload;
      return {
        ...state,
        resultText: `${text} sent on ${time.toLocaleDateString()}`,
      };

    default:
      return state;
  }
}

export default reducers;
