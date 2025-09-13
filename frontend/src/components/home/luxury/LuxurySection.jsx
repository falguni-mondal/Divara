import React from 'react'
import SectionHeading from '../../utils/SectionHeading';
import brandCloth from "../../../assets/images/branding_cloth.webp";
import custom from "../../../assets/videos/customizations.mp4";
import brandBag from "../../../assets/images/divara_bag.webp";
import satin from "../../../assets/images/satin_closet.webp";
import LuxuryItem from './LuxuryItem';

const LuxurySection = () => {
    const luxuryItems = [
        {
            heading: "The Luxury of Experience",
            paragraph: "Luxury is more than what you wear—it’s the experience you live. Every detail, from our designs to our packaging, is created to immerse you in a world of exclusivity.",
            image: brandBag
        },
        {
            heading: "Crafted to Your Perfection",
            paragraph: "Luxury is personal, every design begins with you. From precise body measurements to the finest fabric selection, our creations are tailored to embrace individuality.",
            video: custom
        },
        {
            heading: "Elegance in Every Thread",
            paragraph: "Craftsmanship begins with precision and finishes with perfection. Every fabric, every stitch, and every detail is carefully curated to embody sophistication.",
            image: brandCloth
        },
        {
            heading: "Draped in Timeless Grace",
            paragraph: "A Divara creation is more than attire—it’s a masterpiece of elegance that transcends seasons. Our designs celebrate the harmony of form, fabric, and finesse.",
            image: satin
        }
        
    ]

  return (
    <section className="luxury-section w-full mt-[30vw] px-[3vw]">
        <SectionHeading text={"Luxury in every details"} />
        <ul className="luxury-showcase w-full overflow-x-scroll flex gap-[10vw] py-[8vw]">
            {
                luxuryItems.map(item => (
                    <LuxuryItem item={item} />
                ))
            }
        </ul>
    </section>
  )
}

export default LuxurySection