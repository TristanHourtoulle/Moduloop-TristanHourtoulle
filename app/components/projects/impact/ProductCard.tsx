import React from 'react';
import { AddProductType } from '@models/AddProduct';
import { get } from 'http';

export function visibleNumber(value: number) {
    const temp = value.toLocaleString();
    let res: string = "";
    let decimal: boolean = true;
    let count: number = 0;

    for (let i = temp.length - 1; i >= 0; i--) {
        if (decimal && temp[i] === ".") {
            decimal = false;
            res = "," + res;
        }  else if (decimal) {
            res = temp[i] + res;
        } else if (!decimal) {
            count++;
            if (count % 4 === 0) {
                res = " " + res;
            }
            res = temp[i] + res;
        }
    }

    res = res.replace(".", ",");
    return res;
}

export function getPercentage(value: number, total: number) {
    let temp: number = (value / total) * 100;
    let tempString: string = temp.toString();

    let count = 0
    let decimal = false
    let res: string = "";
    for (let i = 0; i < tempString.length - 1; i++) {
        if (!decimal && tempString[i] === ".") {
            decimal = true
        } else if (decimal) {
            count++
        }
        res += tempString[i]
        if (count === 2) {
            break
        }
    }
    return res;
}

export const ProductCard = (props: { product: AddProductType, impactValue: number, impactType: string, positionInTop: number, totalImpact: number }) => {
    const { product, impactValue, impactType, positionInTop, totalImpact } = props;
    let percentage = impactValue / totalImpact * 100;
    percentage = Number(percentage.toString().replace(".", ","));
    const formattedPercentage = getPercentage(impactValue, totalImpact);

    return (
        <div className='flex flex-col p-4 impact-product-card'>
            <h3><span>n°{positionInTop}</span> {product.product.name}</h3>
            <div className='flex items-center gap-5'>
                <span className='text-bold'>{visibleNumber(impactValue)}</span> {impactType}
            </div>
            <div className='flex items-center gap-5'>
                <span className='text-bold'>{formattedPercentage}%</span> Total
            </div>
        </div>
    );
};
