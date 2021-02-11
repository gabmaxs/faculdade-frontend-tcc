import { mount } from '@vue/test-utils'
import RecipeRegister from '@/views/RecipeRegister.vue'

describe('RecipeRegister.vue', () => {
  it('renders tab 1 view', () => {
    const wrapper = mount(RecipeRegister)
    expect(wrapper.text()).toMatch('Tab 1 page')
  })
})
