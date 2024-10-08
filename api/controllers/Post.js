import Post from "../models/Post.js"

export const addPost=async(req,res,next)=>{
    const newPost=new Post(req.body)
    try{
      const savedPost=await newPost.save()
      res.status(201).json(savedPost)
i
    }catch(err){
        next(err)
    }
}

export const updatePost=async(req,res,next)=>{


    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}
  

export const deletePost=async(req,res,next)=>{
  try{
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json("post deleted ...")

  }catch(err){
    next(err)
  }
          
        
    }

        
       
   


export const getPost=async(req,res,next)=>{
 
            try{
                const post= await Post.findById(req.params.id)
                  res.status(200).json(post);
    
    
            }catch(err){
                next(err)
            }
          
        }
      
       
   


export const getPosts=async(req,res,next)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
         let posts;
         if(username){
             posts= await Post.find({username})

         }else if(catName){
            posts= await Post.find({categories:{
                $in:[catName]
            }})
         }
         else{
            posts=await Post.find()
         }
          res.status(200).json(posts);


    }catch(err){
        next(err)
    }
  
}