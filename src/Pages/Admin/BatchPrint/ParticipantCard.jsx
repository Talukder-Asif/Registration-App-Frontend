/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { FaChildDress } from "react-icons/fa6";

const ParticipantCard = ({ participantsData }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const convertToBase64 = async (imageUrl) => {
    const response = await fetch(
      `https://brghc.inforsix.com/proxy-image?url=${encodeURIComponent(
        imageUrl
      )}`
    );
    const blob = await response.blob();
    const abc = new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
    setImageLoading(false);
    return abc;
  };
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const base64 = await convertToBase64(participantsData?.image);
        setImageSrc(base64);
      } catch (error) {
        console.error("Error converting image to base64:", error);
        setImageSrc(""); // Fallback to a default image or empty
      }
    };

    if (participantsData?.image) {
      fetchImage();
    }
  }, [participantsData?.image]);

  //   return (
  //     <div className="card bg-base-100 relative">
  //       <figure>
  //         <img
  //           src={imageSrc || "default-image-url"} // Fallback if imageSrc is empty
  //           alt={participantsData?.name_english}
  //           className="rounded-t w-full h-[150px] md:h-[200px] object-cover object-top"
  //         />
  //       </figure>
  //       <div className="md:p-3 p-2 space-y-1">
  //         <p className="font-semibold">ID: {participantsData?.participantId}</p>
  //         <p className="font-semibold">{participantsData?.name_english}</p>
  //         <p className="font-semibold">
  //           Religion:{" "}
  //           <span className="font-bold">{participantsData?.religion}</span>
  //         </p>

  //         <p>
  //           <FaPhoneAlt className="inline-block text-green-500" />{" "}
  //           {participantsData?.phone}
  //         </p>
  //         <div className="grid grid-cols-2">
  //           <p>
  //             <MdFamilyRestroom className="inline-block text-green-500" />{" "}
  //             {participantsData?.family_members}
  //           </p>

  //           <p>
  //             <FaChildDress className="inline-block text-green-500" />{" "}
  //             {participantsData?.children}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <tr>
      <td className="py-1 lg:py-[0.8rem]">
        <div className="flex items-center gap-2">
          <div className="avatar">
            {imageLoading ? (
              <div className="skeleton h-16 w-16"></div>
            ) : (
              <div className="mask mask-squircle w-16 h-16">
                <img src={imageSrc} alt="User Avatar" />
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-sm">
              {participantsData?.name_english} <br />
            </p>
            <span className="text-sm">{participantsData?.phone}</span>
          </div>
        </div>
      </td>

      <td className="py-1 lg:py-[0.8rem]">
        <p>
          <MdFamilyRestroom className="inline-block text-green-500" />{" "}
          {participantsData?.family_members}
        </p>
        <p>
          <FaChildDress className="inline-block text-green-500" />{" "}
          {participantsData?.children ? participantsData.children : 0}
        </p>
      </td>
      <td className="py-1 lg:py-[0.8rem]">{participantsData?.driver}</td>
      <td className="py-1 lg:py-[0.8rem]">{participantsData?.religion}</td>
      <td className="py-1 lg:py-[0.8rem]">{participantsData?.tshirt_size}</td>
    </tr>
  );
};

export default ParticipantCard;
