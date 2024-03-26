"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/form/Input";

export default function AddVendorPage() {

    const router = useRouter();

    async function handleAddVendor(formData: FormData) {
        const newVendorData = {
            vendorName: formData.get("vendorName") as string,
            vendorDescription: formData.get("vendorDescription") as string,
            vendorAddress: formData.get("vendorAddress") as string,
            vendorPhone: formData.get("vendorPhone") as string,
            vendorEmail: formData.get("vendorEmail") as string,
            vendorContactName: formData.get("vendorContactName") as string,
            vendorKeywords: formData.get("vendorKeywords") as string
        };

        try {
            await axios.post("/api/v1/vendors/add", newVendorData);
            
            toast.success("Vendor added");

            router.push("/vendors"); 
            router.refresh();
        } catch (error) {
            toast.error("Failed to add vendor");
        }
    }

    return (
        <section className="add-resource-page">
            <form className="form" id="add-vendor-form" action={handleAddVendor}>
                <fieldset>
                    <legend>Add Vendor</legend>
                    <Input 
                        id="vendorName"
                        label="Vendor Name"
                        placeholder="Enter vendor name"
                    />
                    <Input
                        id="vendorDescription"
                        label="Vendor Description"
                        placeholder="Enter vendor description"
                        type="multiline"
                    />
                    <Input
                        id="vendorAddress"
                        label="Vendor Address"
                        placeholder="Enter vendor address"
                    />
                    <Input
                        id="vendorPhone"
                        label="Vendor Phone"
                        placeholder="Enter vendor phone"
                    />
                    <Input
                        id="vendorEmail"
                        label="Vendor Email"
                        placeholder="Enter vendor email"
                    />
                    <Input
                        id="vendorContactName"
                        label="Vendor Contact Name"
                        placeholder="Enter vendor contact name"
                    />
                    <Input
                        id="vendorKeywords"
                        label="Vendor Keywords"
                        placeholder="Enter vendor keywords"
                    />
                </fieldset>
                <Button
                    color="primary"
                    content="Add Vendor"
                />
            </form>
        </section>
    )
}