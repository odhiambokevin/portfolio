export default function Footer() {
  return (
    <div className="flex text-[15px] text-text-mild mt-2 mb-2 justify-center items-center h-[20px]">
    
      Copyright &copy; {(new Date().getFullYear())} kevin<span className="text-accent text-[18px]">.</span> &nbsp; All rights reserved.
    </div>
  )
}