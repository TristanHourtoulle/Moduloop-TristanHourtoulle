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
                <td className='cell'>{product.new.rc_manufacturing}</td>
                <td className='cell'>{product.new.rc_installation}</td>
                <td className='cell'>{product.new.rc_usage}</td>
                <td className='cell'>{product.new.rc_endOfLife}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.reuse.rc_manufacturing}</td>
                <td className='cell'>{product.reuse.rc_usage}</td>
                <td className='cell'>{product.reuse.rc_installation}</td>
                <td className='cell'>{product.reuse.rc_endOfLife}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Epuisement des ressources fossiles</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.new.erc_manufacturing}</td>
                <td className='cell'>{product.new.erc_installation}</td>
                <td className='cell'>{product.new.erc_usage}</td>
                <td className='cell'>{product.new.erc_endOfLife}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.reuse.erc_manufacturing}</td>
                <td className='cell'>{product.reuse.erc_installation}</td>
                <td className='cell'>{product.reuse.erc_usage}</td>
                <td className='cell'>{product.reuse.erc_endOfLife}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Acidifications des sols et eaux</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.new.ase_manufacturing}</td>
                <td className='cell'>{product.new.ase_installation}</td>
                <td className='cell'>{product.new.ase_usage}</td>
                <td className='cell'>{product.new.ase_endOfLife}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.reuse.ase_manufacturing}</td>
                <td className='cell'>{product.reuse.ase_installation}</td>
                <td className='cell'>{product.reuse.ase_usage}</td>
                <td className='cell'>{product.reuse.ase_endOfLife}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Eutrophisation marine</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.new.ase_manufacturing}</td>
                <td className='cell'>{product.new.ase_installation}</td>
                <td className='cell'>{product.new.ase_usage}</td>
                <td className='cell'>{product.new.ase_endOfLife}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.reuse.ase_manufacturing}</td>
                <td className='cell'>{product.reuse.ase_installation}</td>
                <td className='cell'>{product.reuse.ase_usage}</td>
                <td className='cell'>{product.reuse.ase_endOfLife}</td>
              </>
            )
            }
          </tr>
      </tbody>
    </table>
  );
}

export default ImpactTable