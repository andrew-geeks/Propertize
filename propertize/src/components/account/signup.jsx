import { useEffect,useState } from "react";
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

let image = require("../../images/logo.png");

function Signup(){
    const navigate = useNavigate();
    const [mailValue,setMailValue] = useState("");
    const formData = {name:"",email:"",password:"",cpassword:""};
    const [formValues,setFormValues] = useState(formData);

    const formSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/account/signup",formValues)
        .then(res =>{
            console.log(res.data)
            //retrieving id and saving in session
            axios.get("http://localhost:4000/account/getId?mail="+formValues.email).then(res=>{
                ReactSession.setStoreType("localStorage");
                ReactSession.set("id", res.data.id);
                console.log("id:"+ReactSession.get("id"))
                //ReactSession.remove("id")  --remove session using key
                
            })
            //navigating after successfull signup
            navigate("/dashboard")
            
        })
        .catch( error => {
            console.log('actionError', error )
            setMailValue("Mail Already in Use⚠️!")
          });
    }

    return (
        <section class="bg-white-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 auth-sec">
      <a href="/" class="logo-text flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-15 h-20 mr-2" src={image} alt="logo"/>
          PROPERTIZE    
      </a>
      <div class="login-temp w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account👤
              </h1>
              <p className="mail-warning">{mailValue}</p>
              <form class="space-y-4 md:space-y-6" method="post">
                    <div>
                      <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input type="text" name="name" id="name" value={formValues.name} onChange={(e) => setFormValues({...formValues, name: e.target.value})} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full name" required/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={formValues.email} onChange={(e)=> setFormValues({...formValues,email : e.target.value})} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" value={formValues.password} onChange={(e)=> setFormValues({...formValues,password : e.target.value})} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" name="confirm-password" id="confirm-password" value={formValues.cpassword} onChange={(e)=> setFormValues({...formValues,cpassword : e.target.value})} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <button type="submit"
                   onClick={formSubmit} 
                   class="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                   disabled={
                            formValues.password!==formValues.cpassword?true:false ||
                            formValues.name===""?true:false ||
                            formValues.email===""?true:false || 
                            formValues.password===""?true:false
                    }
                   >Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}

export default Signup;