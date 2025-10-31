import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetEmailStatus } from "../../store/features/user/authSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import dp_bg from "../../assets/bg/abstract_bg.webp";

import { BiUser } from "react-icons/bi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { TbBellCog } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbPhone } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import { PiWarningBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";

const BaseProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const accountNavs = [
    {
      title: "edit profile",
      path: "/profile/update",
      icon: BiUser,
    },
    {
      title: "orders",
      path: "/profile/orders",
      icon: MdOutlineShoppingCartCheckout,
    },
    {
      title: "bag",
      path: "/profile/bag",
      icon: HiOutlineShoppingBag,
    },
    {
      title: "wishlist",
      path: "/profile/wishlist",
      icon: HiOutlineHeart,
    },
    {
      title: "notification settings",
      path: "/profile/notification",
      icon: TbBellCog,
    },
    {
      title: "addresses",
      path: "/profile/addresses",
      icon: HiOutlineLocationMarker,
    },
  ];

  const supportNavs = [
    {
      title: "contact us",
      path: "/contact",
      icon: TbPhone,
    },
  ];

  const actionsNavs = [
    {
      title: "sign out",
      func: () => logoutHandler,
      icon: TbLogout,
    },
    {
      title: "delete account",
      path: "/profile/delete",
      icon: PiWarningBold,
    },
  ];

  useEffect(() => {
    dispatch(resetEmailStatus());
  }, []);

  const logoutHandler = () => {
    dispatch(logoutUser());
    // window.location.href= "/account";
  };
  return (
    <section className="w-full" id="profile-page">
      <section className="flex items-center justify-between gap-4 h-[7.5rem] w-full" id="user-display-section">
        <div className={`${!user.profileImage && "user-dp-container"} shrink-0 aspect-square w-[30%] rounded-full overflow-hidden flex justify-center items-center relative`}>
          <img
            className="user-dp-bg absolute h-full w-full object-cover"
            src={user.profileImage || dp_bg}
            alt=""
          />
          <span className={`${user.profileImage && "hidden"} text-[2.5rem] mix-blend-difference text-[#efefef] font-semibold relative`}>
            {user.name[0]}
          </span>
        </div>
        <h1 className="user-name text-[2rem] font-light w-[70%] text-ellipsis overflow-hidden tracking-tight">
          {user.name}
        </h1>
      </section>

      <section className="mt-4" id="profile-nav-section">

        <section className="" id="account-nav-section">
          <h2 className="nav-heading text-[1.1rem] font-semibold">
            Account Settings
          </h2>
          <nav id="profile-nav-container">
            {accountNavs.map(({ title, icon: Icon, path }) => (
              <div key={`${title}-profile-nav`} className="profile-nav">
                <Link
                  to={path}
                  className="flex justify-between items-center py-2.5"
                >
                  <span className="nav-identity flex justify-center items-center gap-3">
                    <Icon />
                    <p className="capitalize">{title}</p>
                  </span>
                  <IoIosArrowForward />
                </Link>
              </div>
            ))}
          </nav>
        </section>

        <section className="mt-4" id="support-nav-section">
          <h2 className="nav-heading text-[1.1rem] font-semibold">
            Customer Support
          </h2>
          <nav id="profile-nav-container">
            {supportNavs.map(({ title, icon: Icon, path }) => (
              <div key={`${title}-profile-nav`} className="profile-nav">
                <Link
                  to={path}
                  className="flex justify-between items-center py-2.5"
                >
                  <span className="nav-identity flex justify-center items-center gap-3">
                    <Icon />
                    <p className="capitalize">{title}</p>
                  </span>
                  <IoIosArrowForward />
                </Link>
              </div>
            ))}
          </nav>
        </section>

        <section className="mt-4" id="actions-nav-section">
          <h2 className="nav-heading text-[1.1rem] font-semibold">
            Account Actions
          </h2>
          <nav id="profile-nav-container">
            {actionsNavs.map(({ title, icon: Icon, path, func }) => (
              <div key={`${title}-profile-nav`} className="profile-nav">
                {path ? (
                  <Link
                    to={path}
                    className="flex justify-between items-center py-2.5 text-red-700"
                  >
                    <span className="nav-identity flex justify-center items-center gap-3">
                      <Icon />
                      <p className="capitalize">{title}</p>
                    </span>
                    <IoIosArrowForward />
                  </Link>
                ) : (
                  <div
                    onClick={func()}
                    className="flex justify-between items-center py-2.5"
                  >
                    <span className="nav-identity flex justify-center items-center gap-3">
                      <Icon className="text-red-700" />
                      <p className="capitalize">{title}</p>
                    </span>
                    <IoIosArrowForward />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </section>

      </section>
    </section>
  );
};

export default BaseProfile;
