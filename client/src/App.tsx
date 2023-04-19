import MainNavbar from './compoents/MainNavbar';
import './App.css';
import MainBanner from './compoents/MainBanner';
import AddEmployee from './compoents/AddEmployee';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchProvider from './contexts/SearchContext';
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
    </Routes>
    </BrowserRouter>
    </SearchProvider>
    </>
    </div>
  );
}
