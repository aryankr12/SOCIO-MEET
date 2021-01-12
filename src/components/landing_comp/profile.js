import React,{useEffect,useState,useContext} from 'react'
import {userContext} from '../../App'

const Profile =()=>{

    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(userContext)
    const [image,setImage] = useState("")
    //console.log(state)
    useEffect(()=>{
        fetch('http://localhost:5000/mypost',{
            headers:{"Authorization": "Bearer "+localStorage.getItem("jwt")
        }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    useEffect(()=>{
        if(image){
        const data =new FormData()
        data.append("file",image)
        data.append("upload_preset","sociomeet")
        data.append("cloud_name","cloud-storage-813")

        fetch("https://api.cloudinary.com/v1_1/cloud-storage-813/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            /*setUrl(data.url)
            console.log(data)
            localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            dispatch({
                type:"UPDATEPIC",
                payload:data.url
            })*/
            fetch('http://localhost:5000/updatepic',{
                method:"put",
                headers:{
                    "Content-Type"  : "application/json",
                    "Authorization" : "Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })

            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({
                    type:"UPDATEPIC",
                    payload:result.pic
                })
            })
            //window.location.reload()//needed to reload this coz  
                                    // I am getting an error while 
                                    //update the profile image in material css 
                                    //something until then let it be coz after 
                                    //refreshing the page it works fine !!!!!!!!!
                                    //and we know one rule in programming ..........
                                    //if the code works never touch it I repeat Never!!!!!
        }).catch(e=>{
            console.log(e)
        })
    }
    },[image])

    const  updatepic = (file)=>{
        setImage(file)
    }



    return (
        
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style ={{
                
                margin: "20px 0px",
                borderBottom:"1px solid grey",
                background: "white"
            }}>

            
            <div style ={{
                display:"flex",
                justifyContent:"space-around"

            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                src={state?state.pic:"loading..."}
                    />
                    
                </div>
                <div>
                    <h4>{state?state.name:"loading..."}</h4>
                    <h5>{state?state.email:"loading..."}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>  
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:"loading"} followers</h6>
                        <h6>{state?state.following.length:"loading"} following</h6>
                    </div>
                </div>
            </div>
            
                <div className="file-field input-field" style={{margin:"44px 0px 10px -2px"}}>
                    <div className="btn waves-effect waves-light #01579b light-blue darken-4 " style={{margin:"-47px 0px 7px 64px"}}>
                    <span>change pic</span>
                    <input 
                    type="file" 
                    onChange={(e)=>updatepic(e.target.files[0])}
                    />
                </div>
                </div>
                </div>
        <div className="gallery">
        {
            mypics.map(item=>{
            return(
                <img key={item._id} className="item" src = {item.photo} alt= {item.title} />
            )
            })
        }
        </div>
        </div>
    )
}

export default Profile 