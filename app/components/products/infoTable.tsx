import { ProductType } from "@models/Product";


const InfoTable = (product) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="cell index-line index-color">Nom</th>
                        <th className="cell index-line index-color">Unité</th>
                        <th className="cell index-line index-color">Base</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="cell">{product.name}</td>
                        <td className="cell">{product.unit}</td>
                        <td className="cell">{product.base}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InfoTable;