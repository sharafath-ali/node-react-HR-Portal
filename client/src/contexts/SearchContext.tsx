import  { createContext, useState } from 'react'
import * as React from 'react';
export const SearchContext = createContext<any>('')
type Props = {
    children: React.ReactNode;
}

export default function SearchProvider(Props: Props) {
  const [filter,setfilter]=useState<string>('')
  return (
    <SearchContext.Provider value={{ filter,setfilter}}>
        {Props.children}
    </SearchContext.Provider>
  )
}