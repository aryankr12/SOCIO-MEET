import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
const CreatePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    
    useEffect(()=>{

            if(url){
                fetch("http://localhost:5000/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },  
            body:JSON.stringify({
                title:title,
                body:body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
                if(data.error){
                    M.toast({html:data.error,classes:'#e53935 red darken-1 rounded'})
                }
                else{
                    M.toast({html:"Post Created",classes:'#43a047 green darken-1 rounded'})
                    history.push('/')
                }
            }).catch(error=>{
                console.log(error)
            })
            }

    },[url])

    const postDetails = () =>{
        const data =new FormData()
        data.append("file",image)
        data.append("upload_preset","sociomeet")
        data.append("cloud_name","cloud-storage-813")

        fetch("https://api.cloudinary.com/v1_1/cloud-storage-813/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        }).catch(e=>{
            console.log(e)
        })

    }

    
    return(
        <div className="card input-field"
        style={{
        margin: "30px auto",
        maxWidth: "500px",
       // height: "auto",
        padding: "20px",
        textAlign: "center"
        }}
        >
            <input 
            type="text" 
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />

            <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input 
                    type="file" 
                    onChange={(e)=>setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>

            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1 "
            onClick={()=>postDetails()}

            >
            Post
                </button>
        </div>
    )

}

export default CreatePost