import Input from "~/components/ui/form/Input";

export default function CreatePeoplePage() {
    return (
        <>
            <h1>Add User</h1>
            <form className="form">
                <fieldset>
                    <legend>User Information</legend>
                    <Input label="Name" id="name" />
                    <Input label="Outgoing Email" id="outgoingEmail" />
                </fieldset>
            </form>
        </>
    )
}