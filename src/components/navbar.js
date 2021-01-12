import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {userContext} from '../App'
import M from 'materialize-css'
const Navbar = ()=>{

    const searchmodal = useRef(null)
    const [search,setSearch] = useState('')
    const {state,dispatch} = useContext(userContext)
    const [userDetails,setUserDetails] = useState([])
    const history = useHistory()
    useEffect(()=>{
        M.Modal.init(searchmodal.current)
    },[])
    const renderlist = ()=>{
      if(state){
           
          return [
            <li key="1"><i data-target="modal1" className="medium material-icons modal-trigger"style={{color:"black"}}>search</i></li>,
            <li key="2"><Link to="/profile">Profile</Link></li>,
            <li key="3"><Link to="/post">Post</Link></li>,
            <li key="4"><Link to="/myfollowingposts">My Following Posts</Link></li>,
            <li key="5"><button className="btn waves-effect waves-light #01579b light-blue darken-4 " 
            onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
            window.location.reload()
            }}
            > 
            Logout
          </button>

          </li>
          ]
      }else{
        return [
        <li key="6"><Link to="/signup">Signup</Link></li>,
        <li key="7"><Link to="/signin">Signin</Link></li>
        ]
      }
    }


    const fetchUsers = (query)=>{
      setSearch(query)
      fetch('http://localhost:5000/searchusers',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          query
        })
      }).then(res=>res.json())
      .then(results=>{
        console.log(results)
        setUserDetails(results.user)
      })
   }




    return(
    <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Sociomeet</Link>
      <ul id="nav-mobile" className="right">
        {renderlist()}
      </ul>
    </div>
    <div id="modal1" className="modal" ref={searchmodal} >
    <div className="modal-content" style={{color:"black"}}>
    <input
      type="text"
      placeholder = "search friends and people"
      value={search}
      onChange={(e)=>fetchUsers(e.target.value)}
    />
    <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchmodal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
    </div>
    <div className="modal-footer">
    <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
    </div>
  </div>
  </nav>
    )
}

export default Navbar