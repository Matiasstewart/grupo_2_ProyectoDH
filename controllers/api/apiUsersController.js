const db = require('../../database/models');

const apiUsersController = {
    list: (req, res) => {
        db.User
        .findAll({attributes:{exclude:['password','function_id','user_image','deleted']}})
        .then(users => {
            users.forEach(user=>{
                user.dataValues.detail = 'https://localhost:3090/api/users/' + user.id
            })
            return res.status(200).json({
                count: users.length,
                users:users,
                status: 200

            })
        })
        .catch(error => {console.log(error)});
    },
    user:(req,res)=>{
        db.User
        .findOne({
            where:{
                id:req.params.id,
                deleted:0
            },
            attributes:{
                exclude:['password','function_id','deleted']
            },
        })
        .then(user=>{
            return res.status(200).json({
                user: user,
                imageURL:'http://localhost:3090/api/users/'+user.id + '/' + user.user_image,
                status: 200

            })
        })
        .catch(error => {console.log(error)});
    },
    img:(req,res)=>{
        db.User.findOne({
            where:{
                user_image: req.params.imagen        
            }
        })
        .then(user=>{
            return user.user_image
        })
    }
}

module.exports = apiUsersController;