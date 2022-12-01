export const MAIN_ROUTES = {
    login: '/',
    app_modules: '/app'
}

export const APP_ROUTES = {
    /** Orders */
    create_order: '/create-order',
    orders_box: '/orders-box',
    orders_history: '/orders-history',
    orders_history_group_date: '/orders-history-group-date',
    orders_history_group_client: '/orders-history-group-client',
    orders: '/orders',
    seller_client_orders: "/seller-client-orders",
    seller_orders: '/seller-orders',
    
    /** Departures */
    departures: '/departures',
    seller_departures: "/seller-departures",

    /** Payments */
    payments: '/payments',
    seller_payments: "/seller-payments",

    /** Poket Balance */
    pocket_balance: '/pocket-balance',
    seller_pocket_balance: "/seller-pocket-balance",

    /** Config */
    products: '/products',
    colors: '/colors',
    clients: '/clients',
    sellers: '/sellers',
    prices: '/prices',

    /** Profile */
    profile: '/profile',
}