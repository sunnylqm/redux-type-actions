# redux-type-actions ![npm version](https://img.shields.io/npm/v/redux-type-actions.svg)

Make redux actions easy to write and type-safe!
No more `"UGLY_UPPER_CASE_UNDERSCORE_ACTION"` and bring `auto complete` to the redux world!

![](https://user-images.githubusercontent.com/615282/50281670-3654c080-048b-11e9-8ff9-ffbee9f193c6.gif)

### Installation

```
yarn add redux-type-actions
```

You don't need any configurations for react-native typescript projects. But if you don't have one,

```
# Create a new react-native project with typescript support
react-native init MyProject --template typescript
```

Configurations for web are WIP.

### Usage

```typescript
// actions.ts
import {
  ActionValue,
  createAction,
  createActions,
  NoArgAction,
  NumberAction,
  StringAction,
  ToggleAction,
} from 'redux-type-actions';

// Declare your actions like this
const actions = createActions({
  pretendToFetch: NoArgAction,
  showLoading: StringAction,
  updateProgress: NumberAction,

  // Complex object action
  showResult:
    createAction<{ text: string; time: Date }>(),
});

// Export your action value type for reducers
export type ActionValueType
  = ActionValue<typeof actions>;

export default actions;
```

```typescript
// reducers.ts
import { ActionValueType } from './actions';

function reducers(state,
   action: ActionValueType) {  // <- ActionValueType
  switch (action.type) {
    case 'showResult':
      const { text, time } = action.payload;
      return {
        ...state,
        resultText: `${text} sent on ${time.toLocaleDateString()}`
      }
    default:
      return state;
  }
}
```


```typescript
// sagas.ts
import { delay, fork, put, take } from 'redux-saga/effects';
import actions from './actions';

function* watchPretendToFetch() {
  while (true) {
    yield take(actions.pretendToFetch);
    yield put(actions.showLoading('Now Loading...'));
    yield delay(3000);
    yield put(actions.updateProgress(50));
    yield delay(3000);
    yield put(actions.updateProgress(100));
    yield put(
      actions.showResult({
        text: 'Hello',
        time: new Date(),
      }),
    );
  }
}
```
