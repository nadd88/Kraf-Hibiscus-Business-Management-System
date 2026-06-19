import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PaymentPage } from './pages/PaymentPage';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { CommunityRecyclingPage } from './pages/CommunityRecyclingPage';
import { ContactPage } from './pages/ContactPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { MyProfilePage } from './pages/MyProfilePage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { InventoryPage } from './pages/admin/InventoryPage';
import { AddInventoryPage } from './pages/admin/AddInventoryPage';
import { StaffListPage } from './pages/admin/StaffListPage';
import { AddStaffPage } from './pages/admin/AddStaffPage';
import { StaffDetailsPage } from './pages/admin/StaffDetailsPage';
import { EditStaffPage } from './pages/admin/EditStaffPage';
import { TaskListPage } from './pages/admin/TaskListPage';
import { CreateTaskPage } from './pages/admin/CreateTaskPage';
import { TaskDetailsPage } from './pages/admin/TaskDetailsPage';
import { AssignTaskPage } from './pages/admin/AssignTaskPage';
import { UpdateTaskProgressPage } from './pages/admin/UpdateTaskProgressPage';
import { ContributionListPage } from './pages/admin/ContributionListPage';
import { RecordContributionPage } from './pages/admin/RecordContributionPage';
import { ContributionDetailsPage } from './pages/admin/ContributionDetailsPage';
import { CustomerListPage } from './pages/admin/CustomerListPage';
import { CustomerDetailsPage } from './pages/admin/CustomerDetailsPage';
import { PaymentListPage } from './pages/admin/PaymentListPage';
import { SupplierListPage } from './pages/admin/SupplierListPage';
import { AddSupplierPage } from './pages/admin/AddSupplierPage';
import { MaterialInventoryPage } from './pages/admin/MaterialInventoryPage';
import { FinancialRecordsPage } from './pages/admin/FinancialRecordsPage';
import { RecordIncomePage } from './pages/admin/RecordIncomePage';
import { RecordExpensePage } from './pages/admin/RecordExpensePage';
import { CommunityActivitiesPage } from './pages/admin/CommunityActivitiesPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { SettingsAdminPage } from './pages/admin/SettingsAdminPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';

function NotFoundPage() {
  return (
    <PlaceholderPage
      title="Page Not Found"
      description="The page you are looking for does not exist."
    />
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/products',
    Component: ProductsPage,
  },
  {
    path: '/products/:id',
    Component: ProductDetailPage,
  },
  {
    path: '/cart',
    Component: CartPage,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/checkout', Component: CheckoutPage },
      { path: '/payment/:orderId', Component: PaymentPage },
      { path: '/order-success/:orderId', Component: OrderSuccessPage },
      { path: '/my-orders', Component: MyOrdersPage },
      { path: '/my-profile', Component: MyProfilePage },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/community',
    Component: CommunityRecyclingPage,
  },
  {
    path: '/contact',
    Component: ContactPage,
  },
  {
    path: '/admin-login',
    Component: AdminLoginPage,
  },
  {
    path: '/forgot-password',
    Component: ForgotPasswordPage,
  },
  {
    path: '/admin/dashboard',
    Component: AdminDashboardPage,
  },
  {
    path: '/admin/orders',
    Component: OrdersPage,
  },
  {
    path: '/admin/inventory',
    Component: InventoryPage,
  },
  {
    path: '/admin/inventory/add',
    Component: AddInventoryPage,
  },
  {
    path: '/admin/staff',
    Component: StaffListPage,
  },
  {
    path: '/admin/staff/add',
    Component: AddStaffPage,
  },
  {
    path: '/admin/staff/:id',
    Component: StaffDetailsPage,
  },
  {
    path: '/admin/staff/edit/:id',
    Component: EditStaffPage,
  },
  {
    path: '/admin/tasks',
    Component: TaskListPage,
  },
  {
    path: '/admin/tasks/create',
    Component: CreateTaskPage,
  },
  {
    path: '/admin/tasks/:id',
    Component: TaskDetailsPage,
  },
  {
    path: '/admin/tasks/:id/assign',
    Component: AssignTaskPage,
  },
  {
    path: '/admin/tasks/:id/progress',
    Component: UpdateTaskProgressPage,
  },
  {
    path: '/admin/contribution',
    Component: ContributionListPage,
  },
  {
    path: '/admin/contribution/record',
    Component: RecordContributionPage,
  },
  {
    path: '/admin/contribution/:id',
    Component: ContributionDetailsPage,
  },
  {
    path: '/admin/customers',
    Component: CustomerListPage,
  },
  {
    path: '/admin/customers/:id',
    Component: CustomerDetailsPage,
  },
  {
    path: '/admin/payments',
    Component: PaymentListPage,
  },
  {
    path: '/admin/suppliers',
    Component: SupplierListPage,
  },
  {
    path: '/admin/suppliers/add',
    Component: AddSupplierPage,
  },
  {
    path: '/admin/materials',
    Component: MaterialInventoryPage,
  },
  {
    path: '/admin/financial',
    Component: FinancialRecordsPage,
  },
  {
    path: '/admin/financial/record-income',
    Component: RecordIncomePage,
  },
  {
    path: '/admin/financial/record-expense',
    Component: RecordExpensePage,
  },
  {
    path: '/admin/community',
    Component: CommunityActivitiesPage,
  },
  {
    path: '/admin/reports',
    Component: ReportsPage,
  },
  {
    path: '/admin/settings',
    Component: SettingsAdminPage,
  },
  {
    path: '/admin/profile',
    Component: AdminProfilePage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
