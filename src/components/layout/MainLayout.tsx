import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const MainLayout = () => {
  const [isScroll, setIsScroll] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrollVisibility = () => {
    if (window.pageYOffset > 70) {
      setIsScroll(window.pageYOffset );
    } else {
      setIsScroll(0);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollVisibility);
    return () => {
      window.removeEventListener("scroll", scrollVisibility);
    };
  }, []);
  console.log(isScroll)
  return (
    <div className="relative">
      <Header isScroll={isScroll}/>
      
        <Outlet />
      <Footer/>
      {isScroll>400 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 btn btn-outline btn-success btn-circle  shadow-lgtransition duration-300 animate-bounce"
          aria-label="Scroll to Top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default MainLayout;
