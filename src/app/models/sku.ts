/*
 This defines the data model of Node's SKU.
*/
export class SKU {
    id: string;
    name: string;
    discoveryGraphName: string;
    discoveryGraphOptions: {};
    rules: any;
    skuConfig: any;
}

export const SKU_URL = {
    skus: '/skus',
    skusById: '/skus/',
    skusPack: '/skus/pack',
}