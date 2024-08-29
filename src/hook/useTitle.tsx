import { useEffect } from "react"


const useTitle = (title:string) => {
  return (
    useEffect(()=>{
        document.title=title?`${title} | Dreams Trip`:"Dreams Trip"
    },[title])
  )
}

export default useTitle
