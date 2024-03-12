import React from 'react'
import { AddProductType } from '@models/AddProduct'
import { MostImpactType } from '@models/MostImpact'
import { GlobalImpact } from '@models/Impact'
import { ProductCard } from './ProductCard'
import { PieConfigType, PieType } from '@models/PieType'
import Pie from '@components/charts/Pie'

function getTotalRcImpact(products: AddProductType[]) {
    let totalRcImpact: number = 0;
    for (let product of products) {
        const qNew = product.qNew;
        const qUsed = product.qUsed;
        totalRcImpact += (product.product.new.rc_manufacturing * qNew) + (product.product.new.rc_installation * qNew) + (product.product.new.rc_usage * qNew) + (product.product.new.rc_endOfLife * qNew);
        totalRcImpact += (product.product.reuse.rc_manufacturing * qUsed) + (product.product.reuse.rc_installation * qUsed) + (product.product.reuse.rc_usage * qUsed) + (product.product.reuse.rc_endOfLife * qUsed);
    }
    return totalRcImpact;
}

function getTotalErfImpact(products: AddProductType[]) {
    let totalErfImpact: number = 0;
    for (let product of products) {
        const qNew = product.qNew;
        const qUsed = product.qUsed;
        totalErfImpact += (product.product.new.erc_manufacturing * qNew) + (product.product.new.erc_installation * qNew) + (product.product.new.erc_usage * qNew) + (product.product.new.erc_endOfLife * qNew);
        totalErfImpact += (product.product.reuse.erc_manufacturing * qUsed) + (product.product.reuse.erc_installation * qUsed) + (product.product.reuse.erc_usage * qUsed) + (product.product.reuse.erc_endOfLife * qUsed);
    }
    return totalErfImpact;
}

function getTotalAseImpact(products: AddProductType[]) {
    let totalAseImpact: number = 0;
    for (let product of products) {
        const qNew = product.qNew;
        const qUsed = product.qUsed;
        totalAseImpact += (product.product.new.ase_manufacturing * qNew) + (product.product.new.ase_installation * qNew) + (product.product.new.ase_usage * qNew) + (product.product.new.ase_endOfLife * qNew);
        totalAseImpact += (product.product.reuse.ase_manufacturing * qUsed) + (product.product.reuse.ase_installation * qUsed) + (product.product.reuse.ase_usage * qUsed) + (product.product.reuse.ase_endOfLife * qUsed);
    }
    return totalAseImpact;
}

function getTotalEmImpact(products: AddProductType[]) {
    let totalEmImpact: number = 0;
    for (let product of products) {
        const qNew = product.qNew;
        const qUsed = product.qUsed;
        totalEmImpact += (product.product.new.em_manufacturing * qNew) + (product.product.new.em_installation * qNew) + (product.product.new.em_usage * qNew) + (product.product.new.em_endOfLife * qNew);
        totalEmImpact += (product.product.reuse.em_manufacturing * qUsed) + (product.product.reuse.em_installation * qUsed) + (product.product.reuse.em_usage * qUsed) + (product.product.reuse.em_endOfLife * qUsed);
    }
    return totalEmImpact;
}

function getTop3MostImpact(products: AddProductType[]) {
    const res: MostImpactType[] = []

    for (let product of products) {
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


        const singleProduct: MostImpactType = {
            product: product,
            totalRc: globalImpact.rc.manufacturing + globalImpact.rc.installation + globalImpact.rc.usage + globalImpact.rc.endOfLife,
            totalErf: globalImpact.erf.manufacturing + globalImpact.erf.installation + globalImpact.erf.usage + globalImpact.erf.endOfLife,
            totalAse: globalImpact.ase.manufacturing + globalImpact.ase.installation + globalImpact.ase.usage + globalImpact.ase.endOfLife,
            totalEm: globalImpact.em.manufacturing + globalImpact.em.installation + globalImpact.em.usage + globalImpact.em.endOfLife,
            totalImpact: 0
        }
        singleProduct.totalImpact = singleProduct.totalRc + singleProduct.totalErf + singleProduct.totalAse + singleProduct.totalEm
        res.push(singleProduct)
    }

    // Trier res en fonction de la propriété totalImpact de chaque objet MostImpactType
    return (res)
}

function sortByRc(res: MostImpactType[]) {
    res.sort((a, b) => b.totalRc - a.totalRc);
    // Retourner les trois premiers éléments de res ou res.length, selon ce qui est le plus petit
    return res.slice(0, Math.min(3, res.length));
}

function sortByErf(res: MostImpactType[]) {
    res.sort((a, b) => b.totalErf - a.totalErf);
    return res.slice(0, Math.min(3, res.length));
}

function sortByAse(res: MostImpactType[]) {
    res.sort((a, b) => b.totalAse - a.totalAse);
    return res.slice(0, Math.min(3, res.length));
}

function sortByEm(res: MostImpactType[]) {
    res.sort((a, b) => b.totalEm - a.totalEm);
    return res.slice(0, Math.min(3, res.length));
}

function getConfigPie(impactProducts: MostImpactType[]) {
    const data: PieType[] = []

    for (let impactProduct of impactProducts) {
        const percentage = impactProduct.totalImpact / impactProducts[0].totalImpact * 100;
        const pie: PieType = {
            name: impactProduct.product.product.name,
            value: percentage
        }
        console.log(pie)
        data.push(pie)
    }
    return data
}

