import React, {Component} from 'react';
import {Button, Card, CardColumns} from 'react-bootstrap';
import {FaTrash} from 'react-icons/fa';

export default class ListBookmarks extends Component {
  constructor(props) {
    super(props);
  }

  truncate(s, max) {
    if (s.length > max) {
      s = s.slice(0, max) + "...";
    }
    return s;
  }

  render() {
    const {bookmarks, isLoading, tag, deleteBookmark} = this.props;
    return (
      <div className="col-md-12 bookmarks">
        <p className="h3" style={{textTransform: 'capitalize'}}>{tag} Bookmarks</p>
        <br/>
        {isLoading && <span>Fetching Bookmarks...</span>}
        <CardColumns>
          {bookmarks.filter(bookmark => bookmark.tags.includes(tag) || tag === "all").map((bookmark) => (

            <Card key={bookmark.id}>
              <Card.Body>
                <Card.Title style={{textTransform: 'capitalize'}}>{this.truncate(bookmark.title, 100)}</Card.Title>
                <Card.Text>
                  {this.truncate(bookmark.description, 200)}
                </Card.Text>
                <Card.Text>
                  Tag: {this.truncate(bookmark.tags, 100)}
                </Card.Text>
                <Button variant="primary" href={bookmark.url} target="_blank">View</Button>
                <div style={{float: 'right'}}>
                  <FaTrash onClick={e => deleteBookmark(e, bookmark.id)} style={{cursor: 'pointer'}}/>
                </div>
              </Card.Body>
            </Card>
            )
          )}
        </CardColumns>
        {!isLoading && !bookmarks.length && <span>Add a bookmark to get started</span>}
      </div>
    )
  }
}
