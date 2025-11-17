"use client";

import Image from "next/image";
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
    imageUrl: "/Landing Page/ImpactExempleOne.svg",
    link: "",
  },
  {
    id: 2,
    name: "",
    price: "",
    imageUrl: "/Landing Page/ImpactExempleTwo.svg",
    link: "",
  },
  {
    id: 3,
    name: "",
    price: "",
    imageUrl: "/Landing Page/ImpactExempleThree.svg",
    link: "",
  },
];

export function Carousel() {
  return (
    <section className="w-[90%] md:w-[70%] mt-0">
      <div className="w-full">
        <Swiper
          className="rounded-lg w-full"
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          cardsEffect={{ slideShadows: false }}
          effect={"cards"}
          grabCursor={true}
          modules={[Autoplay, EffectCreative]}
          spaceBetween={0} // Enlève tout espacement entre les slides
        >
          {carouselProducts.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="flex items-center justify-center">
                <Image
                  src={image.imageUrl}
                  alt={image.name}
                  className=""
                  width={1300} // Augmente la taille ici
                  height={350} // Ajuste la hauteur également
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
