import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleSignIn} = this.props;
    return (
      <div className="panel-landing  h-100 d-flex" id="section-1">
        <div className="jumbotron" style={{margin: "auto", textAlign: "center", padding: "5%"}}>
          <div>
            <p className="h1">Daily Bookmark</p>
          </div>
          <div>
            <br/>
            <p>Simple secure app for your daily bookmark needs</p>
          </div>
          <br/>
          <Button variant="secondary btn-lg" onClick={handleSignIn.bind(this)}>Login with Blockstack</Button>
        </div>
      </div>
    )
  }
}
