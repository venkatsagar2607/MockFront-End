import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './Auth/SignupForm';
import SigninForm from './Auth/SigninForm';
import Employee from './Pages/employeedash';
import Hrdash from './Pages/Hrdash';
import Footer from './Navigations/Footer';
import Navigatebar from './Navigations/Navigatebar';
import Profile from './Pages/Profile';
import AdminDashboard from './Pages/AdminDashboard';
import Navigatebaradmin from './Navigations/Adminnavbar';
import AdminProfile from './Pages/AdminProfile';
import ManageEmployees from './Pages/ManageEmployees';
import Empnav from './Navigations/Empnav';
import Empprofile from './Pages/Empprofile';
import LeavePage from './Pages/Leaves';
import PayslipPage from './Pages/PayslipPage';
import FinanceDash from './Pages/Finance';
import Finanaceprf from './Pages/FinancePrf';
import Expenses from './Pages/Expenses';
import Inovice from './Pages/Inovice';
import Reports from './Pages/Reports';
import Salesdash from './Sales/SalesDash';
import Salespfo from './Pages/Salesprof';
import SalesNav from './Navigations/SalesNav';
import SalesLeads from './Sales/SalesLeads';
import SalesOrders from './Sales/SalesOrders';
import SalesReports from './Sales/SalesReports';
import InvoiceView from './Pages/InvoiceView';
import ChatWidget from './ChatBot/ChatWidget';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignupForm />}></Route>
          <Route path='/Login' element={<SigninForm />}></Route>
          <Route path='/employee' element={<Employee />}></Route>
          <Route path='/hr' element={<Hrdash />}></Route>
          <Route path='/nav' element={<Navigatebar />} />
          <Route path='/footer' element={<Footer />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/admin' element={<AdminDashboard />}></Route>
          <Route path='/adminnav' element={<Navigatebaradmin />} />
          <Route path='/adminprofile' element={<AdminProfile />}></Route>
          <Route path='/manageemployees' element={<ManageEmployees />}></Route>
          <Route path='/empnav' element={<Empnav />} />
          <Route path='/EmployeeProfile' element={<Empprofile />} />
          <Route path='/leaves' element={<LeavePage />} />
          <Route path='/payslips' element={<PayslipPage />} />
          <Route path='/finance' element={<FinanceDash />} />
          <Route path='/Financeprf' element={<Finanaceprf />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/inovice' element={<Inovice />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/salesdash' element={<Salesdash />} />
          <Route path='/salesprf' element={<Salespfo />} />
          <Route path='/salesnav' element={<SalesNav />} />
          <Route path='/leads' element={<SalesLeads />} />
          <Route path='/orders' element={<SalesOrders />} />
          <Route path='/salesreports' element={<SalesReports />} />
          <Route path='/invoice/:invoiceId' element={<InvoiceView />} />
          <Route path='/chatwidget' element={<ChatWidget />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
