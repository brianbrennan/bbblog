import React from 'react';

import blogPosts from './../blog.json';

export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.blogPost = blogPosts[this.props.match.params.blog_post_title];
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <article className="content col-lg-8 col-lg-offset-2 col-xs-12"
                             dangerouslySetInnerHTML={{__html: this.blogPost.content}}>

                    </article>
                </div>
            </div>
        );
    }
}