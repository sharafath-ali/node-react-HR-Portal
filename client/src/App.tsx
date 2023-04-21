import MainBanner from './compoents/MainBanner';
import AddEmployee from './compoents/AddEmployee';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchProvider from './contexts/SearchContext';
import Upload from './compoents/Upload';
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
    </Routes>
    </BrowserRouter>
    </SearchProvider>
    </>
    </div>
  );
}
