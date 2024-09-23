
const Loading = ({className}:{className?:string}) => {
    return (
      <div className={`flex justify-center ${className}`}>
        <span className="loading loading-ring loading-lg text-success  "></span>
        <span className="loading loading-ring loading-lg text-success "></span>
        <span className="loading loading-ring loading-lg text-success "></span>
      </div>
    )
  }
  
  export default Loading