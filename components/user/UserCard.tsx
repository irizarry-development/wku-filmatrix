import { users } from "@prisma/client"
import Image from 'next/image'

export default function UserCard({
    name,
    image,
    email
  }: users) {
    return (
      <section
        className="user-card"
        key={name}
      >
        <Image
          src={image}
          alt={name}
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