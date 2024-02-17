import prisma from "~/lib/prisma";
import PeopleMasonry from "~/components/people/PeopleMasonry";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import TextInput from "~/components/ui/form/Input";

export default async function PeoplePage() {
    const session = await auth();
    const userData = await prisma.user.findMany();

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <>
            <h1>People Database</h1>
            <TextInput label="Search" id="search" type="text" />
            <PeopleMasonry userData={userData} />
        </>
    );
}
