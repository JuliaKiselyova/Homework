import React from 'react';

//step 1
// function Display({ name, animal, onAnimalChange }) {
//     return (
//         <div className="display">
//             {`Hey ${name}, your favorite animal is: ${animal}!`}
//             <button onClick={() => onAnimalChange('')}>reset</button>
//         </div>
//     );
// }

//step 2
function Display({ animal }) {
    return <div className="display">{`Your favorite animal is: ${animal}!`}</div>;
}



export default Display;