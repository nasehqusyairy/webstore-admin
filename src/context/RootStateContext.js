'use client';
import Splash from "@/components/spalsh";
import http from "@/helpers/http";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const RootState = createContext();

export function useRootState() {
  return useContext(RootState);
}

function RootStateContainer({ children }) {
  const [globalState, setGlobalState] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const pathname = usePathname()
  const isAuthPage = pathname.includes('/auth')

  useEffect(() => {
    if (pathname.includes('/auth')) {
      if (globalState.user) {
        if (globalState.user.role == 2) {
          setIsLoading(true)
          router.push('/')
        }
      } else {
        setIsLoading(false)
      }
    } else {
      if (globalState.user) {
        if (globalState.user.role != 2) {
          setError('You are not authorized to access this page')
          router.push('/auth')
        } else {
          if (globalState.products === undefined || globalState.categories === undefined) {
            http.get('/dashboard', {
              headers: {
                Authorization: `Bearer ${globalState.token}`
              }
            }).then(({ data }) => {
              setGlobalState({
                ...globalState,
                products: data.products,
                categories: data.categories.map((category, index) => { return { ...category, number: index + 1 } }),
              })
              setIsLoading(false)
            }).catch(err => {
              setError(err.response.data.message)
            })
          } else if (isLoading) {
            setIsLoading(false)
          }
        }
      } else {
        router.push('/auth')
      }
    }
  }, [globalState, pathname]);

  return (
    <RootState.Provider value={{ globalState, setGlobalState, error, setError }}>
      <div className={(isAuthPage || isLoading ? 'bg-primary' : 'bg-light') + ' root-wrapper'}>
        {isLoading ? <Splash /> : children}
      </div>
    </RootState.Provider>
  );
}

export default RootStateContainer;