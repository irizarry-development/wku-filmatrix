"use client";

import { User } from "@prisma/client";
import PeopleMasonry from "~/components/people/PeopleMasonry";
import TextInput from "~/components/ui/form/Input";

interface PeopleTableProps {
    userData: User[]
}

export function PeopleTable({
    userData
}: PeopleTableProps) {
    return (
        <section className="people-table">
            <TextInput label="Search" id="search" type="text" />
            <PeopleMasonry userData={userData} />
        </section>
    );
}
