import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';

export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleSignIn} = this.props;
    return (
      <div className="panel-landing" id="section-1">
        <Card style={{width: "60%", margin:'5%'}} className="text-center">
          <Card.Img variant="top" src="bookmark_home.png"/>
          <Card.Body>
            <Card.Title>Daily Bookmark</Card.Title>
            <Card.Text>
              Simple app for your daily bookmark needs!
            </Card.Text>
            <Button variant="primary" onClick={handleSignIn.bind(this)}>Sign In with Blockstack</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
