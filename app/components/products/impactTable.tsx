import { ProductType } from "@models/Product";
import React from "react";

interface ImpactTableProps {
  product: ProductType;
  type: string;
}

const ImpactTable: React.FC<ImpactTableProps> = ({ product, type }) => {
  const columns = [
    "Fabrication",
    "Transport et Installation",
    "Utilisation",
    "Fin de vie",
  ];

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th> {/* Empty cell for the corner of the table */}
          {columns.map((column, index) => (
            <th className="cell index-color index-line" key={index}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr key={product.id}>
          <th className="cell index-color index-col">
            Réchauffement Climatique
          </th>
          {type === "new" ? (
            <>
              <td className="cell">{(product.new as any).rc.manufacturing}</td>
              <td className="cell">{(product.new as any).rc.installation}</td>
              <td className="cell">{(product.new as any).rc.usage}</td>
              <td className="cell">{(product.new as any).rc.endOfLife}</td>
            </>
          ) : (
            <>
              <td className="cell">
                {(product.reuse as any).rc.manufacturing}
              </td>
              <td className="cell">{(product.reuse as any).rc.installation}</td>
              <td className="cell">{(product.reuse as any).rc.usage}</td>
              <td className="cell">{(product.reuse as any).rc.endOfLife}</td>
            </>
          )}
        </tr>

        <tr key={product.id}>
          <th className="cell index-color index-col">
            Epuisement des ressources fossiles
          </th>

          {type === "new" ? (
            <>
              <td className="cell">{(product.new as any).erf.manufacturing}</td>
              <td className="cell">{(product.new as any).erf.installation}</td>
              <td className="cell">{(product.new as any).erf.usage}</td>
              <td className="cell">{(product.new as any).erf.endOfLife}</td>
            </>
          ) : (
            <>
              <td className="cell">
                {(product.reuse as any).erf.manufacturing}
              </td>
              <td className="cell">
                {(product.reuse as any).erf.installation}
              </td>
              <td className="cell">{(product.reuse as any).erf.usage}</td>
              <td className="cell">{(product.reuse as any).erf.endOfLife}</td>
            </>
          )}
        </tr>

        <tr key={product.id}>
          <th className="cell index-color index-col">
            Acidifications des sols et eaux
          </th>

          {type === "new" ? (
            <>
              <td className="cell">{(product.new as any).ase.manufacturing}</td>
              <td className="cell">{(product.new as any).ase.installation}</td>
              <td className="cell">{(product.new as any).ase.usage}</td>
              <td className="cell">{(product.new as any).ase.endOfLife}</td>
            </>
          ) : (
            <>
              <td className="cell">
                {(product.reuse as any).ase.manufacturing}
              </td>
              <td className="cell">
                {(product.reuse as any).ase.installation}
              </td>
              <td className="cell">{(product.reuse as any).ase.usage}</td>
              <td className="cell">{(product.reuse as any).ase.endOfLife}</td>
            </>
          )}
        </tr>

        <tr key={product.id}>
          <th className="cell index-color index-col">Eutrophisation marine</th>

          {type === "new" ? (
            <>
              <td className="cell">{(product.new as any).em.manufacturing}</td>
              <td className="cell">{(product.new as any).em.installation}</td>
              <td className="cell">{(product.new as any).em.usage}</td>
              <td className="cell">{(product.new as any).em.endOfLife}</td>
            </>
          ) : (
            <>
              <td className="cell">
                {(product.reuse as any).em.manufacturing}
              </td>
              <td className="cell">{(product.reuse as any).em.installation}</td>
              <td className="cell">{(product.reuse as any).em.usage}</td>
              <td className="cell">{(product.reuse as any).em.endOfLife}</td>
            </>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default ImpactTable;
