import React,{useState,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import {userContext} from '../../App'
import M from 'materialize-css'
const SignIn =()=>{
    const history = useHistory()
        const [password,setPassword] = useState("")
        const {token} = useParams()
        console.log(token)
        const PostData = () =>{
            /*Form validation using regex js*/
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password))
            {
                return M.toast({html:"Please use a password between 8-15 characters having atleast 1[0-9],1[A-Z],1[a-z]&1[@#$%^*&~]",classes:'#e53935 red darken-1 rounded'})
            }
            fetch("http://localhost:5000/newpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
                    console.log(data)
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
                <div className="input-field col ">
                <i className="material-icons prefix">vpn_key</i>
                <input
                    id="icon_prefix1"
                    type="password"
                    className="validate"
                    placeholder = "Enter New Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                
                />
                </div>
                  <button className="btn waves-effect waves-light #01579b light-blue darken-4 " 
                  onClick={()=>PostData()}
                  >Update password
                </button>
                </div>
        </div>
    )
}

export default SignIn