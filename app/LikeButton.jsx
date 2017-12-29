import React from 'react';
import mojs from 'mo-js';

import firebaseDB from './firebasedb.js';

export default class LikeButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: 0,
            hasLiked: localStorage.getItem(this.props.blogPostID)
        };

        this.burst = new mojs.Burst({
            left: 0, top: 0,
            radius:   { 4: 32 },
            angle:    45,
            count:    14,
            children: {
                radius:       2.5,
                fill:         '#F00',
                scale:        { 1: 0, easing: 'quad.in' },
                pathScale:    [ .8, null ],
                degreeShift:  [ 13, null ],
                duration:     [ 500, 700 ],
                easing:       'quint.out'
            }
        });

        this.likeBlogPost = this.likeBlogPost.bind(this);
        this.unlikeBlogPost = this.unlikeBlogPost.bind(this);

        firebaseDB.listeners[this.props.blogPostID].on('value', (snapshot) => {
            this.setState({
                likes: snapshot.val()
            });
        });
    }

    componentDidMount() {
        firebaseDB.getLikes(this.props.blogPostID)
            .then((likes) => {
                this.setState({
                    likes: likes
                });
            });
    }

    render() {
        let hasLikedClass = this.state.hasLiked ? ' hasLiked' : '';

        return (
            <button className={'blog-post-like-button' + hasLikedClass}
                    onClick={
                                this.state.hasLiked ? this.unlikeBlogPost : this.likeBlogPost
                            }>
                {this.state.likes} <svg width="20" height="20" viewBox="0 0 100 100" ref={(heart) => {this.heart = heart}}>
                <path d="M73.6170213,0 C64.4680851,0 56.5957447,5.53191489 51.7021277,13.8297872 C50.8510638,15.3191489 48.9361702,15.3191489 48.0851064,13.8297872 C43.4042553,5.53191489 35.3191489,0 26.1702128,0 C11.9148936,0 0,14.0425532 0,31.2765957 C0,48.0851064 14.893617,77.8723404 47.6595745,99.3617021 C49.1489362,100.212766 50.8510638,100.212766 52.1276596,99.3617021 C83.8297872,78.5106383 99.787234,48.2978723 99.787234,31.2765957 C100,14.0425532 88.0851064,0 73.6170213,0 L73.6170213,0 Z">

                </path>
            </svg>
            </button>
        );
    }

    likeBlogPost(e) {
        firebaseDB.likeBlogPost(this.props.blogPostID);
        localStorage.setItem(this.props.blogPostID, true);
        this.setState({
            hasLiked: true
        });
        this.animateBurst(e);
    }

    unlikeBlogPost() {
        firebaseDB.unlikeBlogPost(this.props.blogPostID);
        localStorage.removeItem(this.props.blogPostID);
        this.setState({
            hasLiked: false
        });
    }

    animateBurst() {
        let rect = this.heart.getBoundingClientRect();
        const coords = { x: rect.left + 10, y: rect.top + 5 };
        this.burst
            .tune(coords)
            .replay();
    }
}