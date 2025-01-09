import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export const Sidebar_Data = [
    {
        title: "Dashboard",
        icon: <AccountCircleIcon />,
        link: "/dashboard"
    },
    {
        title: "Appointments",
        icon: <CalendarMonthIcon />,
        link: "/appointments"

    },
    {
        title: "Diagnosis AI",
        icon: <SmartToyIcon />,
        link: "/"
    },
]