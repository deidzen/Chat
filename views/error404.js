let Error404 = {
    render: async() => {
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="author" content="Alexey Lagun">
                <meta name="description" content="Yet another chat application">
                <title id="title" data-title="Page not found">Page not found</title>
            </head>
            <body>
                <div id="message-404">
                    <h1>404 ERROR</h1>
                    <h2>Page not found</h2>
                    <p>The link is broken or the page has been moved. Try <a href="/#">this page</a> instead.</p>
                </div>
            </body>
        </html>
        `
    },

    afterRender: async() => {

    }
};

export default Error404;