export interface GlobalUserData {
    id_user: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    shop?: S;
    sentMessages: M[];
    receivedMessages: M[];
    comments: C[];
    orders: O[];
}
interface S {
    id_shop: number;
    name: string;
    description: string;
    address: string;
    image: string;
    phone: string;
    siret: string;
    legalproof: string;
    logo: string;
    id_shoprequest: number;
    id_status: number;
}

interface M {
    id_message: number;
    id_recipient?: number;
    id_sender?: number;
    title: string;
    message: string;
    date: string;
}

interface C {
    id_comment: number;
    id_product: number;
    product_name: number;
    message: string;
    date: string;
    note: number;
}

interface O {
    id_order: number;
    state: string;
}