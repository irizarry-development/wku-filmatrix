"use client"

import { Fragment } from "react"
import toast from "react-hot-toast"
import Form from "../form/Form"
import Input from "../form/Input"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"

interface ChangePasswordProps {
  userId: string,
}

export default function LinkComponent({
  userId,
}: ChangePasswordProps) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const newPasswordData = {
      currentp: formData.get('currentp'),
      newp: formData.get('newp'),
      repeatp: formData.get('repeatp'),
    };
    console.log(newPasswordData);
    try {
      await axios.patch(`/api/v1/user/${userId}/password`, newPasswordData);
      toast.success("Password changed");
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(`Failed password change - ${(error as AxiosError).response?.data}`);
      else
        toast.error('Unexpected error unlinking vendor');
    }
  }

  return (
    <Fragment>
      <Form action={handleSubmit} formId='change-password-form'>
        <Input id="currentp" label="Current Password" type="password" />
        <Input id="newp" label="New Password" type="password" />
        <Input id="repeatp" label="Repeat Password" type="password" />
        <input type="submit" />
      </Form>
    </Fragment>
  )
}
