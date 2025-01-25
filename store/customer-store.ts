import { ref, useAxios } from '#imports'
import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('CUSTOMER_STORE', () => {
  const axios = useAxios()

  const customers = ref<Array<any>>([])

  const loading = ref(false)

  const getAllCustomers = async () => {
    loading.value = true

    const { data } = await axios.get('customers')

    customers.value = data

    loading.value = false

    return data
  }

  const getPaginatedCustomers = async () => {
    const { data } = await axios.get('customers/list')
    return data
  }

  const createCustomer = async (payload: any) => {
    const { data } = await axios.post('customers', payload)

    customers.value = [data, ...customers.value]

    return data
  }

  const updateCustomer = async (customer: any, payload: any) => {
    const { data } = await axios.put(`customers/update/${customer.id}`, payload)

    const index = customers.value.findIndex((c) => c.id === customer.id)

    if (index !== -1) {
      customers.value[index] = data
    }

    return data
  }

  const removeCustomer = async (customer: any) => {
    const { data } = await axios.delete(`customers/${customer.id}`)

    customers.value = customers.value.filter((c) => c.id != customer.id)

    return data
  }

  return {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    removeCustomer,
    getPaginatedCustomers,
    customers,
    loading,
  }
})
