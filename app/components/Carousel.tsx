"use client";

import { Image } from "@nextui-org/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-cards";
import { Autoplay, EffectCreative } from "swiper/modules";
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
    <section className="py-12 w-[80%] md:w-[45%] md:mr-[2.5%] mb-[50%] md:mb-0">
      <div className=" w-full">
        <Swiper
          className="rounded-lg w-full w-[90%]"
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          cardsEffect={{ slideShadows: false }}
          effect={"cards"}
          grabCursor={true}
          modules={[Autoplay, EffectCreative]}
        >
          {carouselProducts.map((image, index) => (
            <SwiperSlide key={index} className="">
              <div className="flex items-center justify-start md:justify-end">
                <Image
                  src={image.imageUrl}
                  alt={image.name}
                  className=""
                  width={500}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