const ListMostImpact = (props: { products: AddProductType[] }) => {
    const { products } = props;
    const impactProducts = getTop3MostImpact(products)
    const rcImpactProducts = sortByRc(impactProducts)
    const erfImpactProducts = sortByErf(impactProducts)
    const aseImpactProducts = sortByAse(impactProducts)
    const emImpactProducts = sortByEm(impactProducts)

    const totalRcImpact = getTotalRcImpact(products)
    const totalErfImpact = getTotalErfImpact(products)
    const totalAseImpact = getTotalAseImpact(products)
    const totalEmImpact = getTotalEmImpact(products)

    const rcPieConfig: PieConfigType = {
        title: "Réchauffement climatique",
        data: getConfigPie(rcImpactProducts),
        total: totalRcImpact
    }

    const erfPieConfig: PieConfigType = {
        title: "Épuisement des ressources fossiles",
        data: getConfigPie(erfImpactProducts),
        total: totalErfImpact
    }

    const asePieConfig: PieConfigType = {
        title: "Acidification des sols et des eaux",
        data: getConfigPie(aseImpactProducts),
        total: totalAseImpact
    }

    const emPieConfig: PieConfigType = {
        title: "Eutrophisation marine",
        data: getConfigPie(emImpactProducts),
        total: totalEmImpact
    }

    return (
        <div>
            {products.length >= 1 ? (
                <div className='flex flex-col items-start'>
                    <h3 className='mt-[2%] mb-[1%] font-xl font-bold'>Produits plus impactant sur le réchauffement climatique</h3>
                    <div className='sm:flex sm:items-center sm:gap-5'>
                        <Pie pieConfig={rcPieConfig} />
                        <div className='sm:flex sm:gap-5 mx-auto'>
                            {rcImpactProducts[0] && (<ProductCard product={rcImpactProducts[0].product} impactValue={rcImpactProducts[0].totalRc.toFixed(2)} impactType='kg CO2eq' positionInTop={1} totalImpact={totalRcImpact} />)}
                            {rcImpactProducts[1] && (<ProductCard product={rcImpactProducts[1].product} impactValue={rcImpactProducts[1].totalRc.toFixed(2)} impactType='kg CO2eq' positionInTop={2} totalImpact={totalRcImpact} />)}
                            {rcImpactProducts[2] && (<ProductCard product={rcImpactProducts[2].product} impactValue={rcImpactProducts[2].totalRc.toFixed(2)} impactType='kg CO2eq' positionInTop={3} totalImpact={totalRcImpact} />)}
                        </div>
                    </div>

                    <h3 className='mt-[2%] mb-[1%] font-xl font-bold'>Produits plus impactant sur l'épuisement des ressources fossiles</h3>
                    <div className='flex items-center gap-5 my-[1%] '>
                        <Pie pieConfig={erfPieConfig} />
                        <div className='flex items-center gap-5'>
                            {erfImpactProducts[0] && (<ProductCard product={erfImpactProducts[0].product} impactValue={erfImpactProducts[0].totalErf.toFixed(2)} impactType='MJ' positionInTop={1} totalImpact={totalErfImpact} />)}
                            {erfImpactProducts[1] && (<ProductCard product={erfImpactProducts[1].product} impactValue={erfImpactProducts[1].totalErf.toFixed(2)} impactType='MJ' positionInTop={2} totalImpact={totalErfImpact} />)}
                            {erfImpactProducts[2] && (<ProductCard product={erfImpactProducts[2].product} impactValue={erfImpactProducts[2].totalErf.toFixed(2)} impactType='MJ' positionInTop={3} totalImpact={totalErfImpact} />)}
                        </div>
                    </div>

                    <h3 className='mt-[2%] mb-[1%] font-xl font-bold'>Produits plus impactant sur l'acidification des sols et des eaux</h3>
                    <div className='flex items-center gap-5 my-[1%] '>
                        <Pie pieConfig={asePieConfig} />
                        <div className='flex items-center gap-5'>
                            {aseImpactProducts[0] && (<ProductCard product={aseImpactProducts[0].product} impactValue={aseImpactProducts[0].totalAse.toFixed(2)} impactType='kg SO2eq' positionInTop={1} totalImpact={totalAseImpact} />)}
                            {aseImpactProducts[1] && (<ProductCard product={aseImpactProducts[1].product} impactValue={aseImpactProducts[1].totalAse.toFixed(2)} impactType='kg SO2eq' positionInTop={2} totalImpact={totalAseImpact} />)}
                            {aseImpactProducts[2] && (<ProductCard product={aseImpactProducts[2].product} impactValue={aseImpactProducts[2].totalAse.toFixed(2)} impactType='kg SO2eq' positionInTop={3} totalImpact={totalAseImpact} />)}
                        </div>
                    </div>

                    <h3 className='mt-[2%] mb-[1%] font-xl font-bold'>Produits plus impactant sur l'eutrophisation marine</h3>
                    <div className='flex items-center gap-5 my-[1%] '>
                        <Pie pieConfig={emPieConfig} />
                        <div className='flex items-center gap-5'>
                            {emImpactProducts[0] && (<ProductCard product={emImpactProducts[0].product} impactValue={emImpactProducts[0].totalEm.toFixed(2)} impactType='kg PO4eq' positionInTop={1} totalImpact={totalEmImpact} />)}
                            {emImpactProducts[1] && (<ProductCard product={emImpactProducts[1].product} impactValue={emImpactProducts[1].totalEm.toFixed(2)} impactType='kg PO4eq' positionInTop={2} totalImpact={totalEmImpact} />)}
                            {emImpactProducts[2] && (<ProductCard product={emImpactProducts[2].product} impactValue={emImpactProducts[2].totalEm.toFixed(2)} impactType='kg PO4eq' positionInTop={3} totalImpact={totalEmImpact} />)}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Aucun produit</p>
                </div>
            )}
        </div>
    )
}

export default ListMostImpact