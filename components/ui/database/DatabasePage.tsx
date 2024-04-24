import Link from "next/link"
import { FaArrowLeftLong, FaArrowRightLong, FaArrowRotateLeft, FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6"
import Form from "../form/Form"
import TextInput from "../form/Input"
import queryString from "query-string"
import Table from "../table/Table"
import { ReactNode } from "react"

interface DatabasePageProps {
    databaseHeader: string
    databaseId: string
    databaseFormId: string
    searchValue: string
    parsedPage: number
    remaining: number
    databaseTableHeaders: string[]
    children: ReactNode
}

export default function DatabasePage({
    databaseHeader,
    databaseId,
    databaseFormId,
    searchValue,
    parsedPage,
    remaining,
    databaseTableHeaders,
    children
}: DatabasePageProps) {
    return (
        <section className="database-page">
            <section className="database-page-header">
                <h1>{databaseHeader}</h1>

                <Link href={`/${databaseId}/add`} className="database-page-add">
                    <FaCirclePlus />
                </Link>

                <Form
                    formId={databaseFormId}
                    additionalClasses="database-search-form"
                    action={`/${databaseId}/dashboard`}
                    method="GET"
                >
                    <TextInput
                        id="search"
                        type="search"
                        placeholder={`Search ${databaseHeader.toLowerCase()}...`}
                        initialValue={searchValue}
                    />
                    <section className="database-search-buttons">
                        <button type="submit">
                            <FaMagnifyingGlass />
                        </button>
                        <Link href={`/${databaseId}/dashboard`} className="clear-search">
                            <FaArrowRotateLeft />
                        </Link>
                        {
                            parsedPage > 1 ? (
                                <Link
                                    href={`/${databaseId}/dashboard?${queryString.stringify({ searchValue, pageNumber: parsedPage - 1 })}`}
                                    className="pagination-button"
                                >
                                    <FaArrowLeftLong />
                                </Link>
                            ) : (
                                <Link href="#" className="pagination-button disabled">
                                    <FaArrowLeftLong />
                                </Link>
                            )
                        }

                        {
                            remaining > 0 ? (
                                <Link
                                    href={`/${databaseId}/dashboard?${queryString.stringify({ searchValue, pageNumber: remaining > 0 ? parsedPage + 1 : 1 })}`}
                                    className="pagination-button"
                                >
                                    <FaArrowRightLong />
                                </Link>
                            ) : (
                                <Link href="#" className="pagination-button disabled">
                                    <FaArrowRightLong />
                                </Link>
                            )
                        }
                    </section>
                </Form>
            </section>
            <section className="database-content">
                <Table
                    title={databaseHeader}
                    headers={databaseTableHeaders}
                >
                    {children}
                </Table>
            </section>
        </section>
    )
}