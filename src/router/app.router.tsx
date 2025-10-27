import { createBrowserRouter, Navigate } from "react-router";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayouts } from "@/heroes/layouts/HeroesLayouts";
import { AdminLayouts } from "@/admin/layouts/AdminLayouts";
import { lazy } from "react";
import HomePage from "@/heroes/pages/home/HomePage";

//To load the page when is necessary
const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));

export const router = createBrowserRouter([

    {
        path: '/',
        element: <HeroesLayouts />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'heroes/:idSlug',
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    },
    {
        path: '/',
        element: <AdminLayouts />,
        children: [
            {
                path: '/admin',
                element: <AdminPage />
            },
        ]
    }
    
])

