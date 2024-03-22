module.exports = app => {
    try {
    
        app.get('/', (req, res) => {
            res.send("Welcome to " + process.env.PROJECT_NAME)
        });

        // Required company routes
        app.use("/" + process.env.API_VERSION_v1 + "/company", require('./company'));

        // Required person routes
        app.use("/" + process.env.API_VERSION_v1 + "/person", require('./person'));


    } catch (error) {
        console.log('error: ',error);
    }
}