import React from 'react';
import moment from 'moment';

import firebaseDB from './firebasedb.js';
import blogPosts from './../blog.json';

export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            blogPostID: this.props.match.params.blog_post_title,
            blogPost: blogPosts[this.props.match.params.blog_post_title],
            hasLiked: localStorage.getItem(this.props.match.params.blog_post_title)
        };

        this.likeBlogPost = this.likeBlogPost.bind(this);
        this.unlikeBlogPost = this.unlikeBlogPost.bind(this);

        firebaseDB.listeners[this.state.blogPostID].on('value', (snapshot) => {
            this.setState({
                likes: snapshot.val()
            });
        });
    }

    componentDidMount() {
        firebaseDB.getLikes(this.props.match.params.blog_post_title)
            .then((likes) => {
                this.setState({
                    likes: likes
                });
            });
    }

    render() {
        let tagElements = this.state.blogPost.meta.tags.map((tag) => {
            return <div className="blog-post-tag" key={tag}>{tag}</div>
        }),
            hasLikedClass = this.state.hasLiked ? ' hasLiked' : '',
            likeButton = (
                <button className={'blog-post-like-button' + hasLikedClass}
                        onClick={
                                this.state.hasLiked ? this.unlikeBlogPost : this.likeBlogPost
                            }>
                    {this.state.likes} <span>&#x2764;</span>
                </button>
            );

        return (
            <div className="container">
                <div className="row">
                    <div className="blog-post-content col-lg-8 offset-lg-2 col-xs-12">
                        <h1 className="blog-post-title">{this.state.blogPost.meta.title}</h1>
                        <h4 className="blog-post-publish-date">
                            {moment(this.state.blogPost.meta.publishDate).format('MM.DD.YYYY')}</h4>
                        <div className="blog-post-tags">
                            {tagElements}
                        </div>
                        <div className="blog-post-like">
                            {likeButton}
                        </div>
                        <article className="content"
                                 dangerouslySetInnerHTML={{__html: this.state.blogPost.content}}>

                        </article>
                    </div>
                </div>
            </div>
        );
    }

    likeBlogPost() {
        firebaseDB.likeBlogPost(this.state.blogPostID);
        localStorage.setItem(this.state.blogPostID, true);
        this.setState({
            hasLiked: true
        });
    }

    unlikeBlogPost() {
        firebaseDB.unlikeBlogPost(this.state.blogPostID);
        localStorage.removeItem(this.state.blogPostID);
        this.setState({
            hasLiked: false
        });
    }
}