
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { motion } from "framer-motion"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { storage } from "../../firebase.config";

import { categories } from "../constants";
import { useStateValue } from "../context/Sateprovider";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";

const titleImg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>;

const caloriesImg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
</svg>;

const priceImg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>;

const uploadImg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
</svg>;

const delImg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-7 font-extrabold text-rose-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>;



const loaderImg = <div role="status">
  <svg className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-rose-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
  </svg>
  <span className="sr-only">Loading...</span>
</div>;


export default function CreateContainer() {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("other");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ }, dispatch] = useStateValue();

  const navigate = useNavigate();


  const uploadImage = async (e) => {

    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg('Error while uploading : Try Again 🥺️');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageAsset(url);
          setIsLoading(false);
          setFields(true);
          setMsg('Image uploaded Successfully 🥳️')
          setAlertStatus('sucess');
          setTimeout(() => {
            setFields(false);
          }, 3000);
        })
      }
    )
  }

  const deleteImage = async () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Deleted Successfully 🥳️");
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 3000);
    })
  }

  const clearFormData = () => {
    setTitle("");
    setImageAsset("");
    setCalories("");
    setPrice("");
    setCategory("other");
  }

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {

      dispatch({
        type: actionType.SET_FOODITEMS,
        foodItems: data,
      })
    })
  }

  const saveDetails = async () => {

    setIsLoading(true);
    try {
      if (!title || !calories || !price || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty : Try Again 🥺️");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 3000);
      }
      else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        }

        saveItem(data);
        setFields(true);
        setMsg("Data Uploaded Successfullt 🥳️");
        clearFormData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 3000);
      }

      fetchData();

    }
    catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error While Uploading : Try Again 🥺️");
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 3000);
    }

  }


  return (
    <div className=" h-screen w-full">
      <div className="flex justify-center items-center w-full h-auto">
        <div className=' mt-5 w-full h-auto rounded-none sm:w-656 lg:w-[800px] sm:rounded-lg bg-black-gradient p-5'>
          <h1 className=" text-sm font-poppins text-lime-300 font-bold">Add New Item</h1>

          {fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}

              className={`w-full p-2 mt-3 mb-3 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
                }`}
            >
              {msg}
            </motion.p>
          )}


          <form className="text-md text-indigo-300 text-bold font-dynapuff space-y-6">

            <div className=" mt-3 flex items-center w-full justify-around">
              <label htmlFor="title">{titleImg}</label>
              <input type="text" id="title" required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" flex-1 ml-4 shadow-sm bg-gray-50 text-gray-900 
                  text-md rounded-lg ring-4 focus:ring-cyan-500 focus:border-cyan-500 p-2.5 "
                placeholder="Give me Title"
              ></input>
            </div>

            <div className=" flex items-center w-full justify-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className=" flex-1 text-center w-3/4 p-2.5 capitalize font-bold font-dynapuff outline-none rounded-md cursor-pointer border-b-2 border-indigo-400 text-headingColor">
                <option value="other">Select Category</option>
                {
                  categories.map((category) => (
                    <option key={category.id}
                      className=" text-headingColor capitalize"
                      value={category.urlParamName}>{category.name}</option>
                  ))
                }
              </select>
            </div>

            <div className=" group flex justify-center items-center flex-col  border-2 border-dotted border-indigo-400 w-full h-225 cursor-pointer">
              {isLoading ? (
                <>
                  {loaderImg}
                </>
              ) : (
                <>
                  {
                    !imageAsset ? (
                      <>
                        <label htmlFor="image" className=" w-full h-full flex flex-col justify-center items-center hover:scale-90 duration-500 ease-in-out cursor-pointer">
                          {uploadImg}
                          <p>Upload Image</p>
                          <input type="file" accept="image/*" id="image" name="uploadimage" className=" hidden" onChange={uploadImage} />
                        </label>
                      </>
                    ) : (
                      <>
                        <div className=" relative h-full">
                          <img
                            className=" w-full h-full object-cover"
                            src={imageAsset} alt="uploaded image" />
                          <button
                            onClick={deleteImage}
                            className="absolute bottom-3 -right-4 p-3 rounded-full bg-gray-800 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                            type="button">{delImg}</button>
                        </div>
                      </>
                    )
                  }
                </>
              )}

            </div>

            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div className="flex md:flex-1 items-center w-full md:w-auto justify-around">
                <label htmlFor="calories" >{caloriesImg}</label>
                <input type="text" id="calories" required
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className=" flex-1 ml-4 shadow-sm bg-gray-50 text-gray-900 
                  text-md rounded-lg ring-4 focus:ring-cyan-500 focus:border-cyan-500 p-2.5 "
                  placeholder="Calories"
                ></input>
              </div>

              <div className="flex md:flex-1 items-center w-full md:w-auto justify-around">
                <label htmlFor="price">{priceImg}</label>
                <input type="text" id="price" required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className=" flex-1 ml-4 shadow-sm bg-gray-50 text-gray-900 
                  text-md rounded-lg ring-4 focus:ring-cyan-500 focus:border-cyan-500 p-2.5 "
                  placeholder="Price"
                ></input>
              </div>

            </div>



            <button type="button" onClick={saveDetails} className="text-black  text-lg block w-44
            font-extrabold font-poppins bg-green-gradient hover:bg-rose-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

