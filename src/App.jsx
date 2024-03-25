import React, { createContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import StyleSelector from "./Components/StyleSelector";
import "./App.scss";
import SofaInformation from "./Components/SofaInformation";
//import HubspotForm from 'react-hubspot-form'

export const Store = createContext(null);
const SOFAS = gql`
  query NewQuery {
    opcionesSofas {
      sofasInformation {
        hubspotInformation {
          formId
          portalId
        }
        sofa {
          name
          sofaContent {
            name
            price
            information
            button
            gallery {
              mediaItemUrl
              title
            }
          }
        }
      }
    }
  }
`;

function App() {
  const [DataSofa, setDataSofa] = useState(null);
  const [CurrentStyle, setCurrentStyle] = useState(null);
  const [CurrentSofa, setCurrentSofa] = useState(null);

  const { loading, data } = useQuery(SOFAS, {
    onCompleted: (data) => {
      setDataSofa(data?.opcionesSofas?.sofasInformation?.sofa);
    },
  });
  return (
    <>
      <Store.Provider
        value={{
          DataSofa,
          setDataSofa,
          CurrentStyle,
          setCurrentStyle,
          CurrentSofa,
          setCurrentSofa,
        }}
      >
        <StyleSelector />
        <SofaInformation />
      </Store.Provider>
    </>
  );
}

export default App;

{
  /* 
      <HubspotForm
                        className="hubspotForm"
                        region='na1'
                        portalId='7330959'
                        formId='2daf52bc-74d2-4fdd-bcfa-0b982d273af8'
                        onSubmit={() => console.log('Submit!')}
                        onReady={(form) => form.contentDocument.querySelectorAll('head')[0].insertAdjacentHTML("beforeend", `<style>
                    .hs-button.primary{
                        width: 100%;
                    }
                    label span{
                        font-weight: bold;
                    }
                    .hs_submit .actions{
                        padding: 0px !important;
                    }
                    </style>`)}
                        loading={<div>Loading...</div>}
                    />
                     */
}
