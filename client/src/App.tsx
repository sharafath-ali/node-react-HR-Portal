import MainBanner from './compoents/MainBanner';
import AddEmployee from './compoents/AddEmployee';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchProvider from './contexts/SearchContext';
import Upload from './compoents/Upload';
import EmployeeProfile from './compoents/EmployeeProfile';
import Cardsection from './compoents/Cardsection';
import ViewDocuments from './compoents/ViewDocuments';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <>
    <SearchProvider>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Cardsection /> } />
     <Route path='ViewDocuments/:id' element={<ViewDocuments/> } />
     <Route path='AddEmployee' element={<AddEmployee />} />
     <Route path='Upload/:id' element={<Upload/>} />
     <Route path='ViewProfile/:id' element={<EmployeeProfile/>} />
    </Routes>
    </BrowserRouter>
    </SearchProvider>
    </>
  );
}
