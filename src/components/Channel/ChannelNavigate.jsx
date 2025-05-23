import React from "react";
import { NavLink } from "react-router-dom";

function ChannelNavigate({ username, edit }) {
  if (edit) {
    return (
      <section className="text-white text-center w-full flex justify-evenly items-center border-b border-[#1e3a47] text-xs sm:text-base sm:mt-4 md:mt-0 mt-2">
        <NavLink
          to={`/edit/personalInfo`}
          className={({ isActive }) =>
            isActive
              ? "text-[#00ed64] font-medium border-b-2 border-[#00ed64]"
              : "text-gray-400 hover:text-white transition-colors"
          }
        >
          <p className="p-2">Personal Information</p>
        </NavLink>
        <NavLink
          to={`/edit/password`}
          className={({ isActive }) =>
            isActive
              ? "text-[#00ed64] font-medium border-b-2 border-[#00ed64]"
              : "text-gray-400 hover:text-white transition-colors"
          }
        >
          <p className="p-2">Change Password</p>
        </NavLink>
      </section>
    );
  }
  return (
    <section className="text-white w-full flex justify-evenly items-center border-b border-[#1e3a47] text-sm sm:text-base sm:mt-4 md:mt-0 mt-2">
      <NavLink
        to={`/channel/${username}/videos`}
        className={({ isActive }) =>
          isActive
            ? "text-[#00ed64] font-medium border-b-2 border-[#00ed64]"
            : "text-gray-400 hover:text-white transition-colors"
        }
      >
        <p className="p-2">Videos</p>
      </NavLink>
      <NavLink
        to={`/channel/${username}/playlists`}
        className={({ isActive }) =>
          isActive
            ? "text-[#00ed64] font-medium border-b-2 border-[#00ed64]"
            : "text-gray-400 hover:text-white transition-colors"
        }
      >
        <p className="p-2">Playlists</p>
      </NavLink>
      <NavLink
        to={`/channel/${username}/tweets`}
        className={({ isActive }) =>
          isActive
            ? "text-[#00ed64] font-medium border-b-2 border-[#00ed64]"
            : "text-gray-400 hover:text-white transition-colors"
        }
      >
        <p className="p-2">Tweets</p>
      </NavLink>
      <NavLink
        to={`/channel/${username}/subscribed`}
        className={({ isActive }) =>
          isActive
            ? "text-[#00ed64] font-medium border-b-2 border-[#00ed64]"
            : "text-gray-400 hover:text-white transition-colors"
        }
      >
        <p className="p-2">Subscribers</p>
      </NavLink>
    </section>
  );
}

export default ChannelNavigate;
