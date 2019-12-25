import React, {Component} from 'react';
import {Button, Image} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleSignIn} = this.props;
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/"><img src="/icon.png" width="40" height="40"/> Daily Bookmark</Navbar.Brand>
        </Navbar>
        <div className="container" style={{marginTop: "50px"}}>
          <div className="row">
            <div className="col-md-5">
              <p className="h3">Privacy focussed bookmark manager</p>
              <br/>
              <p>Bookmarks are stored by Daily Bookmark in an encrypted form.</p>
              <p>Bookmarks can be accessed only by you since it is stored in your own private gaia storage in an
                encrpyted form.</p>
              <p>Daily Bookmark is a simple secure app for your daily bookmark needs.</p>
              <br/>
              <Button variant="secondary btn-lg" onClick={handleSignIn.bind(this)}>Login</Button>
              <br/>
              <br/>
            </div>
            <div className="col-md-7">
              <Image src="/bookmark_home.png" responsive style={{width: "100%", height: 'auto'}}/>
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
