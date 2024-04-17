"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/form/Input";

export default function AddVendorPage() {
    const router = useRouter();

    async function handleAddVendor(formData: FormData) {
        const newVendorData = {
            vendorName: formData.get("vendorName"),
            vendorDescription: formData.get("vendorDescription"),
            vendorAddress: formData.get("vendorAddress"),
            vendorPhone: formData.get("vendorPhone"),
            vendorEmail: formData.get("vendorEmail"),
            vendorContactName: formData.get("vendorContactName"),
            vendorKeywords: formData.get("vendorKeywords"),
        };

        try {
            await axios.post("/api/v1/vendors/add", newVendorData);
            toast.success("Vendor added");
            router.push("/vendors/dashboard"); 
            router.refresh();
        } catch (error) {
            toast.error(`Failed to add vendor - ${(error as AxiosError).response?.data}`);
        }
    }

    return (
        <section className="add-resource-page">
            <form className="form add-resource-form" id="add-vendor-form" action={handleAddVendor}>
                <Link href="/vendors/dashboard" className="back-link">
                    <FaArrowLeftLong />
                </Link>
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