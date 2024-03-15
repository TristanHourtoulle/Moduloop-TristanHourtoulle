import { AddProductType } from '@models/AddProduct'
import React from 'react'
import { GlobalImpact } from '@models/Impact';
import { visibleNumber } from './ProductCard';

function getGlobalImpact(products: AddProductType[]): GlobalImpact {
    const globalImpact: GlobalImpact = {
        rc: {
            manufacturing: 0,
            installation: 0,
            usage: 0,
            endOfLife: 0
        },
        erf: {
            manufacturing: 0,
            installation: 0,
            usage: 0,
            endOfLife: 0
        },
        ase: {
            manufacturing: 0,
            installation: 0,
            usage: 0,
            endOfLife: 0
        },
        em: {
            manufacturing: 0,
            installation: 0,
            usage: 0,
            endOfLife: 0
        }
    }

    for (let product of products) {
        const qNew = product.qNew;
        const qUsed = product.qUsed;
        console.log('product:', product);

        // calculate the impact of the product for qNew
        globalImpact.rc.manufacturing += product.product.new.rc.manufacturing * qNew;
        globalImpact.rc.installation += product.product.new.rc.installation * qNew;
        globalImpact.rc.usage += product.product.new.rc.usage * qNew;
        globalImpact.rc.endOfLife += product.product.new.rc.endOfLife * qNew;
        globalImpact.erf.manufacturing += product.product.new.erf.manufacturing * qNew;
        globalImpact.erf.installation += product.product.new.erf.installation * qNew;
        globalImpact.erf.usage += product.product.new.erf.usage * qNew;
        globalImpact.erf.endOfLife += product.product.new.erf.endOfLife * qNew;
        globalImpact.ase.manufacturing += product.product.new.ase.manufacturing * qNew;
        globalImpact.ase.installation += product.product.new.ase.installation * qNew;
        globalImpact.ase.usage += product.product.new.ase.usage * qNew;
        globalImpact.ase.endOfLife += product.product.new.ase.endOfLife * qNew;
        globalImpact.em.manufacturing += product.product.new.em.manufacturing * qNew;
        globalImpact.em.installation += product.product.new.em.installation * qNew;
        globalImpact.em.usage += product.product.new.em.usage * qNew;
        globalImpact.em.endOfLife += product.product.new.em.endOfLife * qNew;
        // calculate the impact of the product for qUsed
        globalImpact.rc.manufacturing += product.product.reuse.rc.manufacturing * qUsed;
        globalImpact.rc.installation += product.product.reuse.rc.installation * qUsed;
        globalImpact.rc.usage += product.product.reuse.rc.usage * qUsed;
        globalImpact.rc.endOfLife += product.product.reuse.rc.endOfLife * qUsed;
        globalImpact.erf.manufacturing += product.product.reuse.erf.manufacturing * qUsed;
        globalImpact.erf.installation += product.product.reuse.erf.installation * qUsed;
        globalImpact.erf.usage += product.product.reuse.erf.usage * qUsed;
        globalImpact.erf.endOfLife += product.product.reuse.erf.endOfLife * qUsed;
        globalImpact.ase.manufacturing += product.product.reuse.ase.manufacturing * qUsed;
        globalImpact.ase.installation += product.product.reuse.ase.installation * qUsed;
        globalImpact.ase.usage += product.product.reuse.ase.usage * qUsed;
        globalImpact.ase.endOfLife += product.product.reuse.ase.endOfLife * qUsed;
        globalImpact.em.manufacturing += product.product.reuse.em.manufacturing * qUsed;
        globalImpact.em.installation += product.product.reuse.em.installation * qUsed;
        globalImpact.em.usage += product.product.reuse.em.usage * qUsed;
        globalImpact.em.endOfLife += product.product.reuse.em.endOfLife * qUsed;
    }

    return globalImpact;
}

const GlobalTable = (props: { products: AddProductType[] }) => {
    const { products } = props;
    const globalImpact: GlobalImpact = getGlobalImpact(products);

    const columns = ['Fabrication', 'Transport et Installation', 'Utilisation', 'Fin de vie'];

    return (
        <div>
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
                    <tr>
                        <th className='cell index-color index-col'>Réchauffement Climatique</th>
                        {Object.values(globalImpact.rc).map((value, index) => (
                            <td key={index} className='cell'>{value === 0 ? "0" : visibleNumber(value.toFixed(2))}</td>
                        ))}
                    </tr>
                    <tr>
                        <th className='cell index-color index-col'>Epuisement des ressources fossiles</th>
                        {Object.values(globalImpact.erf).map((value, index) => (
                            <td key={index} className='cell'>{value === 0 ? "0" : visibleNumber(value.toFixed(2))}</td>
                        ))}
                    </tr>
                    <tr>
                        <th className='cell index-color index-col'>Acidifications des sols et eaux</th>
                        {Object.values(globalImpact.ase).map((value, index) => (
                            <td key={index} className='cell'>{value === 0 ? "0" : visibleNumber(value.toFixed(2))}</td>
                        ))}
                    </tr>
                    <tr>
                        <th className='cell index-color index-col'>Eutrophisation marine</th>
                        {Object.values(globalImpact.em).map((value, index) => (
                            <td key={index} className='cell'>{value === 0 ? "0" : visibleNumber(value.toFixed(5))}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GlobalTable;