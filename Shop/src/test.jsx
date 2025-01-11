import React, { useReducer } from 'react'
const initial = {
  name: '',
  email: '',
  password: ''
}
const Register = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.value
      };
    case 'email':
      return {
        ...state,
        email:action.value
      };
    case 'password':
      return{
        ...state,
        password:action.value
      };
      default :
      return state
  };
}
export const Registration = () => {
  const [profile, dispatch] = useReducer(Register, initial)

 const submit=(e)=>{
  e.preventDefault()
  const user={
    name: profile.name,
  email: profile.email,
  password: profile.password
  }
  console.log(user.name)
  console.log(user.email)
  console.log(user.password)
}

  return (
    <div className="register">

      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your social account</p>
            <form onSubmit={submit}>
              <div className="form-group">
                <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value={profile.name} onChange={(e)=>dispatch({type:'name',value:e.target.value})} />
              </div>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={profile.email} onChange={(e)=>dispatch({type:'email',value:e.target.value})} />
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={profile.password} onChange={(e)=>dispatch({type:'password',value:e.target.value})} />
              </div>

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
