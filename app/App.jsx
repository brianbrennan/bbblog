import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BlogHome from './BlogHome.jsx';
import BlogPost from './BlogPost.jsx';

import './styles.scss';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="app-container">
                    <Switch>
                        <Route exact path="/" component={BlogHome} />
                        <Route path="/:blog_post_title" component={BlogPost}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));