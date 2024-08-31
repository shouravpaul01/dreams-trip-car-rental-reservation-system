
const Loading = ({className}:{className?:string}) => {
    return (
      <div className={`flex justify-center ${className}`}>
        <span className="loading loading-ring text-primary  loading-lg"></span>
        <span className="loading loading-ring loading-lg text-primary "></span>
        <span className="loading loading-ring loading-lg text-primary "></span>
      </div>
    )
  }
  
  export default Loading