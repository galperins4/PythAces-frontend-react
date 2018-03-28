import React, { Component } from 'react';
import axios from 'axios';
import CoinDescription from './coin/CoinDescription';
import ContractForm from './contractForm/ContractForm';
import Pending from './pending/Pending';
import './App.css';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      capacity: {},
      contracts: [],
      coin: '',
      contractForm: {},
      fees: {
        'Flat fee': '',
        'Percent fee': '',
      },
      prices: {},
      showModal: false,
    }
  }

  modalClose = () => {
    this.setState({
      showModal: false,
    });
  }

  modalOpen = () => {
    this.setState({
      showModal: true,
    });
  }

  componentWillMount() {
    this.getPrices();
    this.getCapacity();
    this.getContracts();
  }

  getPrices = () => {
    axios.get(`http://pythaces.delegate-goose.biz/prices`)
      .then(res => {
        this.setState({
          fees: {
            'Flat fee': res.data.fees['Flat fee'],
            'Percent fee': res.data.fees['Percent fee'],
          },
          prices: res.data.prices,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  getCapacity = () => {
    axios.get(`http://pythaces.delegate-goose.biz/capacity`)
      .then(res => {
        this.setState({
          capacity: res.data,
        });
      });
  }

  getContracts = () => {
    axios.get(`http://pythaces.delegate-goose.biz/contracts`)
      .then(res => {
        this.setState({
          contracts: res.data,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  handleCoinSelect = coin => {
    this.setState({
      coin,
    });
  }

  render() {
    const feeFlat = (this.state.fees['Flat fee']) ? this.state.fees['Flat fee'] : '-';
    const feePercent = (this.state.fees['Percent fee']) ? this.state.fees['Percent fee'] : '-';
    return (
      <div className="App">
        <div className="view full-page-intro">
          <div className="d-flex justify-content-center align-items-center">
            <div className="container full-page-container">
              <div className="row">
                <div className="col-md-6 mb-4 white-text text-center text-md-left">

                  <img
                    alt="PythACES logo"
                    className="pull-left"
                    style={{
                      height: '3.9rem',
                      margin: '0 1rem 0 0',
                    }}
                    src="/img/redbadge.png"
                  />

                  <h1 className="display-4 font-weight-bold">PythACES</h1>
                </div>
                <div className="col-md-6 mb-4 white-text text-center text-md-right">
                  <h2>Fees</h2>
                  <p>{feeFlat} &#1126; + {feePercent}%</p>
                </div>
              </div>
              <hr className="hr-light" />

              <h2 className="white-text mb-4">Step 1: Select a Coin</h2>

              <CoinDescription coins={this.state.capacity} prices={this.state.prices} handleCoinSelect={this.handleCoinSelect} selected={this.state.coin} />

              <h2 className="white-text mb-4">Step 2: Create a Contract</h2>
              <div className="row">
                <ContractForm coin={this.state.coin} />

                <Pending contracts={this.state.contracts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
