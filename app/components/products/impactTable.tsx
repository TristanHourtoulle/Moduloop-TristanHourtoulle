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
                <td className='cell'>{product.nrc_manufacturing}</td>
                <td className='cell'>{product.nrc_usage}</td>
                <td className='cell'>{product.nrc_installation}</td>
                <td className='cell'>{product.nrc_end_of_life}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.rrc_manufacturing}</td>
                <td className='cell'>{product.rrc_usage}</td>
                <td className='cell'>{product.rrc_installation}</td>
                <td className='cell'>{product.rrc_end_of_life}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Epuisement des ressources fossiles</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.nerf_manufacturing}</td>
                <td className='cell'>{product.nerf_installation}</td>
                <td className='cell'>{product.nerf_usage}</td>
                <td className='cell'>{product.nerf_end_of_life}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.rerf_manufacturing}</td>
                <td className='cell'>{product.rerf_installation}</td>
                <td className='cell'>{product.rerf_usage}</td>
                <td className='cell'>{product.rerf_end_of_life}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Acidifications des sols et eaux</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.nase_manufacturing}</td>
                <td className='cell'>{product.nase_installation}</td>
                <td className='cell'>{product.nase_usage}</td>
                <td className='cell'>{product.nase_end_of_life}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.rase_manufacturing}</td>
                <td className='cell'>{product.rase_installation}</td>
                <td className='cell'>{product.rase_usage}</td>
                <td className='cell'>{product.rase_end_of_life}</td>
              </>
            )
            }
          </tr>

          <tr key={product.id}>
            <th className='cell index-color index-col'>Eutrophisation marine</th>

            {type === 'new' ? (
              <>
                <td className='cell'>{product.nase_manufacturing}</td>
                <td className='cell'>{product.nase_installation}</td>
                <td className='cell'>{product.nase_usage}</td>
                <td className='cell'>{product.nase_end_of_life}</td>
              </>
            )
            : (
              <>
                <td className='cell'>{product.rase_manufacturing}</td>
                <td className='cell'>{product.rase_installation}</td>
                <td className='cell'>{product.rase_usage}</td>
                <td className='cell'>{product.rase_end_of_life}</td>
              </>
            )
            }
          </tr>
      </tbody>
    </table>
  );
}

export default ImpactTable