import React,{useRef, useState} from "react";
import default_img from "../assets/Images/default_image.svg";

function ImgGenerator() {
    const [image_url,setimg]=useState("/")
    const [loading,setLoading]=useState(false)
    let inputRef=useRef(null)

    const fetchData = async () => {
              if(inputRef.current.value===""){
              return 0;
        }
        setLoading(true)
        try {
          const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "Authorization":"Bearer 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"
              },
              body: JSON.stringify({ inputs:inputRef.current.value}),
            }
          );
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const blob = await response.blob();
          console.log(blob);
          setimg(URL.createObjectURL(blob))
          setLoading(false)
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
 
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10 mb-20 gap-y-5 ">
      <div className="pb-30 text-4xl font-medium">
        {" "}
        Ai image <span className="text-pink-600">generator</span>
      </div>
      <div className="flex flex-col">
        <div>
          <img className="max-w-md" src={image_url==='/'?default_img:image_url} alt="" srcset="" />
        </div>

<div>
    <div className={loading?`w-full transition-all duration-1000 h-5 mt-1 bg-pink-600 text-white`:`w-0`}>
        <div className={loading?`text-sm ml-9`:`hidden`}>
            
            Loading...
        </div>
    </div>
</div>


      </div>

      <div className="flex flex-row justify-around items-center rounded-3xl w-full  bg-slate-600 lg:w-2/3 h-[60px]">
        <input
        ref={inputRef}
          className="bg-transparent  mx-8 w-[600px] h-[50px] border-none outline-none text-lg"
          type="text"
          placeholder="Describe what u wanna see"
        />
        <div onClick={()=>{fetchData()}} className="text-white flex flex-row items-center justify-center cursor-pointer w-64 h-12 bg-pink-600 rounded-3xl  mx-8">
          Generate
        </div>
      </div>
    </div>
  );
}

export default ImgGenerator;
