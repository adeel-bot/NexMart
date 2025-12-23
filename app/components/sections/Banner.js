import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative w-[90vw] h-[375px] overflow-hidden rounded-xl">
        <Image src="/banner_pic.jpg" alt="banner"  fill
        className="object-cover object-center"
        priority />
    </div>
  )
}

export default Banner