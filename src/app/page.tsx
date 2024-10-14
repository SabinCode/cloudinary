
import Link from "next/link";
import { uploadFile } from "./actions";
import { prisma } from "@/db";

export default async function Home() {
  const images = await prisma.image.findMany(
  );
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <h1>Cloudinary day29</h1>

      <Link href="/products?category=carpet&page=1">Carpet Products</Link>
      <form action={uploadFile}>
        <input type="file"
        name="profile_picture" multiple
       />
        <button type="submit">Submit</button>
      </form>

      <div>
        {images?.map((image) => (
          <div key={image.id}>
            <img
              src={image.url}
              alt={image.name}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


//server action bata gardai
//app ma action.ts file banayera uploadFile function import gareko
//client component banayeera api banayyera pani garna milcha