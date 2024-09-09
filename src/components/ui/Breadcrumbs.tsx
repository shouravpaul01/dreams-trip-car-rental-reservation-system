const Breadcrumbs = ({title,links}:{title:string,links?:string[]}) => {
  return (
    <div className=" bg-slate-100  h-[260px] relative -mt-16">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dcrui4h7s/image/upload/v1725826388/dreams-trip-car-rental-reservation-system/ytn22rn1uisbbcvjzb1b.png')] bg-cover opacity-10"></div>

      {/* Overlay Image */}
      <div className="absolute top-[20%] md:top-[40%] left-[5%] md:left-[25%] ">
        <img
          src="https://res.cloudinary.com/dcrui4h7s/image/upload/v1725828754/dreams-trip-car-rental-reservation-system/c4z9sy2svhxdjfepybvr.png"
          alt="Logo"
          className="w-[150px] opacity-50"
        />
      </div>
      <div className="my-container h-full flex items-center justify-center  flex-col  gap-2  pt-16 md:pt-16 z-10">
        
          <p className="font-Spicy_Rice text-3xl">{title}</p>
          <div className="breadcrumbs  text-sm">
            <ul>
              <li>Long text 1</li>
              <li>Long text 2</li>
              <li>Long text 3</li>
              
            </ul>
          </div>
       
      </div>
    </div>
  );
};

export default Breadcrumbs;
