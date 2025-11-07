import GeneralInputs from "../../../components/adminPanel/product/add-product/GeneralInputs"
import ImageInput from "../../../components/adminPanel/product/add-product/ImageInput"
import AdminPageHeading from "../../../components/adminPanel/reusables/AdminPageHeading"

const AddProduct = () => {
    return (
        <div id="add-product-page">
            <div className="admin-page-heading w-full mb-4">
                <AdminPageHeading icon={"mage:shop-fill"} text={"add new product"} />
            </div>
            <div className="admin-page-main-body w-full">
                <form id="add-product-form">
                    <section className="image-upload-section bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-2 text-lg">upload product image</h2>
                        <div className="image-upload-container">
                            <ImageInput />
                        </div>
                    </section>
                    <section className="general-info-section w-full mt-5 bg-zinc-100 p-4 rounded-lg">
                        <h2 className="page-section-heading capitalize font-semibold mb-4 text-lg">general information</h2>
                        <GeneralInputs />
                    </section>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
