"use client"

import { useState, Fragment } from "react"
import toast from "react-hot-toast"
import Form from "../form/Form"
import TextInput from "../form/Input"
import Table from "../table/Table"
import { FaLink, FaPlus } from "react-icons/fa6"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"

interface LinkComponentProps<T> {
  searchHandler: (searchQuery: string) => Promise<T[]>
  projectId: string,
  formId: string
  searchPlaceholder: string
  singular: string
  plural: string
  tableHeaders: string[]
}

export default function LinkComponent<T extends Object>({
  searchHandler,
  projectId,
  formId,
  searchPlaceholder,
  singular,
  plural,
  tableHeaders
}: LinkComponentProps<T>) {
  const router = useRouter();

  const [searchResults, setSearchResults] = useState<T[]>([])

  async function handleSearch(formData: FormData) {
    try {
      const searchQuery = formData.get("searchQuery") as string
      const foundItems = await searchHandler(searchQuery)
      if (foundItems)
        setSearchResults(foundItems);
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  const handleLink = async (id: string) => {
    try {
      await axios.post(`/api/v1/projects/${projectId}/${plural.toLowerCase()}/${id}`)
      toast.success(`${singular} linked`);
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(`Failed to link ${singular.toLowerCase()} to project - ${(error as AxiosError).response?.data}`);
      else
        toast.error(`Unexpected error linking ${singular.toLowerCase()} to project`);
    }
  }

  function _renderResults(results: T[]) {
    return results.map((result: T, i) => (
      <tr key={i}>
        {
          Object.keys(result).map((key, i) => {
            if (key === "id")
              return null;
            //@ts-ignore
            return <td key={i}>{result[key]}</td>
          })
        }
        <td>
          <button
            //@ts-ignore
            onClick={() => handleLink(result["id"])}
          >
            <FaLink />
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <Fragment>
      <Form action={handleSearch} formId={formId}>
        <TextInput label={searchPlaceholder} id="searchQuery" type="text" />
        <section className="add-link">
          Didnt find what you were looking for? 
          <Link href={`/${plural.toLowerCase()}/add`}>
            Add {plural}
          </Link>
          </section>
      </Form>
      <Table title={plural} headers={tableHeaders}>
        {_renderResults(searchResults)}
      </Table>
    </Fragment>
  )
}
