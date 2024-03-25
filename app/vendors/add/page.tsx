import Button from "~/components/ui/Button";
import Input from "~/components/ui/form/Input";

export default function AddVendorPage() {
    return (
        <>
            <form className="form">
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
        </>
    )
}