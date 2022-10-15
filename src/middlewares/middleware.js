exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Vim pelo middleware'
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN')
        return res.render('404');
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}