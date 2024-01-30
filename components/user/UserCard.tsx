import { User } from "@prisma/client"
import Image from 'next/image'

export default function UserCard({
    name,
    image,
    email
  }: User) {
    return (
      <section
        className="user-card"
        key={name}
      >
        <Image
          src={image || "/images/placeholder.png"}
          alt={name || ""}
          width={48}
          height={48}
          className="user-card-image"
        />
        <section
          className="user-card-meta"
        >
          <p>{name}</p>
          <p>{email}</p>
        </section>
      </section>
    )
  }