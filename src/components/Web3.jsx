import React, { useState } from 'react';

const Web3 = (props) => {
    if (!props.account.connected) {
      return (
        <button className="button" onClick={props.connect}>
          Connect Wallet
        </button>
      )
    }
    else {
      return (
        <div className="account">
          <div>
            {"Connected Address: " + props.account.address}
          </div>
          <div>
            {"Account Balance: " + props.account.balance}
          </div>
          {props.account.isVerified
            ? "Verified!"
            : <button className="button" onClick={props.signMessage}>Verify Account</button>
          }
        </div>
      )
    }
  }

export default Web3;