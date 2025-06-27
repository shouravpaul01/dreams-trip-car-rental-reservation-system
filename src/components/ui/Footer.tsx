import {
  FaFacebookF,
  FaInstagram,
  FaRegCopyright,
  FaTwitter,
} from "react-icons/fa6";
import dreamstrip_logo from "/dreamstrip-logo.png";
import { contactInfo } from "../../constant";
import ContactInfoCard from "../form/ContactInfoCard";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-black ">
      <div className="my-container  pt-7">
        <div
          className={`flex flex-col md:flex-row gap-5 md:gap-0 justify-around text-black border  border-slate-50 border-opacity-30  rounded-lg px-7 py-7 `}
        >
          {contactInfo?.map((info, index) => (
            <ContactInfoCard key={index} info={info} index={index} />
          ))}
        </div>
        <div className="footer sm:footer-horizontal gap-10  md:gap-20  text-white py-10">
          <aside >
            <img
              src={dreamstrip_logo}
              alt="dreams trip logo"
              className="w-[300px]"
            />
            <p >
              Dreams Trip provides car rental reservation services,
              offering a wide range of premium vehicles to suit your travel
              needs.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-all duration-300"
              >
                <FaFacebookF className="text-xl" />
              </a>

              {/* Twitter */}
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300"
              >
                <FaTwitter className="text-xl" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-all duration-300"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </aside>
          <nav >
            <h6 className="footer-title">Quick Links</h6>
            <Link to={"/car-listings"} className="link link-hover">
              Car-Listings
            </Link>
            <Link to={"/about"} className="link link-hover">
              About us
            </Link>
          </nav>
          <div>
            <form>
              <h6 className="footer-title">Subscribe</h6>
              <p className=" text-white pb-3">
                Want to be notified about our services. Just sign up and we'll
                send you a notification by email.
              </p>
              <div className="join">
                <div>
                  <label className="input  join-item">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input type="email" placeholder="mail@site.com" required />
                  </label>
                  <div className="validator-hint hidden">
                    Enter valid email address
                  </div>
                </div>
                <button className="btn btn-success join-item">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        <div className="footer text-white  border-t  border-slate-50 border-opacity-30  py-4">
          <p className="flex items-center">
            <FaRegCopyright /> Dreams Trip .All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
