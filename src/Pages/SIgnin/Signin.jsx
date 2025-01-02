import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Config/firebase.config";
import { v4 } from "uuid";
import imageCompression from 'browser-image-compression';
import useAxios from "../../Hooks/useAxios";


const Signin = () => {
  const [signUp, setSignUp] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const { googleSignin, signupEmailPassword, signinEmailPassword, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageUpload, setImageUpload]= useState(null);
  const axiosPublic = useAxios();


  // Signin Method
  const handleSignin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signinEmailPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sign in successfully",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/')
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  };


  // Signup Method
  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const batch = form.batch.value;
    const studentID = form.studentID.value;
    const password = form.password.value;
    const accountType = form.accountType.value;
    const department = form.department.value;
  
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    } else {
      setPasswordError("");
    }
  
    // Check if an image has been uploaded
    if (!imageUpload) {
      return Swal.fire({
        title: "Please upload your profile picture",
        showConfirmButton: false,
        timer: 1500
      });
    }
  
    try {
      // Compress the image before uploading
      const compressedImage = await imageCompression(imageUpload, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      });
  
      // Upload the compressed image
      const imageRef = ref(storage, `users/${compressedImage.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, compressedImage);
  
      // Get the download URL
      const imageURL = await getDownloadURL(snapshot.ref);
  
      const userCredential = await signupEmailPassword(email, password);
      // Update user profile
      updateUser(name, imageURL);

      const userData = {
        name: name,
        email: email,
        photoURL: imageURL,
        role: "User",
        batch: batch,
        studentID: studentID,
        accountType,
        department,
      }
      axiosPublic.post("/user", userData)
      .then(res =>{
        console.log(res.data)
      })
  
      const user = userCredential.user;
      console.log(user);
      form.reset();
      setPasswordError("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sign Up successfully",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
  
    } catch (error) {
      console.error('Error during signup:', error.message);
      Swal.fire({
        title: 'Error during signup',
        text: error.message,
        icon: 'error',
      });
    }
  };

  // Signin with google
  const handleGoogle = () => {
    googleSignin()
      .then((res) => {
        const userData = {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          role: "User",
          batch: "",
          studentID: "",
          accountType:"",
          department:"",
        }
        axiosPublic.post("/user", userData)
        .then(res =>{
          console.log(res);
        })
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign in successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-screen-xl m-auto min-h-[80vh]">
    <div className="mx-auto p-5 mt-40 md:w-3/4 w-full overflow-hidden rounded-lg bg-white dark:border-[#002a3f] dark:bg-zinc-900">
      <div
        className={`flex select-none gap-2 border-b p-2.5 *:flex-1 *:rounded-md *:border *:p-2 *:text-center *:uppercase *:shadow-inner *:outline-none dark:border-[#002a3f] *:dark:border-[#002a3f] ${
          signUp
            ? "last-of-type:*:bg-[#002a3f] last-of-type:*:text-white"
            : "first-of-type:*:bg-[#002a3f] first-of-type:*:text-white"
        }`}
      >
        <button onClick={() => setSignUp(false)}>signin</button>
        <button onClick={() => setSignUp(true)}>signup</button>
      </div>

      <div className="w-full flex-col items-center overflow-hidden p-4 sm:p-8">
        {/* sign up form  */}
        <form
          onSubmit={handleSignup}
          className={`${
            signUp ? "h-full duration-300" : "invisible h-0 opacity-0"
          } space-y-3 sm:space-y-5`}
        >
          <h1 className="mb-6 uppercase backdrop-blur-sm sm:text-2xl">
            Sign Up
          </h1>
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            />

            {/* Type of Account */}
            <select
              name="accountType"
              onChange={(e) => setAccountType(e.target.value)}
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>

            {/* Department */}
            <select
              name="department"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            >
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="BBA">BBA</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="English">English</option>
              <option value="MIS">MIS</option>
            </select>

            {/* Conditional rendering of Student ID and Batch fields */}
            {accountType === "Student" && (
              <>
                <input
                  type="number"
                  name="batch"
                  placeholder="Batch No"
                  className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                />
                <input
                  type="number"
                  name="studentID"
                  placeholder="Student ID"
                  className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                />
              </>
            )}

            <input
              type="file"
              onChange={(e) => setImageUpload(e.target.files[0])}
              className="file-input file-input-bordered w-full block rounded-md border outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
            />

            <div className="relative block w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                required
                onChange={(e) =>
                  setPasswordError(
                    e.target.value.length < 6
                      ? "Password must be at least 6 characters long"
                      : ""
                  )
                }
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-[#002a3f]" />
                ) : (
                  <FaEye className="text-[#002a3f]" />
                )}
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* button type will be submit for handling form submission*/}
          <div className="text-center">
            <button
              type="submit"
              className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 m-2 hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-normal"
              disabled={passwordError !== ""}
            >
              Submit
            </button>
          </div>
          <p className="text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setSignUp(!signUp)}
              className="font-semibold underline"
            >
              Signin
            </button>
          </p>
        </form>

        {/* signin form */}
        <form
          onSubmit={handleSignin}
          className={`${
            signUp ? "h-0 opacity-0" : "h-full duration-300"
          } space-y-3 sm:space-y-5`}
        >
          <h1 className="mb-3 uppercase sm:mb-5 sm:text-2xl">Sign In</h1>
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
              required
            />
            <div className="relative block w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
                required
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-[#002a3f]" />
                ) : (
                  <FaEye className="text-[#002a3f]" />
                )}
              </div>
            </div>
          </div>

          {/* button type will be submit for handling form submission*/}
          <div className="text-center">
            <button
              type="submit"
              className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 m-2 hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-normal"
            >
              Submit
            </button>
          </div>
          <p className="text-center">
          Don&apos;t have an account?{" "}
              <button
                onClick={() => setSignUp(!signUp)}
                type="button"
                className="font-semibold underline"
              >
                Signup
              </button>
            </p>
          </form>

          <div className="mt-3 space-y-3 sm:space-y-5">
            <hr className="border-[#002a3f]" />
            <button
              onClick={handleGoogle}
              className="mx-auto mb-4 mt-8 block rounded-md border px-5 py-2 shadow-lg duration-200 hover:bg-zinc-400/10 dark:border-[#002a3f] dark:hover:bg-[#002a3f] dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="mr-2 inline-block h-5 w-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

