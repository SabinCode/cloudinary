import { Pagination } from "@/components/ui/pagination";
import { prisma } from "@/db"
import { PaginationDemo } from "./pagination-demo";

const  Products = async ({searchParams}: {searchParams: {category: string ; page: string; }}) => {
    const PAGE_SIZE = 2
    
    // const ourProducts = await prisma.products.findMany({
    //     where: {
    //         category: "carpet",
    //     }
    // })  when we hardcode like this , we will get only carpet category but url shows products.
    //we want to show users they r on carpet url when they click on carpet category using searchparams

    //category: searchParams.category carpet anusar filtering gareko.
    // <Link href="/products?category=carpet">Carpet Products</Link> home page ma yo link le carpet products
    // matra dekhaune vayo url  pani http://localhost:3000/products?category=carpet aayo.
    //category thapna milcha <Link href="/products?category=carpet&category=price">Carpet Products</Link>

    const ourProducts = await prisma.products.findMany({
        where: {
            category: searchParams.category, 
           
        },
        take: PAGE_SIZE,
        skip: (Number(searchParams.page) - 1) * PAGE_SIZE,
        
        })
    return (
        <div>
            <h1>Products</h1>

            {ourProducts?.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                </div>
            ))}
            <PaginationDemo />

        </div>
    )
}    

export default Products