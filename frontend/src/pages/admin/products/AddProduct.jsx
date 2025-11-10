import { useRef, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GeneralInputs from "../../../components/adminPanel/product/add-product/GeneralInputs";
import ImageInput from "../../../components/adminPanel/product/add-product/ImageInput";
import AdminPageHeading from "../../../components/adminPanel/reusables/AdminPageHeading";
import PricingInputs from "../../../components/adminPanel/product/add-product/PricingInputs";
import OtherInputs from "../../../components/adminPanel/product/add-product/OtherInputs";

gsap.registerPlugin(ScrollTrigger);

const AddProduct = () => {
    const [generalInfo, setGeneralInfo] = useState({
        name: "",
        description: "",
        category: "",
        material: "",
    })

    const [images, setImages] = useState([]);

    const [sizes, setSizes] = useState([
        {
            value: "xs",
            available: false,
            price: "",
            originalPrice: 0,
            discount: 0,
            stock: 0,
        },
        {
            value: "s",
            available: false,
            price: "",
            originalPrice: 0,
            discount: 0,
            stock: 0,
        },
        {
            value: "m",
            available: false,
            price: "",
            originalPrice: 0,
            discount: 0,
            stock: 0,
        },
        {
            value: "l",
            available: false,
            price: "",
            originalPrice: 0,
            discount: 0,
            stock: 0,
        },
        {
            value: "xl",
            available: false,
            price: "",
            originalPrice: 0,
            discount: 0,
            stock: 0,
        },
    ]);

    const [otherInfo, setOtherInfo] = useState({
        shippingCost: 0,
        featured: false,
        newArrival: false,
        status: "draft"
    })

    const [selectedSize, setSelectedSize] = useState("xs");
    const pricingSectionRef = useRef(null);

    useGSAP(() => {
        const element = pricingSectionRef.current;

        gsap.killTweensOf(element);
        gsap.set(element, { opacity: 1, y: 0 });

        const revealPricing = gsap.from(element, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out"
        });

        return () => {
            revealPricing.kill();
            gsap.set(element, { opacity: 1, y: 0 });
        };
    }, [selectedSize]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata);
        console.log(data);


        // console.log('Form Data:', formData)
        // console.log('Images:', formData.images)
        // submit logic here
    }

    return (
        <div id="add-product-page">
            <div className="admin-page-heading w-full mb-4">
                <AdminPageHeading icon={"mage:shop-fill"} text={"add new product"} />
            </div>
            <div className="admin-page-main-body w-full">
                <form id="add-product-form" onSubmit={handleSubmit}>
                    <section className="image-upload-section bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-4 text-lg leading-none">upload product image</h2>
                        <div className="image-upload-container">
                            <ImageInput images={images} setImages={setImages} />
                        </div>
                    </section>
                    <section className="general-info-section w-full mt-5 bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-4 text-lg leading-none">general information</h2>
                        <GeneralInputs selectedSize={selectedSize} setSelectedSize={setSelectedSize} setGeneralInfo={setGeneralInfo} sizes={sizes} />
                    </section>
                    <section ref={pricingSectionRef} className="pricing-info-section w-full mt-5 bg-zinc-100 p-4 rounded-lg">
                        <div className="product-add-section-header flex justify-between items-start mb-4">
                            <h2 className="page-section-heading capitalize font-semibold text-lg leading-none">pricing and stock</h2>
                            <p className="text-zinc-600 text-xs font-semibold">Size : <span className="uppercase">{selectedSize}</span></p>
                        </div>
                        <PricingInputs selectedSize={selectedSize} sizes={sizes} setSizes={setSizes} />
                    </section>
                    <section className="other-info-section w-full mt-5 bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-5 text-lg leading-none">other information</h2>
                        <OtherInputs otherInfo={otherInfo} setOtherInfo={setOtherInfo}/>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
