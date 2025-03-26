import React, { useRef, useState } from 'react'
import Initial from './Initial';
import { ValidateEmailPassword } from '../utils/constant';
import Footer from './Footer';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, provider } from '../utils/Firebase';
import show from "../assets/show.png";
import hide from "../assets/hide.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { addUser } from '../utils/slice/userSlice';
import google from "../assets/google.png";

const Login = () => {
  const [isLogin, setisLoginIn] = useState(true);
  const [isEmail, setisEmail] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const againPassword = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ToggleSignin = () => {
    setisLoginIn(!isLogin)
  }

  const validateData = () => {
    const message = ValidateEmailPassword({ email: email.current.value, password: password.current.value });
    if (message === "Email") {
      setisEmail(true);
      return;
    }
    if (message === "Password") {
      setisEmail(false);
      setisPassword(true);
      return;
    }
    if (!isLogin && againPassword.current.value !== null) {
      if (againPassword.current.value !== password.current.value) {
        setconfirmPassword(true);
        return;
      }
    }

    setconfirmPassword(false);
    setisEmail(false);
    setisPassword(false);

    if (!isLogin) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
            // navigate("/browse")
          }).catch((error) => {
            // An error occurred
            // ...
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // console.log(user);
        
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <>
      <Initial />
      <div className="absolute inset-0 flex items-center rounded-lg justify-center mx-3 -mt-[16vh] md:-mt-[1vh] ">
        <form onSubmit={(e) => e.preventDefault()} className=" min-h-[2rem] w-[25rem] md:min-w-[25rem] flex flex-col gap-4 opacity-[0.8] bg-black/80 p-12">
          <h1 className='font-bold mb-7 text-4xl'>{isLogin ? "Sign in" : "Sign up"}</h1>
          {!isLogin && (<input ref={name} type="text" placeholder="Enter your name" className="loginForm" />)}
          <input ref={email} type="type" placeholder="Enter you email" className="loginForm" />
          {isEmail && (
            <p className='text-red-500 '>Email is not Valid</p>
          )}
          <div className="relative">
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="loginForm w-full pr-10 tracking-[.1rem]"
            />
            <button
              type="button"
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? hide : show} alt="toggle visibility" className="h-5 w-5" />
            </button>
          </div>
          {isPassword && (
            <>
              <p className='text-red-500'>Password is greater than 8 characters</p>
              <p className='text-red-500'>must have Uppercase, lowercase</p>
              <p className='text-red-500'>must have numbers, special Charater</p>
            </>
          )}

          {!isLogin && (
            <>
              <div className="relative">
                <input
                  ref={againPassword}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="loginForm w-full pr-10 tracking-[.1rem]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={showPassword ? hide : show} alt="toggle visibility" className="h-5 w-5" />
                </button>
              </div>
              {confirmPassword && (
                <p className="text-red-500">Password doesn't match</p>
              )}
            </>
          )}
          {errorMessage && (
            <p className="text-red-500" >{errorMessage}</p>
          )}
          <button className="w-full bg-red-500 py-2 font-bold rounded-md hover:scale-[1.09]  cursor-pointer" onClick={validateData} >{isLogin ? "Sign in" : "Sign up"}</button>
          <span className='text-center' >Or</span>
          <button className='bg-red-800 flex items-center justify-center gap-3 p-2 font-bold rounded-lg  hover:scale-[1.09]  cursor-pointer' onClick={signInWithGoogle}>
            <img src={google} alt="google" width={25} height={25} />
            Sign in with google</button>
          <span className="flex flex-row gap-2" onClick={ToggleSignin} >{isLogin ? "New to Netflix" : "Already have an account ?"}<a className="block hover:underline font-bold" href="#" onClick={(e) => { e.preventDefault(); ToggleSignin(); }} >{isLogin ? "Sign up now" : "Sign in "}</a> </span>
        </form>
      </div >
      <Footer />
    </>
  )
}
export default Login;