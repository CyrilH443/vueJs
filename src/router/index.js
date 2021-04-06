import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ParkingDetails from "../components/ParkingDetails.vue"
import ParkingList from "../components/ParkingList.vue"
import Louer from "../components/Louer.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path : '/parking-detail/:id',
    name : 'ParkingDetails',
    props: true,
    component : ParkingDetails
  },
  {
    path : '/parking-list',
    name : 'ParkingList',
    component : ParkingList
  },
  {
    path : '/Louer',
    name : 'Louer',
    component : Louer
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router