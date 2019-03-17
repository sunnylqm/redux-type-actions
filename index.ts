export function createAction<T>() {
  return (type: string) => (payload: T) => ({ type, payload });
}

export const NoArgAction = (type: string) => () => ({ type, payload: undefined });
export const ToggleAction = createAction<boolean>();
export const StringAction = createAction<string>();
export const NumberAction = createAction<number>();

type TypedActions<T extends { [key: string]: (...args: any[]) => any }> = { [K in keyof T]: ReturnType<T[K]> };

export function createActions<ActionsMapping extends { [key: string]: (...args: any[]) => any }>(
  actions: ActionsMapping,
) {
  const typedActions: Partial<TypedActions<ActionsMapping>> = {};

  let keyOutofClosure: keyof ActionsMapping;
  for (keyOutofClosure in actions) {
    const key = keyOutofClosure;
    const typedAction = actions[key](key);
    typedAction.toString = () => key; // for redux-saga
    typedActions[key] = typedAction;
  }

  return typedActions as TypedActions<ActionsMapping>;
}

type refineAction<T extends { [key: string]: (...args: any[]) => any }> = {
  [K in keyof T]: ReturnType<T[K]> & { type: K }
};

type ValueOf<T> = T[keyof T];

export type ActionValue<T extends { [key: string]: (...args: any[]) => any }> = ValueOf<refineAction<T>>;
