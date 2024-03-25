import Button from "~/components/ui/Button";
import Select from "~/components/ui/form/Select";
import Radio from "~/components/ui/form/Radio";
import Input from "~/components/ui/form/Input";
import { Fragment } from "react";

export default async function Home() {
    return (
        <Fragment>
            <h1>Style Guide</h1>
            <p>This is a style guide for the application.</p>
            <h2>Buttons</h2>
            <p>Buttons are used to trigger actions.</p>
            <section className="preview-buttons">
                <h3>Primary</h3>
                <p>Primary buttons are used for primary actions.</p>
                <section className="preview-button">
                    <Button color="primary" content="Small" size="sm" />
                    <Button color="primary" content="Medium" size="md" />
                    <Button color="primary" content="Large" size="lg" />
                </section>
                <h3>Secondary</h3>
                <p>Secondary buttons are used for secondary actions.</p>
                <section className="preview-button">
                    <Button color="secondary" content="Small" size="sm" />
                    <Button color="secondary" content="Medium" size="md" />
                    <Button color="secondary" content="Large" size="lg" />
                </section>
                <h3>Outline</h3>
                <p>Outline buttons are used for tertiary actions.</p>
                <section className="preview-button">
                    <Button color="outline" content="Small" size="sm" />
                    <Button color="outline" content="Medium" size="md" />
                    <Button color="outline" content="Large" size="lg" />
                </section>
                <h3>Success</h3>
                <p>Success buttons are used for successful actions.</p>
                <section className="preview-button">
                    <Button color="success" content="Small" size="sm" />
                    <Button color="success" content="Medium" size="md" />
                    <Button color="success" content="Large" size="lg" />
                </section>
                <h3>Info</h3>
                <p>Info buttons are used for informational actions.</p>
                <section className="preview-button">
                    <Button color="info" content="Small" size="sm" />
                    <Button color="info" content="Medium" size="md" />
                    <Button color="info" content="Large" size="lg" />
                </section>
                <h3>Warning</h3>
                <p>Warning buttons are used for warning actions.</p>
                <section className="preview-button">
                    <Button color="warning" content="Small" size="sm" />
                    <Button color="warning" content="Medium" size="md" />
                    <Button color="warning" content="Large" size="lg" />
                </section>
                <h3>Danger</h3>
                <p>Danger buttons are used for dangerous actions.</p>
                <section className="preview-button">
                    <Button color="danger" content="Small" size="sm" />
                    <Button color="danger" content="Medium" size="md" />
                    <Button color="danger" content="Large" size="lg" />
                </section>
            </section>
            <form className="form">
                <fieldset>
                    <legend>Contact Information</legend>
                    <Input
                        label="First Name"
                        placeholder="First Name"
                        id="first-name"
                    />
                    <Input
                        label="Last Name"
                        placeholder="Last Name"
                        id="last-name"
                        helperText="Please enter your last name."
                    />
                    <Input
                        label="Multiline Text Field"
                        placeholder="Enter your comments here..."
                        type="multiline"
                        id="multiline"
                    />
                    <Radio
                        label="Radio Buttons"
                        options={["Option 1", "Option 2", "Option 3"]}
                        id="radios"
                    />
                    <Radio
                        label="Checkboxes"
                        options={["Option 1", "Option 2", "Option 3"]}
                        checkbox
                        id="checkboxes"
                    />{" "}
                    <Select
                        label="Dropdown"
                        options={["Option 1", "Option 2", "Option 3"]}
                    />
                    <Select
                        label="Multi-Select"
                        options={["Option 1", "Option 2", "Option 3"]}
                        multiple
                    />
                    {/* 

                      

                    

                    
                    <Input 
                        label="Time Field"
                        type="time"
                        id="time-field"
                    />
                    <Input 
                        label="Number Field"
                        type="number"
                        id="number-field"
                    />
                    <Input 
                        label="Color Field"
                        type="color"
                        id="color-field"
                    />
                    <Input 
                        label="Range Field"
                        type="range"
                        id="range-field"
                    />
                    <Input 
                        label="Search Field"
                        type="search"
                        id="search-field"
                    /> */}
                </fieldset>
            </form>
        </Fragment>
    );
}
