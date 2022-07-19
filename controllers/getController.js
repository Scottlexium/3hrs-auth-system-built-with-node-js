module.exports.home_get = function(req, res, next) {
    console.log("decoded token id => ",res.locals.userId);
    res.send('Welcome to the home screen you are authenticated');    
}