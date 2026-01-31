import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { WixServicesProvider, rootRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/root';
import { ProductDetailsRoute, productRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/product-details';
import { StoreCollectionRoute, storeCollectionRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/store-collection';
import { defaultStoreCollectionRouteRedirectLoader } from '@/wix-verticals/react-pages/react-router/routes/store-redirect';
import { Cart } from '@/wix-verticals/react-pages/react-router/routes/cart';

// Pages
import HomePage from '@/components/pages/HomePage';
import SnapToLinksPage from '@/components/pages/SnapToLinksPage';
import DesignStudioPage from '@/components/pages/DesignStudioPage';
import DesignerForumPage from '@/components/pages/DesignerForumPage';
import DesignEditorPage from '@/components/pages/DesignEditorPage';
import BillingPage from '@/components/pages/BillingPage';
import ProfilePage from '@/components/pages/ProfilePage';

// Layout component with WixServicesProvider
function Layout() {
  return (
    <WixServicesProvider>
      <ScrollToTop />
      <Outlet />
    </WixServicesProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: rootRouteLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "snap-to-links",
        element: <SnapToLinksPage />,
      },
      {
        path: "design-studio",
        element: <DesignStudioPage />,
      },
      {
        path: "designer-forum",
        element: <DesignerForumPage />,
      },
      {
        path: "design-editor",
        element: <DesignEditorPage />,
      },
      {
        path: "billing",
        element: <BillingPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: 'store',
        element: <StoreCollectionRoute productPageRoute="/products" />,
        loader: defaultStoreCollectionRouteRedirectLoader,
        index: true,
      },
      {
        path: 'store/:categorySlug',
        element: <StoreCollectionRoute productPageRoute="/products" />,
        loader: storeCollectionRouteLoader,
        routeMetadata: {
          appDefId: "1380b703-ce81-ff05-f115-39571d94dfcd",
          pageIdentifier: "wix.stores.sub_pages.category",
          identifiers: {
            categorySlug: "STORES.CATEGORY.SLUG"
          }
        }
      },
      {
        path: 'products/:slug',
        element: <ProductDetailsRoute />,
        loader: productRouteLoader,
        routeMetadata: {
          appDefId: "1380b703-ce81-ff05-f115-39571d94dfcd",
          pageIdentifier: "wix.stores.sub_pages.product",
          identifiers: {
            slug: "STORES.PRODUCT.SLUG"
          }
        },
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
