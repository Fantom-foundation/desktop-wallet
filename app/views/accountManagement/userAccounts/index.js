import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import AccountCard from '../accountCard/index';
import Store from '../../../store/userInfoStore/index';


class UserAccounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userAccountStore: '',
            storeKeys: [],
        }
    }

    componentWillReceiveProps() {
        const { storeKeys } =this.props;
        const userAccountStore = Store.store;
        if (storeKeys.length > 1) {
            this.setState({
                userAccountStore,
                storeKeys,
            })
        }
    }

    renderAccountCard() {
        const { userAccountStore, storeKeys } = this.state;

        let account = '';
        const accountList = [];
        if (storeKeys) {
            // const keys = Object.keys(userAccountStore);
            for (const key of storeKeys) {
                if (key !== this.props.address) {
                    account = <AccountCard
                        key={`${key}`}
                        accountInfo={userAccountStore[key]}
                        handleSelectedAccount={this.props.handleSelectedAccount}
                        copyToClipboard={this.props.copyToClipboard} />

                    accountList.push(account);
                }
            }
            return accountList;
        }

        // let account = '';
        // const accountList = [];
        // if (userAccountStore) {
        //     const keys = Object.keys(userAccountStore);
        //     for (const key of keys) {
        //         if (key !== this.props.address) {
        //             account = <AccountCard
        //                 key={`${key}`}
        //                 accountInfo={userAccountStore[key]}
        //                 handleSelectedAccount={this.props.handleSelectedAccount}
        //                 copyToClipboard={this.props.copyToClipboard} />

        //             accountList.push(account);
        //         }
        //     }
        //     return accountList;
        // }
    }

    render() {
        return (
            <div>
                <Row className="mt-5">
                    <Col>
                        <h2 className="title large roboto"><span>Accounts</span></h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>  {this.renderAccountCard()}</Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserAccounts;