import { useEffect, useState } from "react";


export function LabelSelector({ labels, onLabelChange,selectedLabelsProp }) {
    const [selectedLabels, setSelectedLabels] = useState(selectedLabelsProp);

    useEffect(()=>{
        console.log(selectedLabels);
        onLabelChange(selectedLabels)
    },[selectedLabels])

    // console.log(selectedLabelsProp);

    useEffect(()=>{
       setSelectedLabels(selectedLabelsProp)
    },[selectedLabelsProp])

    function handleLabelChange(event) {
        const label = event.target.value;
        if (event.target.checked) {
            setSelectedLabels([...selectedLabels, label]);
        } else {
            setSelectedLabels(selectedLabels.filter(l => l !== label));
        }
    }
console.log(selectedLabels);
console.log(labels);
// console.log(selectedLabels);
    return (
        <div className="label-selector">
            {labels.map(label => (
                <div key={label}>
                    <input
                        type="checkbox"
                        value={label}
                        checked={selectedLabels.includes(label)}
                        onChange={handleLabelChange}
                    />
                    {label}
                </div>
            ))}
        </div>
    )
}

