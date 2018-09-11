import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {clipboard} from 'electron';
import moment from 'moment';

import copyImage from '../../images/icons/copy.svg';
import arrowLeftRight from '../../images/icons/arrows-left-right.svg';
import Header from '../../general/header/index';
import  Identicons  from '../../general/identicons/identicons';
import fantomIcon from '../../images/icons/fantom_Icon.png';


import UserAccount from './userAccounts/index';
import QRCodeIcon from '../../general/qr/index';
import Store from '../../store/userInfoStore/index';

export default class AccountManagement extends React.Component {
  
  transactionLoop(){
    let allTransaction = null;
    if(this.props.transactionData){
      allTransaction = this.props.transactionData.map((data, index)=>(
        <Row key={index} className="bg-gray mt-2">
                  <Col className="gray-column transactions-details small">
                    <Row>
                      <Col className="blank-88 hide-at-991"></Col>
                      <Col className="">
                        <Row>
                          <Col ><h4 className="text-ellipsis  w-208"><span>TX# <a href="#">{data.hash}</a></span></h4></Col>
                          <Col><h4 className=" text-right text-primary"><span>{moment(data.time,'X').fromNow()}</span></h4></Col>
                        </Row>
                        <Row>
                          <Col className="blank-184"><h4 className="text-gray text-ellipsis  w-148"><span >From <a href="#">{data.from}</a></span></h4></Col>
                          <Col ><h4 className="text-gray text-ellipsis  w-185"><span>to <a href="#">{data.to}</a></span></h4></Col>
                        </Row>
                        <Row>
                          <Col><h4 className="text-gray"><span>Amount {data.amount} <a href="#"><strong>Fantom</strong></a></span></h4></Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>

      ));
    }
    return allTransaction;
  }

  copyToClipboard(copyText) {
    clipboard.writeText(copyText);            
}

  handleUserSettings(){
    if(this.props.handleUserSettings){
      this.props.handleUserSettings();
    }
  }

  render() {
    let transactionLength = 0;
    if(this.props.transactionData){
      transactionLength = this.props.transactionData.length;
    }
    return (
      <div>
        <Header handleUserSettings={this.handleUserSettings.bind(this)}/>
        <section style={{ padding: '118px 0' }}>
          <Container className="bg-white">
            <Row className="bg-primary py-1 account-management-header">
              <Col md={5} className="col text-white pl-4 text-uppercase">Account Management</Col>
              <Col className="col text-white text-uppercase" onClick={() => this.props.handleSendFunds()}><img src={arrowLeftRight} className="mr-1" /> Transfer</Col>
            </Row>
            <Row >
              <Col className="px-5 py-4">
                <Row className="bg-gray ">
                  <Col lg={8} className="gray-column large">

                    <div className="person-info large">
                      <span className="person-basic-info">
                        <div className="d-inline-block align-top block">
                              <Identicons id={this.props.identiconsId} className="person-image theme-blue-shadow" 
                        width={40} size={3} />
                          {/* <img src={identicon1} className="person-image theme-blue-shadow" /> */}
                        </div>
                        <div className="d-inline-block align-top block">
                          <h2 className="person-name">{ this.props.name }</h2>

                          <div className="person-copy-info">
                            <div className="info-description-box pl-0">
                              <span className="mr-3" onClick={() => this.copyToClipboard(this.props.address)}>
                                <img src={copyImage} className="copy mr-3" />
                              </span>
                              <span className="">{ this.props.address }</span>
                            </div>
                          </div>

                        </div>
                      </span>
                      <Row className=" mt-3 mt-lg-0">
                        <Col className="blank-88 hide-at-991"></Col>
                        <Col>
                          <div className="">

                            <p className="text large text-gray mb-0"></p>
                            <p className="text large text-gray mb-5">{transactionLength} Outgoing transactions</p>

                          </div>

                          <div className="bg-white ftm-block theme-blue-shadow text-center p-2 m-auto ml-lg-0">
                            <h3 className="text-right pr-4"><span>(1,000\ = 1.00002312FTM)</span></h3>
                            <h2><span><strong>{this.props.balance ? `${this.props.balance}`: '00,0000'} <span className="medium-text">FTM</span></strong></span></h2>
                            <h3><span>0,0000\</span></h3>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <QRCodeIcon 
                    className='text-right gray-column large qr'
                    address={this.props.address}
                    icon={fantomIcon}
                    text='FANTOM'
                  />
                   
                </Row>


                <Row className="bg-gray mt-4">
                  <Col className="px-5 py-2">
                    <h2 className="r-title text-gray mb-0"><span>Transactions</span></h2>
                  </Col>
                </Row>
                {this.transactionLoop()}
                {Store.size > 1 && <UserAccount 
                  address={this.props.address}
                  handleSelectedAccount={this.props.handleSelectedAccount}
                  copyToClipboard={this.copyToClipboard.bind(this)}/>}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}