import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaRegCopyright,
  FaTwitter,
} from "react-icons/fa6";
import dreamstrip_logo from "/dreamstrip-logo.png";

const Footer = () => {
  return (
    <footer className=" bg-base-200">
      <div className="my-container  pt-7">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-around border rounded-lg px-7 py-7 ">
          <div className="flex items-center gap-5">
            <p className="p-4 bg-white rounded-full">
              <FaPhone />
            </p>
            <div>
              <p className="font-bold">Call Us</p>
              <p>+880111111111</p>
            </div>
          </div>
          <div className=" border-b md:border-r "></div>
          <div className="flex items-center gap-5">
            <p className="p-4 bg-white rounded-full">
              <FaPhone />
            </p>
            <div>
              <p className="font-bold">Call Us</p>
              <p>+880111111111</p>
            </div>
          </div>
          <div className=" border-b md:border-r "></div>
          <div className="flex items-center gap-5">
            <p className="p-4 bg-white rounded-full">
              <FaPhone />
            </p>
            <div>
              <p className="font-bold">Call Us</p>
              <p>+880111111111</p>
            </div>
          </div>
        </div>
        <div className="footer gap-20 text-base-content py-10">
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
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <form>
            <h6 className="footer-title">Subscribe</h6>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="label-text">
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
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </div>
        <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
          <p className="flex items-center">
            <FaRegCopyright /> Dreams Trip .All right reserved.
          </p>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
