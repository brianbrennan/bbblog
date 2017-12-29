import React from 'react';
import moment from 'moment';

import blogPosts from './../blog.json';
import LikeButton from './LikeButton.jsx';

export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            blogPostID: this.props.match.params.blog_post_title,
            blogPost: blogPosts[this.props.match.params.blog_post_title]
        };
    }

    render() {
        let tagElements = this.state.blogPost.meta.tags.map((tag) => {
            return <div className="blog-post-tag" key={tag}>{tag}</div>
        });

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
                            <LikeButton blogPostID={this.props.match.params.blog_post_title}/>
                        </div>
                        <article className="content"
                                 dangerouslySetInnerHTML={{__html: this.state.blogPost.content}}>

                        </article>
                    </div>
                </div>
            </div>
        );
    }
}