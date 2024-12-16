import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {Hero} from "@/modules/stzb/api/data";
import {requestHeroes} from "@/modules/stzb/api";


export const useHeroStore = defineStore('hero', () => {
  const heroes = ref<Hero[]>([])

  async function fetchHero() {
    const res = await requestHeroes()
    heroes.value = res.data.data
  }

  return {heroes, fetchHero}
})
