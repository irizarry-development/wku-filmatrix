import Button from "~/components/ui/Button";
import Input from "~/components/ui/form/Input";

export default function AddLocationPage() {
    return (
        <form className="form">
            <fieldset>
                <legend>Add Location</legend>
                <Input 
                    id="locationName"
                    label="Location Name"
                    placeholder="Enter location name"
                />
                <Input
                    id="locationDescription"
                    label="Location Description"
                    placeholder="Enter location description"
                />
                <Input
                    id="locationAddress"
                    label="Location Address"
                    placeholder="Enter location address"
                />
                <Input
                    id="locationPhone"
                    label="Location Phone"
                    placeholder="Enter location phone"
                    type="tel"
                />
                <Input
                    id="locationEmail"
                    label="Location Email"
                    placeholder="Enter location email"
                    type="email"
                />
                <Input
                    id="locationContactName"
                    label="Location Contact Name"
                    placeholder="Enter location contact name"
                />
                <Input
                    id="locationKeywords"
                    label="Location Keywords"
                    placeholder="Enter location keywords"
                />
            </fieldset>
            <Button
                color="primary"
                content="Add Location"
            />
        </form>
    )
}