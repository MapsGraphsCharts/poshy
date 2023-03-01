import { useState } from 'react';
import PoshmarkSearchForm from '../components/PoshmarkSearchForm ';
import OtherComponent from '../components/OtherComponent';

function ParentComponent() {
    const [poshmarkData, setPoshmarkData] = useState(null);
    console.log(poshmarkData)

    function handlePoshmarkQuery(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPoshmarkData(data.data);
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
