import { users } from '@prisma/client'
import UserCard from '@/components/user/UserCard'
import { FC } from 'react'

const UserMasonry: FC<{userData: users[]}> = ({userData}) => {
  return (
    <section className="user-cards">
      {userData.map((user: users) => <UserCard {...user} key={user.id} /> )}
    </section>
  )
}

export default UserMasonry;