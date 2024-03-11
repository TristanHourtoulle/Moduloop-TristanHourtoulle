import { ProductType } from "@models/Product"
import Image from "next/image"

const card = (product: ProductType) => {

    return (
        <div className="flex flex-col gap-2 items-center">
            <p className="font-2xl">{product.name}</p>
            <Image
                src={product.image ? product.image : '/icons/no-image.png'}
                alt={product.name ? product.name : ''}
                width={40}
                height={40}
            />
        </div>
    );
}

export default card;