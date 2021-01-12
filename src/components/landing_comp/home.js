import React,{useEffect,useState,useContext} from 'react'
import {userContext} from  '../../App'
import M from 'materialize-css'
import {Link} from 'react-router-dom'
const Home =()=>{
    const [data,setData] =useState([])
    const {state,dispatch} = useContext(userContext)
    console.log(state)
    useEffect(()=>{
        fetch('http://localhost:5000/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])

    const likepost = (id)=>{
        fetch('http://localhost:5000/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const unlikepost = (id)=>{
        fetch('http://localhost:5000/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const newcomment = (text,postId) => {
        fetch('http://localhost:5000/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")           
            },
            body:JSON.stringify({
                postId:postId,
                text:text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })


    }

    const deletepost = (postId) =>{
        fetch('http://localhost:5000/deletepost/'+postId,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            M.toast({html:"post deleted",classes:'#212121 grey darken-4 rounded'})
            setData(newData)
        })
    }

    /*const deletecomment = (postId) =>{
        fetch('http://localhost:5000/deletecomment/'+postId,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            M.toast({html:"comment deleted",classes:'#212121 grey darken-4 rounded'})
            setData(newData)
        })
    }*/











    return (
       <div className="home">
       {    
           data.map(item=>{
               return(
                <div className="card home-card" key={item._id}>
                <h5 style={{padding:"6px"}}><Link to = {item.postedBy._id !== state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name} </Link> 
                {item.postedBy._id === state._id
                && <i className="material-icons" style={{float:"right"}}
                onClick={()=>deletepost(item._id)}>delete_sweep</i>
                }
                </h5>
                <div className="card-image">
                <img className ="responsive-img" src={item.photo}/>
                </div>

                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                {
                        item.likes.includes(state._id)?
                        <i className="material-icons"style={{color:"#007FFF"}}
                onClick={()=>{unlikepost(item._id)}}
                >thumb_down</i>
                :
                <i className="material-icons" style={{color:"#007FFF"}}
                onClick={()=>{likepost(item._id)}}
                >thumb_up</i>
                }
                
                <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>{
                        item.comments.map(record=>{
                            return(
                                <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{record.text}</h6>
                            )
                        })
                    }
                    <form onSubmit={(e)=>{
                        
                        e.preventDefault()
                        newcomment(e.target[0].value,item._id)
                        
                    }}>
                    <input type ="text" placeholder="add a comment"/>
                    </form>
                    
                </div>
                </div>
               )
           })
       }
        

       </div>
    )
}

export default Home