import { AddProductType } from '@models/AddProduct'
import React from 'react'
import { GlobalImpact } from '@models/Impact';

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

        // calculate the impact of the product for qNew
        globalImpact.rc.manufacturing += product.product.new.rc_manufacturing * qNew;
        globalImpact.rc.installation += product.product.new.rc_installation * qNew;
        globalImpact.rc.usage += product.product.new.rc_usage * qNew;
        globalImpact.rc.endOfLife += product.product.new.rc_endOfLife * qNew;
        globalImpact.erf.manufacturing += product.product.new.erc_manufacturing * qNew;
        globalImpact.erf.installation += product.product.new.erc_installation * qNew;
        globalImpact.erf.usage += product.product.new.erc_usage * qNew;
        globalImpact.erf.endOfLife += product.product.new.erc_endOfLife * qNew;
        globalImpact.ase.manufacturing += product.product.new.ase_manufacturing * qNew;
        globalImpact.ase.installation += product.product.new.ase_installation * qNew;
        globalImpact.ase.usage += product.product.new.ase_usage * qNew;
        globalImpact.ase.endOfLife += product.product.new.ase_endOfLife * qNew;
        globalImpact.em.manufacturing += product.product.new.em_manufacturing * qNew;
        globalImpact.em.installation += product.product.new.em_installation * qNew;
        globalImpact.em.usage += product.product.new.em_usage * qNew;
        globalImpact.em.endOfLife += product.product.new.em_endOfLife * qNew;
        // calculate the impact of the product for qUsed
        globalImpact.rc.manufacturing += product.product.reuse.rc_manufacturing * qUsed;
        globalImpact.rc.installation += product.product.reuse.rc_installation * qUsed;
        globalImpact.rc.usage += product.product.reuse.rc_usage * qUsed;
        globalImpact.rc.endOfLife += product.product.reuse.rc_endOfLife * qUsed;
        globalImpact.erf.manufacturing += product.product.reuse.erc_manufacturing * qUsed;
        globalImpact.erf.installation += product.product.reuse.erc_installation * qUsed;
        globalImpact.erf.usage += product.product.reuse.erc_usage * qUsed;
        globalImpact.erf.endOfLife += product.product.reuse.erc_endOfLife * qUsed;
        globalImpact.ase.manufacturing += product.product.reuse.ase_manufacturing * qUsed;
        globalImpact.ase.installation += product.product.reuse.ase_installation * qUsed;
        globalImpact.ase.usage += product.product.reuse.ase_usage * qUsed;
        globalImpact.ase.endOfLife += product.product.reuse.ase_endOfLife * qUsed;
        globalImpact.em.manufacturing += product.product.reuse.em_manufacturing * qUsed;
        globalImpact.em.installation += product.product.reuse.em_installation * qUsed;
        globalImpact.em.usage += product.product.reuse.em_usage * qUsed;
        globalImpact.em.endOfLife += product.product.reuse.em_endOfLife * qUsed;
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
                            <td className='cell'>{globalImpact.rc.manufacturing === 0 ? "0" : globalImpact.rc.manufacturing.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.rc.installation === 0 ? "0" : globalImpact.rc.installation.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.rc.usage === 0 ? "0" : globalImpact.rc.usage.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.rc.endOfLife === 0 ? "0" : globalImpact.rc.endOfLife.toFixed(2)}</td>
                    </tr>

                    <tr>
                        <th className='cell index-color index-col'>Epuisement des ressources fossiles</th>
                            <td className='cell'>{globalImpact.erf.manufacturing === 0 ? "0" : globalImpact.erf.manufacturing.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.erf.installation === 0 ? "0" : globalImpact.erf.installation.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.erf.usage === 0 ? "0" : globalImpact.erf.usage.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.erf.endOfLife === 0 ? "0" : globalImpact.erf.endOfLife.toFixed(2)}</td>
                    </tr>

                    <tr>
                        <th className='cell index-color index-col'>Acidifications des sols et eaux</th>
                            <td className='cell'>{globalImpact.ase.manufacturing === 0 ? "0" : globalImpact.ase.manufacturing.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.ase.installation === 0 ? "0" : globalImpact.ase.installation.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.ase.usage === 0 ? "0" : globalImpact.ase.usage.toFixed(2)}</td>
                            <td className='cell'>{globalImpact.ase.endOfLife === 0 ? "0" : globalImpact.ase.endOfLife.toFixed(2)}</td>
                    </tr>

                    <tr>
                        <th className='cell index-color index-col'>Eutrophisation marine</th>
                            <td className='cell'>{globalImpact.em.manufacturing === 0 ? "0" : globalImpact.em.manufacturing.toFixed(5)}</td>
                            <td className='cell'>{globalImpact.em.installation === 0 ? "0" : globalImpact.em.installation.toFixed(5)}</td>
                            <td className='cell'>{globalImpact.em.usage === 0 ? "0" : globalImpact.em.usage.toFixed(5)}</td>
                            <td className='cell'>{globalImpact.em.endOfLife === 0 ? "0" : globalImpact.em.endOfLife.toFixed(5)}</td>
                    </tr>
                </tbody>
                </table>
        </div>
    )
}

export default GlobalTable