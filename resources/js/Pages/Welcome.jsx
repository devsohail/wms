import { Head } from '@inertiajs/react'

export default function Welcome() {
  return (
    <>
      <Head title="Welcome" />
      <h1>Welcome</h1>
      <p>Hello welcome to your first  <span style={{color:'green'}}>react-Inertia</span> and <span style={{color:'red'}}>jetstream laravel</span> app!</p>

      <a href='https://www.linkedin.com/in/pkfan/'>created by pkfan [linkedin] </a>
    </>
  )
}
