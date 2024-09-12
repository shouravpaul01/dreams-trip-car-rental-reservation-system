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
      <div className={`flex flex-col md:flex-row gap-5 md:gap-0 justify-around text-black border  border-slate-50 border-opacity-30  rounded-lg px-7 py-7 `}>
        {contactInfo?.map((info,index)=><ContactInfoCard key={index} info={info} index={index}/>)}
        </div>
        <div className="footer gap-10 md:gap-20 text-white py-10">
          <aside>
            <img
              src={dreamstrip_logo}
              alt="dreams trip logo"
              className="w-[300px]"
            />
            <p>
              Dreams Trip provides car rental reservation services, <br />
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
          <nav>
            <h6 className="footer-title">Quick Links</h6>
            <Link to={"/car-listings"} className="link link-hover">Car-Listings</Link>
            <Link to={"/about"} className="link link-hover">About us</Link>
            
            
           
          </nav>
          <form>
            <h6 className="footer-title">Subscribe</h6>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="label-text text-white">
                  Want to be notified about our services. Just sign up and we'll
                  send you a notification by email.
                </span>
              </label>
              <div className="join rounded-full">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered join-item"
                />
                <button className="btn btn-success join-item">Subscribe</button>
              </div>
            </fieldset>
          </form>
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
