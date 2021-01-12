import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Reset =()=>{
    const history = useHistory()
        const [email,setEmail] = useState("")
        const PostData = () =>{
            /*Form validation using regex js*/
            if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            {
                return M.toast({html:"Please use a valid Email Address",classes:'#e53935 red darken-1 rounded'})
            }
            fetch("http://localhost:5000/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
            })
        }).then(res=>res.json())
        .then(data=>{
                if(data.error){
                    M.toast({html:data.error,classes:'#e53935 red darken-1 rounded'})
                }
                else{
                    M.toast({html:data.message,classes:'#43a047 green darken-1 rounded'})
                    history.push('/signin')
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Sociomeet</h2>
                <div className="input-field col">
                <i className="material-icons prefix">account_circle</i>
                <input
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    placeholder = "Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>
                  <button className="btn waves-effect waves-light #01579b light-blue darken-4 " 
                  onClick={()=>PostData()}
                  >Reset Password
                </button>
            </div>
        </div>
    )
}

export default Reset