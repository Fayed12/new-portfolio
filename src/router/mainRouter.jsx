/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";

// react router
import { createBrowserRouter } from "react-router";

// Lazy page imports
const App = lazy(() => import("../App.jsx"));
const ErrorPage = lazy(() => import("../pages/error-page/ErrorPage"));
const OfflinePage = lazy(() => import("../pages/offline-page/OfflinePage"));

const Home = lazy(() => import("../pages/portfolio-pages/home/home.jsx"));

// Normal imports
import LoadingPage from "../pages/loading-page/LoadingPage";

// Router
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<LoadingPage />}>
                <App />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<LoadingPage />}>
                <ErrorPage />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "/home",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Home />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/loading",
        element: <LoadingPage />,   
    },
    {
        path: "/offline",
        element: (
            <Suspense fallback={<LoadingPage />}>
                <OfflinePage />
            </Suspense>
        ),
    },
    {
        path: "/error",
        element: (
            <Suspense fallback={<LoadingPage />}>
                <ErrorPage />
            </Suspense>
        ),
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<LoadingPage />}>
                <ErrorPage code="404" title="Page Not Found" message="The page you're looking for doesn't exist or has been moved." />
            </Suspense>
        ),
    },
]);

export default router;