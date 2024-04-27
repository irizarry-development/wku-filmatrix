"use client"

import { useState, Fragment } from "react"
import toast from "react-hot-toast"
import Form from "../form/Form"
import TextInput from "../form/Input"
import Table from "../table/Table"
import { FaLink, FaPlus } from "react-icons/fa6"
import Link from "next/link"

interface LinkComponentProps<T> {
  searchHandler: (searchQuery: string) => Promise<T[]>
  formId: string
  searchPlaceholder: string
  tableTitle: string
  tableHeaders: string[]
}

export default function LinkComponent<T extends Object>({
  searchHandler,
  formId,
  searchPlaceholder,
  tableTitle,
  tableHeaders
}: LinkComponentProps<T>) {
  const [searchResults, setSearchResults] = useState<T[]>([])

  async function handleSubmit(formData: FormData) {
    try {
      const searchQuery = formData.get("searchQuery") as string

      const foundItems = await searchHandler(searchQuery)

      if (foundItems) {
        setSearchResults(foundItems)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  function _renderResults(results: T[]) {
    return results.map((result: T, i) => (
      <tr key={i}>
        {Object.keys(result).map((key, i) => {

          if (key === "id") {
            return null
          }

          //@ts-ignore
          return <td key={i}>{result[key]}</td>
        })}
        <td>
          <FaLink />
        </td>
      </tr>
    ))
  }

  return (
    <Fragment>
      <Form action={handleSubmit} formId={formId}>
        <TextInput label={searchPlaceholder} id="searchQuery" type="text" />
        <section className="add-link">
          Didnt find what you were looking for? 
          <Link href={`/${tableTitle.toLowerCase()}/add`}>
            Add {tableTitle}
          </Link>
          </section>
      </Form>
      <Table title={tableTitle} headers={tableHeaders}>
        {_renderResults(searchResults)}
      </Table>
    </Fragment>
  )
}
