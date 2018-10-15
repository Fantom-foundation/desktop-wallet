import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import type { Store } from '../reducers/types';

import Routes from '../Routes';


// type Props = {
//   store: Object,
//   history: Object
// };

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  
  props: Props;

// static defaultProps = {
//   store: Store,
//   history: {}
// };

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
