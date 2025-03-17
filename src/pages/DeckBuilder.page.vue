<template>
  <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
    <n-grid :cols="4" x-gap="12" y-gap="12">
      <n-grid-item v-for="pokemon in pokemons" :key="pokemon.name">
        <n-card>
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>{{ pokemon.name }}</span>
              <n-tag type="error">PV {{ pokemon.lifePoints }}</n-tag>
            </div>
          </template>
          <img :src="pokemon.imageUrl" :alt="pokemon.name" style="width: 100%; height: auto;">
          <div style="margin-top: 10px;">
            <n-tag :class="getTypeClass(pokemon.type.name)">Type: {{ pokemon.type.name }}</n-tag>
          </div>
          <div style="margin-top: 10px;">
            <p>Taille: {{ pokemon.height }}m | Poids: {{ pokemon.weight }}kg</p>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const pokemons = ref([]);

    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokemon-api-seyrinian-production.up.railway.app/pokemon-cards');
        pokemons.value = response.data.map(pokemon => ({
          name: pokemon.name,
          lifePoints: pokemon.lifePoints,
          type: pokemon.type,
          height: pokemon.height,
          weight: pokemon.weight,
          imageUrl: pokemon.imageUrl
        }));
      } catch (error) {
        console.error('Failed to fetch Pokémon cards:', error);
      }
    };

    const getTypeClass = (type) => {
      switch (type.toLowerCase()) {
        case 'grass':
          return 'type-grass';
        case 'fire':
          return 'type-fire';
        case 'water':
          return 'type-water';
        case 'electric':
          return 'type-electric';
        case 'psychic':
          return 'type-psychic';
        case 'ice':
          return 'type-ice';
        case 'dragon':
          return 'type-dragon';
        case 'dark':
          return 'type-dark';
        case 'fairy':
          return 'type-fairy';
        case 'normal':
          return 'type-normal';
        case 'fighting':
          return 'type-fighting';
        case 'flying':
          return 'type-flying';
        case 'poison':
          return 'type-poison';
        case 'ground':
          return 'type-ground';
        case 'rock':
          return 'type-rock';
        case 'bug':
          return 'type-bug';
        case 'ghost':
          return 'type-ghost';
        case 'steel':
          return 'type-steel';
        default:
          return 'type-default';
      }
    };

    onMounted(() => {
      fetchPokemons();
    });

    return { pokemons, getTypeClass };
  },
};
</script>

<style scoped>
.type-grass {
  background-color: #78C850;
  color: white;
}

.type-fire {
  background-color: #F08030;
  color: white;
}

.type-water {
  background-color: #6890F0;
  color: white;
}

.type-electric {
  background-color: #F8D030;
  color: white;
}

.type-psychic {
  background-color: #F85888;
  color: white;
}

.type-ice {
  background-color: #98D8D8;
  color: white;
}

.type-dragon {
  background-color: #7038F8;
  color: white;
}

.type-dark {
  background-color: #705848;
  color: white;
}

.type-fairy {
  background-color: #EE99AC;
  color: white;
}

.type-normal {
  background-color: #A8A878;
  color: white;
}

.type-fighting {
  background-color: #C03028;
  color: white;
}

.type-flying {
  background-color: #A890F0;
  color: white;
}

.type-poison {
  background-color: #A040A0;
  color: white;
}

.type-ground {
  background-color: #E0C068;
  color: white;
}

.type-rock {
  background-color: #B8A038;
  color: white;
}

.type-bug {
  background-color: #A8B820;
  color: white;
}

.type-ghost {
  background-color: #705898;
  color: white;
}

.type-steel {
  background-color: #B8B8D0;
  color: white;
}

.type-default {
  background-color: #A8A878;
  color: white;
}
</style>