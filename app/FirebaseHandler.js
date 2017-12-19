import * as firebase from 'firebase';

import blogPosts from './../blog.json';

export default class FirebaseHandler {
    constructor() {
        this.config = {
            apiKey: 'AIzaSyA2VoZif9Bbh1iHot6W2zqHkNe-7KoF7tM',
            authDomain: 'bbblog-6ab1a.firebaseapp.com',
            databaseURL: 'https://bbblog-6ab1a.firebaseio.com/'
        };

        firebase.initializeApp(this.config);
        this.db = firebase.database();
        this.setupListeners();
    }

    setupListeners() {
        this.listeners = {};
        Object.keys(blogPosts).forEach((blogPostID) => {
            this.listeners[blogPostID] = this.db.ref('likes/' + blogPostID);
        });
    }
    
    likeBlogPost(blogPostID) {
        this.db.ref('likes/' + blogPostID)
            .once('value')
            .then((snapshot) => {
                this.db.ref('likes/' + blogPostID).set(snapshot.val() + 1);
            });
    }

    unlikeBlogPost(blogPostID) {
        this.db.ref('likes/' + blogPostID)
            .once('value')
            .then((snapshot) => {
                this.db.ref('likes/' + blogPostID).set(snapshot.val() - 1);
            });
    }

    getLikes(blogPostID) {
        return this.db.ref('likes/' + blogPostID)
            .once('value')
            .then((snapshot) => {
                return snapshot.val(); 
            });
    }
}