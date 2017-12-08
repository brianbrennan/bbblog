import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BlogHome from './BlogHome.jsx';
import BlogPost from './BlogPost.jsx';

import './styles.scss';

class App extends React.Component {
    render() {
        return (
            <Router basename="/">
                <div className="app-container">
                    <Route exact path="/" component={BlogHome} />
                    <Route path="/:blog_post_title" component={BlogPost}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));