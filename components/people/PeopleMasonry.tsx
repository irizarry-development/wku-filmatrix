import { User } from "@prisma/client";
import PeopleCard from "~/components/people/PeopleCard";
import { FC } from "react";

const PeopleMasonry: FC<{ userData: User[] }> = ({ userData }) => {
    return (
        <section className="people-cards">
            {userData.map((user: User) => (
                <PeopleCard {...user} key={user.id} />
            ))}
        </section>
    );
};

export default PeopleMasonry;
