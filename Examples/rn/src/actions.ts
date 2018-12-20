import {
  ActionValue,
  createAction,
  createActions,
  NoArgAction,
  NumberAction,
  StringAction,
} from 'redux-type-actions';

const actions = createActions({
  pretendToFetch: NoArgAction,
  showLoading: StringAction,
  updateProgress: NumberAction,
  showResult: 
    createAction<{ text: string; time: Date }>(),
});

export type ActionValueType 
  = ActionValue<typeof actions>;

export default actions;
