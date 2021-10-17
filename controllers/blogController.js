const db = require('../config/db.config');

function createBlog(req , res) {
    db.any('INSERT INTO blogs (blog_id, author, title, content, created_at) VALUES ($1, $2, $3, $4, $5)', [req.body.blog_id, req.body.author, req.body.title, req.body.content, req.body.created_at])
    .then(function(data){
        data = req.body;
        return res.status(200).json({message: "Blog Created Successfully!", data});
    })
    .catch(function(error){
        return res.status(200).json({message: "Something Is Wrong"});
    })
}


function readAllBlog(req, res){
    db.any('SELECT * FROM blogs;')
    .then(function(data){
        return res.json({status: "success",
                          message: "All Blog Retrieved Successfully", 
                          data})
    })
    .catch(function(error){
        return res.json({message: "Some error occurred while retrieving Blogs", error})
    })
    
        // db.any('SELECT * FROM blogs;')
        // .then(function(data){
        //     console.log(data, 'data')
        //     return res.json({status: "success", message: "All Blog Retrieved Successfully", data});
        // })
        // .catch(function(error){
        //     return error
        // })
    
}

function readOneBlog(req, res){
    db.one('SELECT * FROM blogs WHERE blog_id = $1',[req.params.id])
    .then(function(data){
        return res.json({status: "success", message: "Retrieved Successfully", data:data})
    })
    .catch(function(error){
        return error
    })
}

function updateOne(req, res){
    console.log(req.params)
    db.none('UPDATE blogs SET author = $2, title = $3 WHERE blog_id = $2 ', [req.body.productName, req.body.priceTag, req.params.id])
    .then(function(data){
        console.log(data ,'data')
        return res.status(200).json({message: 'Blog updated successfully', data});
    })
    .catch(function(error){
        return error
    })
}


function deleteBlog(req, res){
    console.log(req.params)
    db.none('DELETE FROM blogs WHERE blog_id = $1', [req.params.id])
    .then(function(data){
        console.log(data, 'data');
        return res.status(200).json({message: 'items deleted'})
    })
}
module.exports = {createBlog , readAllBlog, readOneBlog, updateOne, deleteBlog};