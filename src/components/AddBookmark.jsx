import React, {Component} from 'react';

export default class AddBookmark extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {updateBookmark, handleNewBookmarkSubmit, newBookmark, error} = this.props;
    return (
      <div className="new-bookmark">
        <div className="col-md-8">
          <p className="h3">Add New Bookmark</p>
          <br/>
          <input type="text" className="form-control"
                 value={newBookmark.title}
                 onChange={e => updateBookmark('title', e.target.value)}
                 placeholder="Title" required={true}
          />
          <br/>
          <input type="text" className="form-control"
                 value={newBookmark.description}
                 onChange={e => updateBookmark('description', e.target.value)}
                 placeholder="Description" required={true}
          />
          <br/>
          <input type="url" className="form-control"
                 value={newBookmark.url}
                 onChange={e => updateBookmark('url', e.target.value)}
                 placeholder="Url" required={true}
          />
          <br/>
          <input type="text" className="form-control"
                 value={newBookmark.tags}
                 onChange={e => updateBookmark('tags', e.target.value)}
                 placeholder="Tag" required={true}
          />
          <br/>
        </div>
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            onClick={e => handleNewBookmarkSubmit(e, this.props.history)}
          >
            Submit
          </button>
          <br/>
          <br/>
          {error && <div>Error: {error}</div>}
        </div>

      </div>
    )
  }
}
