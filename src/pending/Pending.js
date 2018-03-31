import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from '../timer/Timer';
import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';

class Pending extends Component {
  render() {
    const { contracts = [] } = this.props;

    const contractRows = contracts.map(contract => {
      const created = contract['created on timestamp'];
      return (
        <tr key={contract['contract']}>
          <th scope="row">
            <a href={`/${contract.contract}`}>{contract['contract']}</a>
          </th>
          <td>{contract['contract status']}</td>
          <td><Timer created={created} /></td>
        </tr>
      );
    })

    return (
      (contracts !== undefined && contracts.length > 0) ?
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="dark-grey-text text-center"><strong>Contracts</strong></h3>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th>Contract ID</th>
                    <th>Status</th>
                    <th>Time Left</th>
                  </tr>
                </thead>
                <tbody>
                  { contractRows }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      : null
    );
  }
}

Pending.propTypes = {
  contracts: PropTypes.array,
};

export default Pending;
