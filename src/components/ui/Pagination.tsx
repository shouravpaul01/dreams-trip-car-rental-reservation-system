import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
  } from "react-icons/md";
  import { generateTotalPaginatePages } from "../../utils/generateTotalPaginatePages";
  import { useEffect } from "react";
  type TPaginationProps={
    currentPage:number,
    setCurrentPage:(prev:any)=>void,
    totalPages:number
  }
  const Pagination = ({ currentPage, setCurrentPage, totalPages }:TPaginationProps) => {
    useEffect(()=>{if (totalPages) {
      setCurrentPage(1)
    }},[totalPages])
    
    return (
      <div className="flex gap-3 ">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn btn-sm  btn-success rounded-full"
          disabled={currentPage === 1}
        >
          <MdKeyboardDoubleArrowLeft /> Prev
        </button>
        <ul className="flex flex-wrap gap-2">
          {generateTotalPaginatePages(totalPages)?.map((pageNo, index) => (
            <li
              key={index + 1}
              className={`btn btn-sm btn-outline btn-success btn-circle ${
                currentPage == pageNo && "btn-active"
              } `}
              onClick={() => {
                setCurrentPage(pageNo);
              }}
            >
              {pageNo}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="btn btn-sm  btn-success rounded-full"
          disabled={currentPage === totalPages}
        >
          Next <MdKeyboardDoubleArrowRight /> 
        </button>
      </div>
    );
  };
  
  export default Pagination;