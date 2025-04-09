import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <h2 className='font-bold mb-2 text-lg'>Welcome Back!</h2>
      <SignIn/>
    </div>
  )
}