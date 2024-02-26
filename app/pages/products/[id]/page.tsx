export const revalidate = 3600

export default async function Page({
    params: { id },
}: {
    params: {id: string}
}) {
    return (
        <div>
            <h1>Product id: {id}</h1>
        </div>
    )
}