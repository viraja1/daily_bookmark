import React, {Component} from 'react';

import {Route, BrowserRouter} from 'react-router-dom';
import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {FaHome, FaPlusCircle} from 'react-icons/fa';
import {Navbar} from 'react-bootstrap';
import {Person} from "blockstack";

import AddBookmark from './AddBookmark.jsx';
import ListBookmarks from './ListBookmarks.jsx';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
      newBookmark: {
        title: '',
        description: '',
        url: '',
        tags: []
      },
      bookmarks: [],
      tags: [],
      isLoading: false,
      expanded: false,
      error: ''
    };
  }

  updateBookmark(key, value) {
    const bookmark = this.state.newBookmark;
    if (key === "tags") {
      value = [value];
    }
    bookmark[key] = value;
    this.setState({
      newBookmark: bookmark
    })
  }

  deleteBookmark(event, id) {
    const {userSession} = this.props;
    const updatedBookmarks = this.state.bookmarks.filter(bookmark => {
      return bookmark.id !== id;
    });
    const options = {encrypt: true};
    userSession.putFile('bookmarks.json', JSON.stringify(updatedBookmarks), options)
      .then(() => {
        this.setState({
          bookmarks: updatedBookmarks
        })
      })

  }

  handleNewBookmarkSubmit(event, history) {
    let newBookmark = this.state.newBookmark;
    let url_regex = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;
    if (typeof newBookmark.title === "undefined" || newBookmark.title.trim() === "") {
      this.setState({error: "Valid title is required"});
      return;
    }
    if (typeof newBookmark.description === "undefined" || newBookmark.description.trim() === "") {
      this.setState({error: "Valid description is required"});
      return;
    }
    if (typeof newBookmark.url === "undefined" || newBookmark.url.trim() === "" || !newBookmark.url.match(url_regex)) {
      this.setState({error: "Valid url is required"});
      return;
    }
    if (typeof newBookmark.tags[0] === "undefined" || newBookmark.tags[0].trim() === "") {
      this.setState({error: "Valid tag is required"});
      return;
    }
    if (newBookmark.tags[0].trim().length > 100) {
      this.setState({error: "Tag length should not exceed more than 100 characters"});
      return;
    }
    this.setState({error: ''});
    this.saveNewBookmark(newBookmark);
    this.setState({
      newBookmark: {
        title: '',
        description: '',
        url: '',
        tags: []
      }
    });
    history.push('/home');
  }

  saveNewBookmark(newBookmark) {
    const {userSession} = this.props;
    let bookmarks = this.state.bookmarks;
    let tags = this.state.tags;

    newBookmark.id = Math.round(new Date().getTime() / 1000);
    newBookmark.created_at = Date.now();

    bookmarks.unshift(newBookmark);
    if (!tags.includes(newBookmark.tags[0])) {
      tags.push(newBookmark.tags[0]);
    }
    const options = {encrypt: true};
    userSession.putFile('bookmarks.json', JSON.stringify(bookmarks), options)
      .then(() => {
        this.setState({
          bookmarks: bookmarks,
          tags: tags
        })
      });
  }

  fetchData() {
    const {userSession} = this.props;
    this.setState({isLoading: true});
    const options = {decrypt: true};
    userSession.getFile('bookmarks.json', options)
      .then((file) => {
        let bookmarks = JSON.parse(file || '[]');
        let tags = bookmarks.map(b => b.tags[0]);
        tags = Array.from(new Set(tags));
        this.setState({
          person: new Person(userSession.loadUserData().profile),
          bookmarks: bookmarks,
          tags: tags
        })
      })
      .finally(() => {
        this.setState({isLoading: false})
      })
  }

  onToggle(expanded) {
    this.setState({expanded: expanded});
  }

  truncate(s, max) {
    if (s.length > max) {
      s = s.slice(0, max) + "...";
    }
    return s;
  }

  render() {
    const {handleSignOut, userSession} = this.props;
    const {person, expanded, bookmarks, tags, isLoading, error} = this.state;
    return (
      !userSession.isSignInPending() && person ?
        <BrowserRouter>
          <Route render={({location, history}) => (
            <React.Fragment>
              <div className="site-sub-wrapper">
                <SideNav className="side-nav"
                   onSelect={(selected) => {
                     const to = '/' + selected;
                     if (location.pathname !== to) {
                       history.push(to);
                     }
                   }}
                   onToggle={this.onToggle.bind(this)}
                >
                  <SideNav.Toggle/>
                  <SideNav.Nav selected={location.pathname.replace('/', '')} className="side-nav-sub">
                    <NavItem eventKey="home">
                      <NavIcon>
                        <FaHome/>
                      </NavIcon>
                      <NavText>
                        Home
                      </NavText>
                    </NavItem>
                    <NavItem eventKey="add_bookmark">
                      <NavIcon>
                        <FaPlusCircle/>
                      </NavIcon>
                      <NavText>
                        New Bookmark
                      </NavText>
                    </NavItem>
                    {tags.filter(tag => typeof tag !== "undefined" && tag.trim() !== "").map((tag) => (
                      <NavItem eventKey={tag} key={'nav_' + tag}>
                        <NavIcon>

                        </NavIcon>
                        <NavText>
                          {this.truncate(tag, 20)}
                        </NavText>
                      </NavItem>

                      )
                    )}
                  </SideNav.Nav>
                </SideNav>
                <Navbar bg="nav" variant="dark" style={{
                  marginLeft: expanded ? 240 : 64
                }}>
                  <Navbar.Brand style={{marginLeft: '20px'}}>Daily Bookmark</Navbar.Brand>
                  <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <div>
                          {/*<label className="mr-2 text-white">{person.name() ? person.name(): 'Guest'}</label>*/}
                          <button className="btn btn-dark btn-sm"
                                  onClick={e => handleSignOut(e)}>Sign Out
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Navbar>
                <main style={{
                  marginLeft: expanded ? 240 : 64,
                  padding: '10px 20px 0 20px'
                }}>
                  <Route path="/home" exact render={props => <ListBookmarks
                    bookmarks={bookmarks} isLoading={isLoading} tag="all"
                    deleteBookmark={this.deleteBookmark.bind(this)}/>}/>
                  <Route path="/" exact render={props => <ListBookmarks
                    bookmarks={bookmarks} isLoading={isLoading} tag="all"
                    deleteBookmark={this.deleteBookmark.bind(this)}/>}/>
                  <Route path="/add_bookmark" render={props => <AddBookmark
                    updateBookmark={this.updateBookmark.bind(this)}
                    handleNewBookmarkSubmit={this.handleNewBookmarkSubmit.bind(this)}
                    newBookmark={this.state.newBookmark} history={history} error={error}/>}/>

                  {tags.filter(tag => typeof tag !== "undefined" && tag.trim() !== "").map((tag) => (
                      <Route path={"/" + tag} render={props => <ListBookmarks
                        bookmarks={bookmarks} isLoading={isLoading} tag={tag}
                        deleteBookmark={this.deleteBookmark.bind(this)}/>} key={'route' + tag}/>

                    )
                  )}
                </main>
              </div>
            </React.Fragment>
          )}
          />
        </BrowserRouter>

        : null
    );
  }

  componentWillMount() {
    const {userSession} = this.props;
    this.setState({person: new Person(userSession.loadUserData().profile),});
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState, this.state);
  }

}
