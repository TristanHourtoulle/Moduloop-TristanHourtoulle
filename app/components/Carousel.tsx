"use client";

import { Image } from "@nextui-org/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const carouselProducts = [
  {
    id: 1,
    name: "",
    price: "",
    imageUrl: "/icons/Carrousels/1.svg",
    link: "",
  },
  {
    id: 2,
    name: "",
    price: "",
    imageUrl: "/icons/Carrousels/2.svg",
    link: "",
  },
  {
    id: 3,
    name: "",
    price: "",
    imageUrl: "/icons/Carrousels/3.svg",
    link: "",
  },
  {
    id: 4,
    name: "",
    price: "",
    imageUrl: "/icons/Carrousels/4.svg",
    link: "",
  },
];

export function Carousel() {
  return (
    <section className="py-12 w-[80%] md:w-[40%]">
      <div className=" w-full">
        <Swiper
          className="rounded-lg w-full w-[100%]"
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          cardsEffect={{ slideShadows: false }}
          effect={"cards"}
          grabCursor={true}
          modules={[Autoplay, EffectCards]}
        >
          {carouselProducts.map((image, index) => (
            <SwiperSlide key={index} className="">
              <div className="flex items-center justify-start md:justify-end">
                <Image
                  src={image.imageUrl}
                  alt={image.name}
                  className=""
                  width={450}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
