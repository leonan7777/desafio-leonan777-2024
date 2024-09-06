const recintos = [
    { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "MACACO", quantidade: 3, tamanho: 1 }] },
    { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
    { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "CORRER", quantidade: 1, tamanho: 2 }] },
    { numero: 4, bioma: "Rio", tamanhoTotal: 8, animais: [] },
    { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "LEAO", quantidade: 1, tamanho: 3 }] },
  ];
  
  const animaisPossiveis = {
    "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
    "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
    "CROCODILO": { tamanho: 3, biomas: ["Rio"], carnivoro: true },
    "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
    "CORRER": { tamanho: 2, biomas: ["savana"], carnivoro: false },
    "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "Rio"], carnivoro: false },
  };
  
  function biomaAdequado(animal, recinto) {
    return animaisPossiveis[animal].biomas.includes(recinto.bioma) || 
           (animal === "HIPOPOTAMO" && recinto.bioma === "savana e rio");
  }
  
  function temEspacoSuficiente(recinto, animal, quantidade) {
    const espacoUsado = recinto.animais.reduce((total, animal) => total + (animal.quantidade * animal.tamanho), 0);
    const espacoExtra = recinto.animais.length > 0 ? 1 : 0; // Espaço extra para mais de uma espécie
    const espacoNecessario = animaisPossiveis[animal].tamanho * quantidade + espacoExtra;
    return (recinto.tamanhoTotal - espacoUsado) >= espacoNecessario;
  }
  
  function verificaCarnivoros(recinto, animal) {
    const novoAnimalCarnivoro = animaisPossiveis[animal].carnivoro;
    const temOutrosAnimais = recinto.animais.some(a => animaisPossiveis[a.especie].carnivoro !== novoAnimalCarnivoro);
    return !novoAnimalCarnivoro || !temOutrosAnimais;
  }
  
  function encontrarRecintosViaveis(animal, quantidade) {
    if (!animaisPossiveis[animal]) {
      console.error("Animal não encontrado.");
      return [];
    }
  
    return recintos.filter(recinto => 
      biomaAdequado(animal, recinto) &&
      temEspacoSuficiente(recinto, animal, quantidade) &&
      verificaCarnivoros(recinto, animal)
    );
  }
  