const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'Incorrect email';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'enterprise secret', {
    expiresIn: maxAge
  });
};


// controller actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
}

module.exports.login_get = (req, res) => {
  res.render("login");
}

module.exports.dm_get = (req, res) => {
  res.render("private");
}

module.exports.details_get = (req, res) => {
  const id = req.params.id;
  User.findById(id)
      .then(result => {
          res.render("details", { user: result });
      }) 
      .catch(err => {
          console.log(err)
      });
}

module.exports.private_get = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(result => {
        res.render("private", { user: result });
    }) 
    .catch(err => {
        console.log(err)
    });
}

module.exports.edit_get = function(req, res) {
  User.findById({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("edit", {user: user});
    }
  });
};

module.exports.edit_post = async (req, res) => {
  const {name, phone, messages, date, email, password} = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id, {name, phone, messages, date, email, password}, {timestamp: true, new:false, useFindAndModify:false});
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.text_get = (req, res) => {
  const id = req.params.id;
  User.findById(id)
      .then(result => {
        res.render("profiles", { user: result  });
        console.log(result)
      }) 
      .catch(err => {
          console.log(err)
      });
}

module.exports.text_post = async (req, res) => {
  const {messages} = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id,{ $push: {'messages': messages}}, {new:true, useFindAndModify:false});
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}


module.exports.signup_post = async (req, res) => {
  const {name, phone, messages, email, password } = req.body;

  try {
    const user = await User.create({name, phone, messages, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
      .then(result => {
        res.cookie('jwt', '', { maxAge: 1 });
      })
      .catch(err => {
          console.log(err)
      });
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('login');
}