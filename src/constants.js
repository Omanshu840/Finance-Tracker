import { RetweetOutlined, UserOutlined, WalletOutlined, SwapOutlined} from "@ant-design/icons"

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
    {name: screens.ASSETS, icon: <SwapOutlined style={{fontSize: '25px', color: 'var(--secColor1)'}}/>},
    {name: screens.EXPENSES, icon: <WalletOutlined style={{fontSize: '23px', color: 'var(--secColor1)'}}/>},
    {name: screens.PROFILE, icon: <UserOutlined style={{fontSize: '25px', color: 'var(--secColor1)'}}/>}
]

export const profileOptions = [
    {name: "Recurring Transactions", icon: <RetweetOutlined style={{fontSize: '35px', marginBottom: '5px'}}/>}
]

export const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];