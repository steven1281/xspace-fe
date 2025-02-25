import { createContext } from react


const NFTContext = createContext();

export const NFTProvider = ({ children }) => {

    return (
        <NFTContext.Provider value={{}}>
            {children}
        </NFTContext.Provider>
    )
}

export const useNFT = () => {
    return useContext(NFTContext);
}