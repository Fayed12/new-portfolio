/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";

// react router
import { createBrowserRouter } from "react-router";

// Lazy page imports
const App = lazy(() => import("../App.jsx"));
const ErrorPage = lazy(() => import("../pages/error-page/ErrorPage"));
const OfflinePage = lazy(() => import("../pages/offline-page/OfflinePage"));

const Home = lazy(() => import("../pages/portfolio-pages/home/home.jsx"));
const About = lazy(() => import("../pages/portfolio-pages/about/about.jsx"));
const Skills = lazy(() => import("../pages/portfolio-pages/skills/skills.jsx"));
const Projects = lazy(() => import("../pages/portfolio-pages/projects/projects.jsx"));
const Experience = lazy(() => import("../pages/portfolio-pages/experience/experience.jsx"));
const GitHub = lazy(() => import("../pages/portfolio-pages/gitHub/gitHub.jsx"));
const Certifications = lazy(() => import("../pages/portfolio-pages/certifications/certifications.jsx"));
const Contact = lazy(() => import("../pages/portfolio-pages/contact/contact.jsx"));

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
            {
                path: "/about",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "/skills",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Skills />
                    </Suspense>
                ),
            },
            {
                path: "/projects",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Projects />
                    </Suspense>
                ),
            },
            {
                path: "/experience",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Experience />
                    </Suspense>
                ),
            },
            {
                path: "/github",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <GitHub />
                    </Suspense>
                ),
            },
            {
                path: "/certifications",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Certifications />
                    </Suspense>
                ),
            },
            {
                path: "/contact",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Contact />
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