import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Contract from '../contract/Contract';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

class ContractForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractForm: {},
      contract: {
        address: '',
        amount: 0,
        showContract: false,
        vendorfield: '',
      }
    }
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      contractForm: {
        ...this.state.contractForm,
        [e.target.name]: e.target.value,
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    // Amount must be a number.
    const amount = (this.state.contractForm.amount) ? parseInt(this.state.contractForm.amount, 10) : '';
    const receive = this.state.contractForm.receive;
    const send = this.state.contractForm.send;

    if (!isNaN(amount) && receive && send) {
      axios.post(`http://pythaces.delegate-goose.biz/${this.props.coin}`, { amount, receive, send })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            contract: {
              address: res.data.address,
              amount: res.data.amount,
              showContract: true,
              vendorfield: res.data.vendorfield,
            }
          });
        }
      })
      .catch(err => {
        console.log(err.response);
      });
    }
  }

  render() {
    const { coin = '' } = this.props;
    const { showContract, address, amount, vendorfield } = this.state.contract;

    return (
        showContract ?

          <Contract address={address} amount={amount} coin={coin} vendorfield={vendorfield} />

          :

          <div className="col-md-6 offset-md-3 mb-4">
            <div className="card">
              <div className="card-body">

                <form onSubmit={this.handleSubmit}>
                  <h3 className="dark-grey-text text-center">
                    <strong>Create an Ark Contract</strong>
                  </h3>
                  {
                    (coin) ? <h4 className="text-center">{coin}</h4> : null
                  }
                  <hr />
                  <div className="md-form">
                    <i className="fa fa-address-book prefix grey-text" />
                    <input type="text" id="send" name="send" className="form-control" onChange={(e) => {this.handleChange(e);}} />
                    <label htmlFor="send">Your Ark Address</label>
                  </div>
                  <div className="md-form">
                    <i className="fa fa-address-book prefix grey-text" />
                    <input type="text" id="receive" name="receive"  className="form-control" onChange={(e) => {this.handleChange(e);}} />
                    <label htmlFor="receive">Your Coin Address</label>
                  </div>
                  <div className="md-form">
                    <i className="fa fa-shopping-bag prefix grey-text" />
                    <input type="text" id="amount" name="amount"  className="form-control" onChange={(e) => {this.handleChange(e);}} />
                    <label htmlFor="amount">Amount of Coin To Buy</label>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary waves-effect waves-light" disabled={(coin) ? '' : 'disabled'}>Create Ark Contract</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
    );
  }
}

ContractForm.propTypes = {
  coin: PropTypes.string,
};

export default ContractForm;
