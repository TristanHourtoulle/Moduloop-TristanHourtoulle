import { ProductType } from '@models/Product';
import React from 'react';

interface ImpactTableProps {
  product: ProductType;
  type: string;
}

const ImpactTable: React.FC<ImpactTableProps> = ({ product, type }) => {

  const columns = ['Fabrication', 'Transport et Installation', 'Utilisation', 'Fin de vie'];

  return (
    <table className='table'>
      <thead>
        <tr>
          <th></th> {/* Empty cell for the corner of the table */}
          {columns.map((column, index) => (
            <th className='cell index-color index-line' key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
          <tr key={product.id}>
            <th className='cell index-color index-col'>Réchauffement Climatique</th>
            {type === 'new' ? (
              <>
                <td className='cell'>{product.new.rc.manufacturing}</td>
                <td className='cell'>{product.new.rc.installation}</td>
                <td className='cell'>{product.new.rc.usage}</td>
                <td className='cell'>{product.new.rc.endOfLife}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.reuse.rc.manufacturing}</td>
                <td className='cell'>{product.reuse.rc.installation}</td>
                <td className='cell'>{product.reuse.rc.usage}</td>
                <td className='cell'>{product.reuse.rc.endOfLife}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Epuisement des ressources fossiles</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.new.erf.manufacturing}</td>
                <td className='cell'>{product.new.erf.installation}</td>
                <td className='cell'>{product.new.erf.usage}</td>
                <td className='cell'>{product.new.erf.endOfLife}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.reuse.erf.manufacturing}</td>
                <td className='cell'>{product.reuse.erf.installation}</td>
                <td className='cell'>{product.reuse.erf.usage}</td>
                <td className='cell'>{product.reuse.erf.endOfLife}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Acidifications des sols et eaux</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.new.ase.manufacturing}</td>
                <td className='cell'>{product.new.ase.installation}</td>
                <td className='cell'>{product.new.ase.usage}</td>
                <td className='cell'>{product.new.ase.endOfLife}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.reuse.ase.manufacturing}</td>
                <td className='cell'>{product.reuse.ase.installation}</td>
                <td className='cell'>{product.reuse.ase.usage}</td>
                <td className='cell'>{product.reuse.ase.endOfLife}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Eutrophisation marine</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.new.em.manufacturing}</td>
                <td className='cell'>{product.new.em.installation}</td>
                <td className='cell'>{product.new.em.usage}</td>
                <td className='cell'>{product.new.em.endOfLife}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.reuse.em.manufacturing}</td>
                <td className='cell'>{product.reuse.em.installation}</td>
                <td className='cell'>{product.reuse.em.usage}</td>
                <td className='cell'>{product.reuse.em.endOfLife}</td>
              </>
            )
            }
          </tr>
      </tbody>
    </table>
  );
}

export default ImpactTable