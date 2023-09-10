import { BankOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons"

export const screens = {
    ASSETS: "ASSETS",
    EXPENSES: "EXPENSES",
    PROFILE: "PROFILE",
    LOGIN: "LOGIN"
}

export const categories = [
    "Household",
    "Food",
    "Groceries",
    "Shopping",
    "Travel",
    "Others"
]

export const navItems = [
    {name: screens.ASSETS, icon: <BankOutlined style={{fontSize: '25px', color: 'var(--secColor1)'}}/>},
    {name: screens.EXPENSES, icon: <WalletOutlined style={{fontSize: '23px', color: 'var(--secColor1)'}}/>},
    {name: screens.PROFILE, icon: <UserOutlined style={{fontSize: '25px', color: 'var(--secColor1)'}}/>}
]

export const dummyData = [
    {
        "name": "House Rent",
        "amount": 15000,
        "description": "",
        "category": "Household",
        "date": "2023-09-01"
    },
    {
        "name": "Cook",
        "amount": 1750,
        "description": "",
        "category": "Household",
        "date": "2023-09-01"
    },
    {
        "name": "Swiggy",
        "amount": 105,
        "description": "Truffles: Chicken steak burger",
        "category": "Food",
        "date": "2023-09-02"
    },
    {
        "name": "Swiggy",
        "amount": 88,
        "description": "Wow! Momo: Chicken Fried Momo mania",
        "category": "Food",
        "date": "2023-09-02"
    },
    {
        "name": "Zepto",
        "amount": 114,
        "description": "Atta, Methi",
        "category": "Groceries",
        "date": "2023-09-02"
    },
    {
        "name": "Zomato",
        "amount": 159,
        "description": "Kwality Wall's",
        "category": "Food",
        "date": "2023-09-02"
    },
    {
        "name": "Zomato",
        "amount": 206,
        "description": "Maalgaadi By Dhaba Estd 1986 Delhi",
        "category": "Food",
        "date": "2023-09-03"
    },
    {
        "name": "Zomato",
        "amount": 234,
        "description": "Wow! Momo: Combo",
        "category": "Food",
        "date": "2023-09-04"
    },
    {
        "name": "New Plaza",
        "amount": 84,
        "description": "Oil: Safola tasty",
        "category": "Groceries",
        "date": "2023-09-05"
    },
    {
        "name": "Uber",
        "amount": 33,
        "description": "Office to Home",
        "category": "Travel",
        "date": "2023-09-01"
    },
    {
        "name": "Uber",
        "amount": 32,
        "description": "Badminton to Home",
        "category": "Travel",
        "date": "2023-09-02"
    },
    {
        "name": "Uber",
        "amount": 32,
        "description": "Office to Home",
        "category": "Travel",
        "date": "2023-09-04"
    },
    {
        "name": "Uber",
        "amount": 25,
        "description": "Office to Home",
        "category": "Travel",
        "date": "2023-09-05"
    },
    {
        "name": "Badminton",
        "amount": 117,
        "description": "Visa badminton court booking",
        "category": "Others",
        "date": "2023-09-02"
    }
]