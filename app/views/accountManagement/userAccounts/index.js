import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import AccountCard from '../accountCard/index';
import Store from '../../../store/userInfoStore/index';


class UserAccounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userAccountStore: ''
        }
    }

    componentDidMount() {
        const userAccountStore = Store.store;
        if (Store.size > 1) {
            this.setState({
                userAccountStore,
            })
        }
    }

    renderAccountCard() {
        const { userAccountStore } = this.state;
        let account = '';
        let accountList = [];
        if (userAccountStore) {
            const keys = Object.keys(userAccountStore);
            for (const key of keys) {
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