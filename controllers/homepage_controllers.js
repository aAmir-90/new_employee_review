const Company = require('../models/company');

// render homepage 
module.exports.renderHomePage = (req, res)=> {

    if (req.user) {
        res.redirect('/user/employee');
    }

    res.render('home', { title: 'ERS | home' });
}

// render signin page (form)
module.exports.renderSignInPage = (req, res)=> {

    if (req.user) {
        res.redirect('/user/employee');
    }

    res.render('signin', { title: 'ERS | signin' });
}

// render signup page (form)
// finds all registed companies and sends it to ejs

module.exports.renderSignUpPage = async (req, res)=> {
    const company = await Company.find({}).select('-employees');

    if (company.length > 0) {
        res.locals.company = company;
    }

    res.render('signup', { title: 'ERS | signup' });
}

// render create company page (form) 
module.exports.renderCreateCompanyPage = (req, res)=> {
    res.render('create_company', { title: 'ERS | create company' })
}

