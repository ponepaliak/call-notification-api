exports.loginRules = {
    email: 'required|email',
    password: 'required|string'
}

exports.sendAuthDataRules = {
    email: 'required|email'
}

exports.generateTokenForChangingPasswordRules = {
    code: 'required|numeric',
    token: 'required|string'
}

exports.changePasswordRules = {
    newPassword: 'required|string',
    token: 'required|string'
}