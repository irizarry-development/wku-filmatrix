import Button from "~/components/ui/Button";
import Select from "~/components/ui/form/Select";
import Radio from "~/components/ui/form/Radio";
import Input from "~/components/ui/form/Input";
import Drawer from "~/components/ui/Drawer";
import { Fragment } from "react";

export default async function Home() {
    const studentHandbookLinks = [
        { url: "https://www.wkufilm.com/wp-content/uploads/2024/01/WKU-Film-Student-Handbook-2023.pdf", text: "WKU Film Student Handbook" },
    ];
    const productionLinks = [
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/Additional-Photography.zip", text:"Additional Photography"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/Agreements.zip", text: "Agreements"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/Daily-Production.zip", text: "Daily Paperwork"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/Financial.zip", text: "Financial"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/09/Locations.zip", text: "Locations"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/Permits.zip", text: "Permits"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/09/Pre-Production.zip", text: "Pre-Production"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/Safety.zip", text: "Safety"},
    ];
    const postproductionLinks = [
        { url: "https://forms.gle/f54U6t7Csfshjqgs5", text:"Post Hall Reservations"},
        // { url: "", text: "Soundsnap"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/VFX-APPROVAL-FORM.pdf", text: "VFX Approval Form"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2024/03/TITLE-CREDIT-PROTOCOL-2024.pdf", text: "End Credit Protocol"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2023/08/AE-Workflows.zip", text: "Assistant Editing Workflow"},
        { url: "https://www.wkufilm.com/end-credit-elements/", text: "End Credit Elements"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2022/11/TimeCode-Sync-in-Premiere-Pro.pdf", text: "Timecode Sync"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/09/Press-Kit-and-Festival-Strategy.zip", text: "Press Kit & Festival Strategy"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/Dailies-Screening-Notes.xlsx", text: "Dailies Screening Notes"},
        { url: "https://www.wkufilm.com/wp-content/uploads/2021/08/POSTER-USE.pdf", text: "Poster Use Form"},
    ];
    const studentDatabaseLinks = [
        { url: "https://www.wkufilm.com/location-database/", text: "Location Database"},
    ]
    const helpfulLinks = [
        { url: "http://wku.edu/film", text: "School of Media"},
        { url: "https://www.wku.edu/studyaway/programs/sa-winter/sundancewinter2020.php", text: "WKU Sundance Study Away"},
        { url: "http://southernkentuckyfilmcommission.com/", text: "Southern Kentucky Film Commision"},
        { url: "http://filmoffice.ky.gov/", text: "Kenctuky Film Office"},        
    ]
    const jobLinks = [
        { url: "http://www.mandy.com/index.php?country=US", text: "Mandy.com (Production Jobs)"},
        { url: "http://staffmeup.com/", text: "Staff Me Up (Production Jobs)"},
        { url: "http://www.anonymousproductionassistant.com/uta-joblist/", text: "UTA Job List (Industry Jobs, Development, Agencies, etc."},
    ]
    const internshipLinks = [
        { url: "", text: "Television Academy (Emmys) Internship Program"},
    ]


    return (
        <Fragment>
            <fieldset className="drawer-fieldset">
                <legend className="drawer-legend">Current Student Resources</legend>
                <Drawer title="WKU Film Student Handbook" links={studentHandbookLinks} />
                <Drawer title="Production" links={productionLinks} />
                <Drawer title="Post-Production" links={postproductionLinks} />
                <Drawer title="Student Database" links={studentDatabaseLinks} />
                <Drawer title="Helpful Links" links={helpfulLinks} />
                <Drawer title="Jobs" links={jobLinks} />
                <Drawer title="Internships" links={internshipLinks} />
            </fieldset>


            {/* <h1>Style Guide</h1>
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
                    /> 
                </fieldset>
            </form> */}
        </Fragment>
    );
}
