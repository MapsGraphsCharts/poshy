import { useState } from 'react';
import PoshmarkSearchForm from '../components/PoshmarkSearchForm ';
import OtherComponent from '../components/OtherComponent';
import { fetchPoshmarkQuery } from "@/services/poshmark";

'../services/poshmark'
function ParentComponent() {
    const [poshmarkData, setPoshmarkData] = useState(null);
    console.log(poshmarkData)

    function handlePoshmarkQuery(url) {
        fetchPoshmarkQuery(url)
            .then(data => {
                setPoshmarkData(data.allData);
            })
            .catch(error => console.error(error));
    }


    return (
        <div>
            <PoshmarkSearchForm onSubmit={handlePoshmarkQuery} />
            {poshmarkData && <OtherComponent data={poshmarkData} />}
        </div>
    );
}

export default ParentComponent;
