import AnalyticsIcon from '@mui/icons-material/Analytics';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import GroupsIcon from '@mui/icons-material/Groups';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SettingsIcon from '@mui/icons-material/Settings';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import StoreIcon from '@mui/icons-material/Store';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import { getLanguageFromURL } from '../utils/language';
import { getRoleOptions } from './roleOptions';

export const getMenuItems = () => {
    return [
        {
            label: "dashboard",
            icon: <DashboardIcon />,
            link: "/" + getLanguageFromURL() + "/",
            roles: getRoleOptions()
        },
        {
            label: "analytics",
            icon: <AnalyticsIcon />,
            link: "/" + getLanguageFromURL() + "/analytics",
            roles: ["ADMIN", "DIRECTOR", "MANAGER"]
        },
        {
            label: "organizations",
            icon: <BusinessIcon />,
            link: "/" + getLanguageFromURL() + "/organization",
            roles: ["ADMIN"]
        },
        {
            label: "outlets",
            icon: <StoreIcon />,
            link: "/" + getLanguageFromURL() + "/outlet",
            roles: ["ADMIN", "DIRECTOR"]
        },
        {
            label: "subscriptions",
            icon: <RememberMeIcon />,
            roles: ["ADMIN"],
            children: [
                {
                    label: "subscriptionPlans",
                    link: "/" + getLanguageFromURL() + "/subscriptionplan",
                    roles: ["ADMIN"]
                },
                {
                    label: "subscriptions",
                    link: "/" + getLanguageFromURL() + "/subscription",
                    roles: ["ADMIN"]
                }
            ]
        },
        {
            label: "menus",
            icon: <ArticleIcon />,
            link: "/" + getLanguageFromURL() + "/menu",
            roles: ["ADMIN", "DIRECTOR", "MANAGER"]
        },
        {
            label: "itemsAndModifiers",
            icon: <FeaturedPlayListIcon />,
            link: "/" + getLanguageFromURL() + "/items-and-modifiers",
            roles: ["ADMIN", "DIRECTOR", "MANAGER"]
        },
        {
            label: "feedback",
            icon: <ReviewsIcon />,
            link: "/" + getLanguageFromURL() + "/feedback",
            roles: ["ADMIN", "DIRECTOR", "MANAGER"]
        },
        {
            label: "loyalty",
            icon: <LoyaltyIcon />,
            link: "/" + getLanguageFromURL() + "/loyalty",
            roles: ["ADMIN", "DIRECTOR", "MANAGER"]
        },
        {
            label: "users",
            icon: <GroupsIcon />,
            roles: ["ADMIN"],
            children: [
                {
                    label: "users",
                    link: "/" + getLanguageFromURL() + "/user",
                    roles: ["ADMIN", "DIRECTOR", "MANAGER"]
                },
                {
                    label: "employees",
                    link: "/" + getLanguageFromURL() + "/employee",
                    roles: ["ADMIN", "DIRECTOR", "MANAGER"]
                },
                {
                    label: "customers",
                    link: "/" + getLanguageFromURL() + "/customer",
                    roles: ["ADMIN", "DIRECTOR", "MANAGER"]
                }
            ]
        },
        {
            label: "kitchenDisplay",
            icon: <SoupKitchenIcon />,
            link: "/" + getLanguageFromURL() + "/display/kitchen",
            roles: ["ADMIN", "DIRECTOR", "MANAGER"]
        },
        {
            label: "pickUpOrderDisplay",
            icon: <TakeoutDiningIcon />,
            link: "/" + getLanguageFromURL() + "/display/pickup-order",
            roles: ["ADMIN", "DIRECTOR", "MANAGER"]
        },
        {
            label: "settings",
            icon: <SettingsIcon />,
            link: "/" + getLanguageFromURL() + "/settings",
            roles: getRoleOptions()
        }
    ];
}