function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    User.findOne({ where: { username: req.body.username } }).then(user => {
        
    })
}