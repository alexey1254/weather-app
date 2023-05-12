<template>
  <div>
    <h1 class="text-center text-xl mb-2">Weather application</h1>
    <div v-if="!isFetching">
      <div v-if="error" class="bg-red-400">Error fetching the data.</div>
      <div v-else class="grid grid-cols-4">
        <h2 class="col-span-4 text-center mb-2">{{ weatherData.city.name }}</h2>
        <div v-for="(forecast, index) in dailyForecast" :key="index" class="">
          <h3>{{ forecast.day }}</h3>
          <div v-for="item in forecast.items" :key="item.dt" class="border m-1 bg-gray-100">
            <p>{{ item.dt_txt }}</p>
            <p>{{ item.main.temp }}</p>
            <p>{{ item.weather[0].description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const isFetching = ref(true);
const error = ref(null);
const weatherData = ref(null);

onMounted(async () => {
  const city = "Spain"; 
  const apiKey = "cc3071d35b646772c47bd0fc28536746"; 

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    weatherData.value = await response.json();
  } catch (error) {
    console.error(error);
    error.value = "Error al obtener los datos del clima";
  }

  isFetching.value = false;
});

const dailyForecast = computed(() => {
  if (weatherData.value && weatherData.value.list) {
    const forecast = weatherData.value.list;

    const groupedForecast = forecast.reduce((group, item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString("es-ES", { weekday: "long" });

      if (!group[day]) {
        group[day] = [];
      }

      group[day].push(item);

      return group;
    }, {});

    const dailyForecast = Object.entries(groupedForecast).map(
      ([day, forecast]) => {
        return {
          day,
          items: forecast,
        };
      }
    );

    return dailyForecast;
  }

  return [];
});
</script>
