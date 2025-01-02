import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Config/firebase.config";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [User, setUser] = useState(null);
  const [UserLoad, setUserLoad] = useState(true);

  // Signin With Google
  const googleSignin = () => {
    setUserLoad(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Signup With Email and Password
  const signupEmailPassword = (email, password) => {
    setUserLoad(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Signup With Email and Password
  const signinEmailPassword = (email, password) => {
    setUserLoad(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // get User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoad(false);
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

//   Update USer
const updateUser = (name, image) =>{
  setUserLoad(true);
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: image
      })
}


//   signout
const signout = () =>{
  setUserLoad(true);
    return signOut(auth);
}

  const authentications = {
    googleSignin,
    signupEmailPassword,
    signinEmailPassword,
    User,
    signout,
    updateUser,
    UserLoad
  };
  return (
    <AuthContext.Provider value={authentications}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
