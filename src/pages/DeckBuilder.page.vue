// utiliser juste un compute qui compare 
pokemons include recherche

<template>
  <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
      <n-input v-model="searchQuery" placeholder="Rechercher une carte..." style="flex: 1; margin-right: 10px;" />
    </div>
    <n-spin :show="loading">
      <n-grid :cols="4" x-gap="12" y-gap="12">
        <n-grid-item v-for="pokemon in filteredPokemons" :key="pokemon.name">
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
            <div style="margin-top: 10px;">
              <div class="attack-info">
                <strong>Attaque:</strong> <span class="attack-name">{{ pokemon.attack.name }}</span>
                <span class="attack-damages">({{ pokemon.attack.damages }} PV)</span>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-spin>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const pokemons = ref([]);
    const loading = ref(true);
    const searchQuery = ref('');

    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokemon-api-seyrinian-production.up.railway.app/pokemon-cards');
        pokemons.value = response.data;
        console.log('Pokemons fetched:', pokemons.value);
      } catch (error) {
        console.error('Failed to fetch Pokémon cards:', error);
      } finally {
        loading.value = false;
      }
    };

    const filteredPokemons = computed(() => {
      const query = searchQuery.value.toLowerCase();
      console.log('Search query:', query);
      const filtered = pokemons.value.filter(pokemon => 
        pokemon.name.toLowerCase().includes(query)
      );
      console.log('Filtered Pokemons:', filtered);
      return filtered;
    });

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

    return { pokemons, getTypeClass, loading, searchQuery, filteredPokemons };
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

.attack-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.attack-name {
  font-weight: bold;
  margin-right: 5px;
}

.attack-damages {
  color: #ff4d4f;
  font-weight: bold;
}
</style>