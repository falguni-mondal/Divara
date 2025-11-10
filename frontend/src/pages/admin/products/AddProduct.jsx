import { useRef, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GeneralInputs from "../../../components/adminPanel/product/add-product/GeneralInputs";
import ImageInput from "../../../components/adminPanel/product/add-product/ImageInput";
import AdminPageHeading from "../../../components/adminPanel/reusables/AdminPageHeading";
import PricingInputs from "../../../components/adminPanel/product/add-product/PricingInputs";
import OtherInputs from "../../../components/adminPanel/product/add-product/OtherInputs";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const AddProduct = () => {
    const [generalInfo, setGeneralInfo] = useState({
        category: "",
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
        featured: false,
        newArrival: false,
        status: ""
    })
    const [selectedSize, setSelectedSize] = useState("xs");
    const pricingSectionRef = useRef(null);

    const [action, setAction] = useState("");

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
        let data = Object.fromEntries(formdata);
        data = {...data, images:[...images], sizes:{...sizes}, ...otherInfo, ...generalInfo}
        console.log(data);
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

                    <section className="general-info-section w-full mt-8 bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-4 text-lg leading-none">general information</h2>
                        <GeneralInputs selectedSize={selectedSize} setSelectedSize={setSelectedSize} generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} sizes={sizes} />
                    </section>
                    <section ref={pricingSectionRef} className="pricing-info-section w-full mt-2 bg-zinc-100 p-4 rounded-lg">
                        <div className="product-add-section-header flex justify-between items-start mb-4">
                            <h2 className="page-section-heading capitalize font-semibold text-lg leading-none">pricing and stock</h2>
                            <p className="text-zinc-600 text-xs font-semibold">Size : <span className="uppercase">{selectedSize}</span></p>
                        </div>
                        <PricingInputs selectedSize={selectedSize} sizes={sizes} setSizes={setSizes} />
                    </section>

                    <section className="other-info-section w-full mt-8 bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-5 text-lg leading-none">other information</h2>
                        <OtherInputs otherInfo={otherInfo} setOtherInfo={setOtherInfo}/>
                    </section>

                    <div className="form-btn-container mt-10 font-semibold">
                        <button className="product-draft-btn w-full flex gap-1 justify-center items-center rounded-[3px] bg-[#dbd4ff] py-3" type="submit" onClick={() => setAction("draft")}><Icon icon="hugeicons:license-draft" /> <span>Add Draft</span></button>
                        <button className="product-draft-btn w-full flex gap-1 justify-center items-center rounded-[3px] bg-[#1a1a1a] text-[#f8f8f8] py-3 mt-2" type="submit" onClick={() => setAction("pubished")}><Icon icon="hugeicons:license" /> <span>Add Product</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
