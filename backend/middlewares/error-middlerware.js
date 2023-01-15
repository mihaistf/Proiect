const errorHandler = (err, _req, res, next) => {
    let statusCode = 500;
    let message = err.message;

    console.log(`Error message: ${message}`);
    console.log(`Error stack: ${err.stack}`);
    console.log(`Error status code: ${statusCode}`);

    res.status(statusCode);

    res.json({
        message,
        severity: 'error'
    });

    next();
}
  
module.exports = errorHandler;