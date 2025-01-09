import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import React from 'react';

export const Sidebar_Data = [
    {
        title: "Dashboard",
        icon: React.createElement(AccountCircleIcon),
        link: "/dashboard"
    },
    {
        title: "Appointments",
        icon: React.createElement(CalendarMonthIcon),
        link: "/appointments"

    },
    {
        title: "Diagnosis AI",
        icon: React.createElement(SmartToyIcon),
        link: "/"
    },
]