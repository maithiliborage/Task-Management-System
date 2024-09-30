// import React,{ useState } from 'react'
// import icon from '../img/icon.png'


// // import Button from "react-bootstrap/Button";
// // import Form from "react-bootstrap/Form";
// import { toast } from "react-toastify";
// import AxiosService from '../../components/utils/ApiService';
// import { useNavigate,  } from "react-router-dom";
// // import signincss from './signin.module.css'
// // import Spiner from '../../components/Spiner/Spiner';
// // import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons/fi

// function EmployeeSignup() {
//     const [name,setName] = useState("")
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//       };
  
//       const createEmployee = async(e)=>{
//         e.preventDefault()
//         setLoading(true)

//         try {
//             let res = await AxiosService.post('/user/signup',{
//                 name,
//                 email,
//                 password
//             })
//             if(res.status==201)
//             {
//                 toast.success("Employee Created Successfully")
//                 navigate('/')
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error("Fill all the detials")
//         }
//         finally{
//             setLoading(false)
//           }
//       }
   
//     return (
//       <>
//  {loading && (
//         <div className="loading-screen">
//           <div className="loading-spinner"></div>
//         </div>
//       )}
//       <section>
//       <div className='logfull'  >
//       <div className="login" style={{height:"700px",paddingTop:"35px"} }>
//       <div className="avatar" style={{width:"100px", height:"100px"}}>
//         <img src={icon} />
//       </div>
//         <h2  >Signup</h2>
//         <h3> Only for Employee </h3>

//         <form className="login-form">

//         <div className="textbox">
//             <input type="text" placeholder="Name" required onChange={(e)=>setName(e.target.value)}  />
//             <span className="material-symbols-outlined"> account_circle </span>
//           </div>

//           <div className="textbox">
//             <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
//             <span className="material-symbols-outlined"> email </span>
//           </div>

//           <div className="textbox">
//             <input
//               type={showPassword ? 'text' : 'password'} // Here is the change
//               placeholder="Password" onChange={(e)=>setPassword(e.target.value)}
//             />
//             <span  className="material-symbols-outlined">
//               {' '}
//               lock{' '}
//             </span>
//            </div>

//            <div  id='ch' style={{display:'flex',marginTop:"px"}}>
//             <input style={{width:"15px",margin:"-18px 6px 0px 0px"}}
//               type="checkbox"
//               checked={showPassword}
//               onChange={togglePasswordVisibility}
              
//             /> 
            
//             <span id='sp' style={{marginRight:"150px",color:'#157ae1' }}>
//               Show Password
//             </span>
//             &nbsp; &nbsp;
//             {/* <span id='sp' style={{ color: '#157ae1', cursor: 'pointer' }} onClick={()=>navigate('/forgetpassword')}>
//               Forgot Password ?{' '}
//             </span> */}

// </div>

//           <button type="submit"  onClick={(e)=>createEmployee(e)} >SIGNUP</button>

//           <p style={{ color: '#157ae1', fontSize: '18px' }}>
//             Already have an account ?&nbsp; &nbsp;{' '} <br/>
//             <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
//               {' '}
//              Login
//             </span>{' '}
//           </p>
//         </form>
//       </div>
//       </div>
//       </section>
//       </>
//     );
// }

// export default EmployeeSignup
