import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type counterStateType = {
  +counter: number
};

export type Action = {
  +type: string
};

export type GetState = () => counterStateType;

// $FlowFixMe
export type Dispatch = ReduxDispatch<Action>;
// $FlowFixMe
export type Store = ReduxStore<GetState, Action>;
