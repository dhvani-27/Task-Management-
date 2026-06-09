const User=
require("../models/User");

const bcrypt=
require("bcryptjs");

const jwt=
require("jsonwebtoken");

exports.signup=
async(req,res)=>{

const {
username,
email,
password
}
=
req.body;

const hashedPassword=
await bcrypt.hash(
password,
10
);

const otp=
Math.floor(
100000+
Math.random()*900000
);

const user=
await User.create({

username,
email,
password:
hashedPassword,
otp

});

res.json({

message:
"OTP Sent",

otp

});

};

exports.login=
async(req,res)=>{

const {
email,
password
}
=
req.body;

const user=
await User.findOne({
email
});

if(!user){

return res.status(404)
.json({
message:
"User Not Found"
});

}

const isMatch=
await bcrypt.compare(
password,
user.password
);

if(!isMatch){

return res.status(400)
.json({
message:
"Invalid Password"
});

}

const token=
jwt.sign(
{
id:user._id
},
process.env.JWT_SECRET,
{
expiresIn:"1d"
}
);

res.json({
token
});

};