import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {userContext} from '../../App'
import M from 'materialize-css'
const SignIn =()=>{
    const {state,dispatch} = useContext(userContext)
    const history = useHistory()
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const PostData = () =>{
            /*Form validation using regex js*/
            if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            {
                return M.toast({html:"Please use a valid Email Address",classes:'#e53935 red darken-1 rounded'})
            }
            else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password))
            {
                return M.toast({html:"Please use a password between 8-15 characters having atleast 1[0-9],1[A-Z],1[a-z]&1[@#$%^*&~]",classes:'#e53935 red darken-1 rounded'})
            }
            fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
                    console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:'#e53935 red darken-1 rounded'})
                }
                else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({html:"login success",classes:'#43a047 green darken-1 rounded'})
                    history.push('/')
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
                <div className="input-field col ">
                <i className="material-icons prefix">vpn_key</i>
                <input
                    id="icon_prefix1"
                    type="password"
                    className="validate"
                    placeholder = "Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                
                />
                </div>
                  <button className="btn waves-effect waves-light #01579b light-blue darken-4 " 
                  onClick={()=>PostData()}
                  >Login
                </button>
                <h5>
                    Dont have a account?
                    <Link to = "./signup">Sign up</Link>
                </h5>
                <h6>
                <Link to = "./reset">Forgot password?</Link></h6>
            </div>
        </div>
    )
}

export default SignIn