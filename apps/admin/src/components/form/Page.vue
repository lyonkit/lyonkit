<script setup lang="ts">
import type { PageInput } from '@leo91000/lyonkit-client'

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    title: '',
    description: '',
    path: '',
  }),
  loading: false,
  buttonText: 'Créer une page',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: PageInput): void
  (event: 'submit', value: PageInput): void
}>()

const { openToast } = useToast()

interface Props {
  modelValue?: PageInput
  loading?: boolean
  buttonText?: string
}
const model = useVModel(props, 'modelValue', emit, { passive: true, deep: true })

const { required, maxLength, uri } = useRules()

const form = ref<HTMLFormElement>()

async function submitForm() {
  const { valid, errors } = await form.value?.validate()
  if (!valid) {
    console.warn('Invalid form', errors)
    openToast({ message: 'Formulaire invalide', type: 'error' })
    return
  }
  emit('submit', model.value)
}
</script>

<template>
  <VForm
    ref="form"
    :disabled="loading"
    @submit.prevent="submitForm()"
  >
    <VRow>
      <VCol cols="6">
        <VTextField
          v-model="model.title"
          label="Titre"
          hint="Titre de la page sur le résultat d'une recherche google"
          persistent-hint
          :rules="[required('Le titre'), maxLength('Le titre', 60)]"
        />
      </VCol>
      <VCol cols="6">
        <VTextField
          v-model="model.description"
          label="Description"
          hint="Description de la page sur le résultat d'une recherche google"
          persistent-hint
          :rules="[required('La description', true), maxLength('La description', 155)]"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="model.path"
          label="URI"
          hint="URL d'accès à la page (ex: /formations/confiance-en-soi)"
          persistent-hint
          :rules="[required('L\'URI', true), uri('L\'URI')]"
        />
      </VCol>
    </VRow>
    <VBtn
      class="d-block mx-auto"
      color="primary"
      :loading="loading"
      type="submit"
    >
      {{ buttonText }}
    </VBtn>
  </VForm>
</template>
