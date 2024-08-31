import { ReactNode } from "react"


const Container = ({children}:{children:ReactNode}) => {
  return (
    <div className='w-full max-w-5xl mx-auto px-2 md:px-0'>
      {children}
    </div>
  )
}

export default Container
