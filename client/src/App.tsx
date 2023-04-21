import MainBanner from './compoents/MainBanner';
import AddEmployee from './compoents/AddEmployee';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchProvider from './contexts/SearchContext';
import Upload from './compoents/Upload';
import EmployeeProfile from './compoents/EmployeeProfile';
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
    <>
    <SearchProvider>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<MainBanner />} />
     <Route path='/AddEmployee' element={<AddEmployee />} />
     <Route path='/Upload' element={<Upload/>} />
     <Route path='ViewProfile/:id' element={<EmployeeProfile/>} />
    </Routes>
    </BrowserRouter>
    </SearchProvider>
    </>
    </div>
  );
}
