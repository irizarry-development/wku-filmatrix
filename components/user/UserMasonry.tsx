import { User } from '@prisma/client'
import UserCard from '@/components/user/UserCard'
import { FC } from 'react'

const UserMasonry: FC<{userData: User[]}> = ({userData}) => {
  return (
    <section className="user-cards">
      {userData.map((user: User) => <UserCard {...user} key={user.id} /> )}
    </section>
  )
}

export default UserMasonry;