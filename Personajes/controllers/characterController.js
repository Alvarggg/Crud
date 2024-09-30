const characterModel = require('../models/characterModel');

// Mostrar la lista de personajes
exports.index = (req, res) => {
    const characters = characterModel.getAllCharacters();
    res.render('characters/index', { characters });
};

// Mostrar formulario de creación de personaje
exports.create = (req, res) => {
    res.render('characters/create');
};

// Guardar un nuevo personaje
exports.store = (req, res) => {
    const characters = characterModel.getAllCharacters();

    // Encontrar el ID más alto y asignar uno nuevo
    const highestId = characters.reduce((max, character) => (character.id > max ? character.id : max), 0);
    const newCharacter = {
        id: highestId + 1, // Asignar el nuevo ID basado en el más alto existente
        name: req.body.name,
        energyLevel: req.body.energyLevel,
        lifeExpectancy: req.body.lifeExpectancy,
        tipoArma: req.body.tipoArma
    };

    // Agregar el nuevo personaje al arreglo
    characters.push(newCharacter);
    characterModel.saveCharacters(characters);

    // Redirigir a la lista de personajes
    res.redirect('/characters');
};

// Mostrar formulario de edición de personaje
exports.edit = (req, res) => {
    const character = characterModel.findCharacterById(parseInt(req.params.id));
    res.render('characters/edit', { character });
};

// Actualizar los datos de un personaje
exports.update = (req, res) => {
    let characters = characterModel.getAllCharacters();
    const characterIndex = characters.findIndex(c => c.id === parseInt(req.params.id));
    if (characterIndex >= 0) {
        characters[characterIndex] = { ...characters[characterIndex], ...req.body };
        characterModel.saveCharacters(characters);
    }
    res.redirect('/characters');
};

// Eliminar un personaje
exports.delete = (req, res) => {
    let characters = characterModel.getAllCharacters();
    characters = characters.filter(c => c.id !== parseInt(req.params.id));
    characterModel.saveCharacters(characters);
    res.redirect('/characters');
};
