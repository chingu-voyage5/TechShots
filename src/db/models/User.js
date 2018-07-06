const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./../config');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        isAsync: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        isAsync: true,
        validate: {
            validator: (val) => validator.isEmail(val),
            message: 'Email is invalid'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }    
    ]
});

UserSchema.methods.generateLoginToken = function(){
    const user = this;
    const access = 'login';
    const token = jwt.sign({_id: user._id.toHexString(), access});
    user.tokens.push({access: token});
    
    return user.save().then(() => {
        return token;
    }).catch(console.error);
};

UserSchema.methods.removeToken = function(token){
    let user = this;
    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.statics.checkByToken = function(token){
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SEC);
    } catch (e){
        return Promise.reject();
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'token.access': 'login'
    })
};

UserSchema.statics.giveToken = function(receivedUser){
    const User = this;
    return User
    .findOne({login: receivedUser.login})
    .then((user) => {
        if (user){ 
            return new Promise((resolve, reject) => {
                bcrypt.compare(receivedUser.passsword, user.password, (err, res) => {
                    if (!res) reject();
                    resolve(user);
                })
            })
            .then((user) => {
                return user.generateLoginToken();    
            })
        } else {
            return Promise.reject();
        }
    });  
};

UserSchema.pre('save', function(next){
    const user = this;
    if (user.isModified('password')){
        bcrypt.genSalt((err, salt) => {
            bcrypt.hash(user.password, salt, (err, hashed) => {
                if (err) return console.error(err);
                user.password(hashed);
                next();
            })
        })
    } else next();
});

const User = mongoose.model('User', UserSchema); 

module.exports = {User};
