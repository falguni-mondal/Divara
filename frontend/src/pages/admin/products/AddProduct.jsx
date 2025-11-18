import { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import GeneralInputs from "../../../components/adminPanel/product/add-product/GeneralInputs";
import ImageInput from "../../../components/adminPanel/product/add-product/ImageInput";
import AdminPageHeading from "../../../components/adminPanel/reusables/AdminPageHeading";
import PricingInputs from "../../../components/adminPanel/product/add-product/PricingInputs";
import OtherInputs from "../../../components/adminPanel/product/add-product/OtherInputs";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { productAdder, resetAddProductState } from "../../../store/features/product/productSlice";
import MiniLoading from "../../../utils/loading/MiniLoading";
import { toast } from 'react-toastify';
import toastOptions from "../../../configs/toast-options";


const AddProduct = () => {
    const dispatch = useDispatch();
    const { status, message, error } = useSelector(state => state.product.add);

    const [generalInfo, setGeneralInfo] = useState({
        category: "",
        colour: null,
        material: "",
    })
    const [images, setImages] = useState([]);
    const [imgPreview, setImgPreview] = useState([null, null, null, null, null]);
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
        status: "published"
    })
    const [selectedSize, setSelectedSize] = useState("xs");
    const pricingSectionRef = useRef(null);

    const [errors, setErrors] = useState({
        images: [],
        general: [],
        size: [],
        sizes: {
            "xs": [],
            "s": [],
            "m": [],
            "l": [],
            "xl": []
        },
        other: []
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        let data = Object.fromEntries(formdata);
        data = { ...data, images: [...images], sizes: [...sizes], ...otherInfo, ...generalInfo }
        // console.log(data);

        const validationErrors = validateProduct(data);

        const hasAnyErrors = (
            validationErrors.images.length > 0 ||
            validationErrors.general.length > 0 ||
            validationErrors.size.length > 0 ||
            validationErrors.sizes.xs.length > 0 ||
            validationErrors.sizes.s.length > 0 ||
            validationErrors.sizes.m.length > 0 ||
            validationErrors.sizes.l.length > 0 ||
            validationErrors.sizes.xl.length > 0 ||
            validationErrors.other.length > 0
        );

        if (hasAnyErrors) {
            setErrors(validationErrors);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setErrors({
            images: [],
            general: [],
            size: [],
            sizes: {
                "xs": [],
                "s": [],
                "m": [],
                "l": [],
                "xl": []
            },
            other: []
        });

        const formData = convertToFormData(data);

        dispatch(productAdder(formData));
    }

    const resetForm = () => {
        setGeneralInfo({
            category: "",
            colour: null,
            material: "",
        });

        setImages([]);
        setImgPreview([null, null, null, null, null]);

        setSizes([
            { value: "xs", available: false, price: "", originalPrice: 0, discount: 0, stock: 0 },
            { value: "s", available: false, price: "", originalPrice: 0, discount: 0, stock: 0 },
            { value: "m", available: false, price: "", originalPrice: 0, discount: 0, stock: 0 },
            { value: "l", available: false, price: "", originalPrice: 0, discount: 0, stock: 0 },
            { value: "xl", available: false, price: "", originalPrice: 0, discount: 0, stock: 0 },
        ]);

        setOtherInfo({
            featured: false,
            newArrival: false,
            status: "published"
        });

        setSelectedSize("xs");

        // Clearing actual HTML form fields
        document.getElementById("add-product-form").reset();
    }


    useEffect(() => {
        if (error) {
            if (error.message === "Validation failed") {
                toast.error("Validation Failed!", toastOptions);
                setErrors(error.errors);
            }
            else if (error.response) {
                toast.error(`${error.response.data}`, toastOptions);
            } else {
                console.error("Error:", error);
                toast.error("Something went wrong!", toastOptions);
            }
            dispatch(resetAddProductState());
        }
    }, [error])

    useEffect(() => {
        if (message) {
            toast.success("Product added successfully!", toastOptions);
            resetForm();
            dispatch(resetAddProductState());
        }
    }, [message])


    const validateProduct = (data) => {
        const errors = {
            images: [],
            general: [],
            size: [],
            sizes: {
                "xs": [],
                "s": [],
                "m": [],
                "l": [],
                "xl": []
            },
            other: []
        };

        // Images
        if (!data.images || data.images.length === 0) {
            errors.images.push('Please upload at least one image!');
        } else if (data.images.length > 5) {
            errors.images.push('Maximum 5 images allowed!');
        } else {
            data.images.forEach((image, index) => {
                if (image.size > 5 * 1024 * 1024) {
                    errors.images.push(`Image ${index + 1} exceeds 5MB!`);
                }
                const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
                if (!allowedTypes.includes(image.type)) {
                    errors.images.push(`Image ${index + 1} must be JPEG, PNG, WebP, or AVIF!`);
                }
            });
        }

        // Product Name
        if (!data.name || data.name.trim() === '') {
            errors.general.push('Product name is required!');
        } else if (data.name.length < 10) {
            errors.general.push('Product name must be at least 10 characters!');
        } else if (data.name.length > 50) {
            errors.general.push('Product name must not exceed 50 characters!');
        }

        // Description
        if (!data.description || data.description.trim() === '') {
            errors.general.push('Product description is required!');
        } else if (data.description.length < 20) {
            errors.general.push('Description must be at least 20 characters!');
        } else if (data.description.length > 300) {
            errors.general.push('Description must not exceed 300 characters!');
        }

        // Category
        if (!data.category || data.category === '') {
            errors.general.push('Please select a Category!');
        }

        //Colour
        if (!data.colour) {
            errors.general.push('Please select a Colour!');
        } else if (!data.colour.name || !data.colour.shade) {
            errors.general.push('Invalid colour selection!');
        }


        // Sizes
        if (!data.sizes || data.sizes.length === 0) {
            errors.size.push('Please add at least one size!');
        } else {
            // Checking if at least one size is available
            const availableSizes = data.sizes.filter(size => size.available);

            if (availableSizes.length === 0) {
                errors.size.push('At least one size must be included with complete pricing!');
            }

            // Validate each available size
            data.sizes.forEach(size => {
                if (size.available) {
                    if (!size.originalPrice || size.originalPrice <= 0) {
                        errors.sizes[size.value].push(`Original price must be greater than 0!`);
                    }

                    if (size.discount === "" || size.discount < 0 || size.discount > 100) {
                        errors.sizes[size.value].push(`Discount must be between 0 and 100!`);
                    }

                    if (!size.stock || size.stock <= 0) {
                        errors.sizes[size.value].push(`Stock must be greater than 0!`);
                    }

                    const finalPrice = size.originalPrice - (size.originalPrice * size.discount / 100);
                    if (finalPrice <= 0) {
                        errors.sizes[size.value].push(`The Price must be More than 0 after applying the Discount!`);
                    }

                    if (!size.originalPrice || size.originalPrice <= 0 || size.discount === "" || size.discount < 0 || size.discount > 100 || !size.stock || size.stock <= 0 || finalPrice <= 0) {
                        errors.size.push(`Complete the pricing of Size: ${size.value.toUpperCase()}`);
                    }
                }
            });
        }

        // Shipping Cost
        if (data.shippingCost === undefined || data.shippingCost < 0 || data.shippingCost === "") {
            errors.other.push('Shipping cost must be 0 or greater!');
        }

        return errors;
    }

    const convertToFormData = (data) => {
        const formData = new FormData();

        formData.append('name', data.name || '');
        formData.append('description', data.description || '');
        formData.append('category', data.category || '');
        formData.append('material', data.material || '');
        formData.append('shippingCost', data.shippingCost || 0);
        formData.append('status', data.status || 'draft');
        formData.append('isFeatured', data.featured || false);
        formData.append('isNewArrival', data.newArrival || false);

        if (data.images && data.images.length > 0) {
            data.images.forEach((image, index) => {
                if (image instanceof File) {
                    formData.append('images', image);
                } else {
                    // If images are URLs/base64 strings
                    formData.append(`imageUrls[${index}]`, image);
                }
            });
        }

        if (data.colour) {
            formData.append('colour', JSON.stringify({
                name: data.colour.name,
                shade: data.colour.shade
            }));
        }

        if (data.sizes && data.sizes.length > 0) {
            formData.append('sizes', JSON.stringify(data.sizes));
        }

        return formData;
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
                            <ImageInput images={images} setImages={setImages} imgPreview={imgPreview} setImgPreview={setImgPreview} />
                        </div>
                        {
                            errors.images.length > 0 &&
                            <div className="product-images-inp-err-container w-full mt-4 bg-white rounded-lg p-3">
                                <ul className="w-full m-0 p-0 text-red-700 text-xs flex flex-col gap-2">
                                    {
                                        errors.images.map(err => (
                                            <li key={`image-err:${err}-key`} className="flex gap-1 items-start leading-none">
                                                <Icon icon="material-symbols:error-circle-rounded" />
                                                <p>{err}</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        }
                    </section>

                    <section className="general-info-section w-full mt-8 bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-4 text-lg leading-none">general information</h2>
                        <GeneralInputs selectedSize={selectedSize} setSelectedSize={setSelectedSize} generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} sizes={sizes} />
                        {
                            (errors.general.length > 0 || errors.size.length > 0) &&
                            <div className="product-general-inp-err-container w-full mt-4 bg-white rounded-lg p-3">
                                <ul className="w-full m-0 p-0 text-red-700 text-xs flex flex-col gap-2">
                                    {
                                        errors.general.map(err => (
                                            <li key={`general-err:${err}-key`} className="flex gap-1 items-start leading-none">
                                                <Icon icon="material-symbols:error-circle-rounded" />
                                                <p>{err}</p>
                                            </li>
                                        ))
                                    }
                                    {
                                        errors.size.map(err => (
                                            <li key={`size-err:${err}-key`} className="flex gap-1 items-start leading-none">
                                                <Icon icon="material-symbols:error-circle-rounded" />
                                                <p>{err}</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        }
                    </section>

                    <section ref={pricingSectionRef} className="pricing-info-section w-full mt-2 bg-zinc-100 p-4 rounded-lg">
                        <div className="product-add-section-header flex justify-between items-start mb-4">
                            <h2 className="page-section-heading capitalize font-semibold text-lg leading-none">pricing and stock</h2>
                            <p className="text-zinc-500 text-xs font-semibold">Size : <span className="uppercase">{selectedSize}</span></p>
                        </div>
                        <PricingInputs selectedSize={selectedSize} sizes={sizes} setSizes={setSizes} errors={errors.sizes} />
                    </section>

                    <section className="other-info-section w-full mt-8 bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-5 text-lg leading-none">other information</h2>
                        <OtherInputs otherInfo={otherInfo} setOtherInfo={setOtherInfo} />
                        {
                            errors.other.length > 0 &&
                            <div className="product-other-inp-err-container w-full mt-4 bg-white rounded-lg p-3">
                                <ul className="w-full m-0 p-0 text-red-700 text-xs flex flex-col gap-2">
                                    {
                                        errors.other.map(err => (
                                            <li key={`other-err:${err}-key`} className="flex gap-1 items-start leading-none">
                                                <Icon icon="material-symbols:error-circle-rounded" />
                                                <p>{err}</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        }
                    </section>

                    <div className="form-btn-container mt-10 font-semibold">
                        <button key="save-draft-btn" className="product-draft-btn w-full flex gap-1 justify-center items-center rounded-[3px] bg-[#dbd4ff] py-3 relative overflow-hidden" type="submit" disabled={status === "loading"} onClick={() => setOtherInfo(prev => ({ ...prev, status: "draft" }))}>
                            <Icon icon="hugeicons:license-draft" />
                            <span>Add Draft</span>
                            <div className={`loading-bg absolute top-0 left-0 h-full w-full flex justify-center items-center bg-[#000000dc] ${status !== "loading" && "hidden"}`}><MiniLoading /></div>
                        </button>
                        <button key="add-product-btn" className="product-draft-btn w-full flex gap-1 justify-center items-center rounded-[3px] bg-[#1a1a1a] text-[#f8f8f8] py-3 mt-2 relative overflow-hidden" type="submit" disabled={status === "loading"}>
                            <Icon icon="hugeicons:license" />
                            <span>Add Product</span>
                            <div className={`loading-bg absolute top-0 left-0 h-full w-full flex justify-center items-center bg-[#000000dc] ${status !== "loading" && "hidden"}`}><MiniLoading /></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
