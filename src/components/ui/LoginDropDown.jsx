"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
const LoginDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log("Order here", session.user.id)
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative font-sans w-max mx-auto lg:-mt-4">
      <button
        type="button"
        onClick={handleToggle}
        className="px-4 py-2 flex items-center rounded-full text-[#333] text-sm border border-gray-300 outline-none hover:bg-gray-100"
      >
        {session ? (
          session.user.image ? (
            <img
              src={session.user.image}
              className="w-7 h-7 mr-3 rounded-full shrink-0"
              alt="Profile"
            />
          ) : (
            <img
              src="/userprofile.png"
              className="w-7 h-7 mr-3 rounded-full shrink-0"
              alt="Default Profile"
            />
          )
        ) : (
          <span className="text-gray-500">No Profile Available</span>
        )}

        <h2 className="">{session.user.name}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 fill-gray-400 inline ml-3"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute block shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
          <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-4 h-4 mr-3"
              viewBox="0 0 512 512"
            >
              <path d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z" />
            </svg>
            <Link href="/ViewProfile">View profile</Link> 
          </li>
          {/* <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-4 h-4 mr-3"
              viewBox="0 0 512 512"
            >
              <path d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0" />
            </svg>
            Dashboard
          </li> */}
          <li
            className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-4 h-4 mr-3"
              viewBox="0 0 6.35 6.35"
            >
              <path d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.265.266v3.15a.265.266 0 0 0 .531 0v-3.15a.265.266 0 0 0-.26-.266zm-2.01 3.652c0 .147.118.266.265.266s.265-.119.265-.266a.265.265 0 0 0-.265-.265.265.265 0 0 0-.265.265zm2.472.397c0 .146.119.265.265.265s.265-.119.265-.265-.119-.266-.265-.266-.265.119-.265.266z" />
            </svg>
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default LoginDropDown;
