var ItsABlog = require('itsablog'),
    itsablog = new ItsABlog({
        dir: 'blog-posts'
    });

itsablog.outputToFile();