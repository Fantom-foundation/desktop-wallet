// @flow
import React,{Component} from 'react';

type Props = {
  children: React.Node
};

export default class App extends Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}
