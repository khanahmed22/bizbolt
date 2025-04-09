import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='mt-14 min-h-screen flex flex-col items-center justify-center'>
    
      <SignUp/>
    </div>
  )
}