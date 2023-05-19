import React from 'react';

// step 1
// function FavoriteAnimal({ animal, onAnimalChange }) {
//     return (
//         <div className="favoriteAnimal">
//             <label htmlFor="animal">Favorite Animal: </label>
//             <input
//                 id="animal"
//                 value={animal}
//                 onChange={event => onAnimalChange(event.target.value)}
//             />
//         </div>
//     );
// }



// step 2
function FavoriteAnimal({ animal, onAnimalChange }) {
    const handleReset = event => {
        event.preventDefault();
        onAnimalChange('');
    };
    return (
        <div className="favoriteAnimal">
            <label htmlFor="animal">Favorite Animal: </label>
            <input
                id="animal"
                value={animal}
                onChange={event => onAnimalChange(event.target.value)}
            />
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}
export default FavoriteAnimal;

