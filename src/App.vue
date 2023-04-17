<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  {{ message }}
  {{ data }}
  <div style="display: flex; flex-wrap: wrap; background-color: cornsilk; padding: 12px; justify-content: center;">
    <div v-for="project in data" :key="project?.id" style="background-color: burlywood; margin: 12px; padding: 12px;">
      <!-- <h5>{{ project?.id }}</h5> -->
      <h5>{{ project?.id.slice(-5) }}</h5>
      <h4>{{ project?.description }}</h4>
      <h2>{{ project?.name }}</h2>
      <button @click="deleteAndUpdateCache(project?.id)">Delete </button>
    </div>
  </div>
</template>

<script setup>
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { computed, ref, watch } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { DEL_PROJECT } from './graphql/mutation';
import { ALL_PROJECTS } from './graphql/querys';

const message = ref('hola vijay')
const { result } = useQuery(ALL_PROJECTS)
const data = computed(() => { return result.value?.projects ?? [] })
// const data2 = useResult(result, null, queryData => queryData.characters.results)
// const data = computed(() => { return result.value?.characters?.results ?? [] }) 

// const {mutate: deleteProject} = useMutation(DEL_PROJECT)
const { mutate: deleteProject } = useMutation(DEL_PROJECT)

const deleteAndUpdateCache = (id) => {
  deleteProject({ id }, {
    update: (store, { }) => {
      const updateDataProjects = store.readQuery({ query: ALL_PROJECTS })
      console.log(updateDataProjects) // all data that is stored in cached
      const updatedData = updateDataProjects.projects.filter(proj => proj.id !== id)
      store.writeQuery({ query: ALL_PROJECTS, data: { projects: updatedData } })
    }
  })

}

watch(data.value, (currVal, oldVal) => {
  console.log('-------', currVal, '******', oldVal, '-----');
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
