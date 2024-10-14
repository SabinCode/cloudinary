"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function PaginationDemo() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                {["1", "2", "3"].map((a) => (
                    <PaginationItem>
                        <PaginationLink href={"/products" + "?" + createQueryString("page", a)}
                            isActive={searchParams.get("page") === a}>
                            {a}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* <PaginationLink href={"/products" + "?" + createQueryString("page", "1")} isActive={ searchParams.get("page") === "1" }>
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={"/products" + "?" + createQueryString("page", "2")} isActive={ searchParams.get("page") === "2" }>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={"/products" + "?" + createQueryString("page", "3")} isActive={ searchParams.get("page") === "3" }>
                        3
                    </PaginationLink> */}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

//url is the best place to have state
