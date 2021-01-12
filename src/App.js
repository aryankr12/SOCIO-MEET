import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Signin from './components/landing_comp/signin';
import Profile from './components/landing_comp/profile';
import Signup from './components/landing_comp/signup';
import Home from './components/landing_comp/home';
import SubUserPost from './components/landing_comp/subscribeduserposts';
import Newpassword from './components/landing_comp/newpassword'
//import Background from '../../client/backgorund.jpg';
import Reset from './components/landing_comp/reset'
import Post from './components/landing_comp/post';
import {initialstate,reducer} from './reducers/userReducer'
import Userprofile from './components/landing_comp/userprofile'
export const userContext = createContext()





const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(userContext)
  useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("user"))
      if(user){
        dispatch({type:"USER",payload:user})
       // history.push('/')
      }else{
        if(!history.location.pathname.startsWith('/reset'))
        history.push('/signin')
      }
  },[])
    return(
    <Switch>
    <Route exact path ='/'>
    <Home />
    </Route>

    <Route path ='/signin'>
    <Signin/>
    </Route>

    <Route path ='/signup'>
    <Signup/>
    </Route>

    <Route exact path ='/profile'>
    <Profile />
    </Route>

    <Route path ='/post'>
    <Post />
    </Route>

    <Route path ='/profile/:userid'>
    <Userprofile />
    </Route>

    <Route path ='/myfollowingposts'>
    <SubUserPost />
    </Route>

    <Route exact path ='/reset'>
    <Reset />
    </Route>
    
    <Route path ='/reset/:token'>
    <Newpassword />
    </Route>

    </Switch>
  )
}

function App() {
const [state,dispatch] = useReducer(reducer,initialstate)
  return (
    <userContext.Provider value={{state:state,dispatch:dispatch}}>
      <BrowserRouter>
        <Navbar/>

          <Routing/>

      </BrowserRouter>
      </userContext.Provider>
  );
}
export default App;