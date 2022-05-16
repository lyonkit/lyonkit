<script setup lang="ts">
import { ComponentsMap } from '@lyonkit/bloks'

const route = useRoute()

const lang = computed(() => route.params.lang as string)

const showWarning = useLocalStorage('showTextWarning', true)
const toggleWarning = useToggle(showWarning)

const HelloWorld = ComponentsMap['#hello-world'].component
</script>

<template>
  <div>
    <HelloWorld />
    <TransitionCollapseExpandY>
      <AlertInfo v-if="showWarning">
        Cette page vous permet de modifier les textes des différentes page. Il s'agit d'un dicitonnaire
        clé/valeur (chaque clé est associé à du texte). Chaque page est construite à partir des clés permettant ainsi de
        modifier le texte.
        <br>
        <br>
        <span>Les règles à connaitre pour modifier le texte :</span>
        <ul>
          <li>
            Certains textes sont <strong>paramétrés</strong>, il peuvent recevoir une propriété indiqué entre <strong>accolade</strong>.
            Exemple
            <code>Tu as mangé <i>{nombre}</i> pomme</code>, ici la propriété <code>nombre</code> est variable. Il faut donc veiller à
            conserver les paramètres lors d'un changement de texte.
          </li>
          <li>
            Il est possible de <strong>lier plusieurs textes</strong> entre eux. L'utilisation de la syntaxe <code>Bienvenue
              sur le site <i>@:nom_site</i> !</code> permet de réutiliser la clé <code>nom_site</code> dans ce texte.
          </li>
          <li>
            Les textes liés peuvent également recevoir des <strong>modifieurs</strong> (<u>upper</u>, <u>lower</u> et <u>capitalize</u>).
            Exemple d'utilisation d'un modifieur :
            <code>Bienvenue sur le site <i>@.lower:nom_site</i> !</code>
          </li>
          <li>
            Certains textes peuvent être <strong>pluralisés</strong>. Exemple <code>Un chapeau | Des chapeaux</code> ou <code>Aucun chapeau | Un chapeau | {nombre} chapeaux</code>
          </li>
          <li>
            Les charactères suivants sont <strong>interdis</strong> :
            <code>{</code> <code>}</code> <code>@</code> <code>$</code> et <code>|</code>. Pour pouvoir les insérés, il faut utiliser la syntaxe : <code>Mon adresse
              email est contact<u>{'@'}</u>monsite.fr</code>
          </li>
        </ul>

        <BtnPrimary
          rounded
          class="block mx-auto mt-4"
          icon="i-bi:hand-thumbs-up-fill"
          @click="toggleWarning()"
        >
          J'ai compris
        </BtnPrimary>
      </AlertInfo>
      <button
        v-else
        class="absolute right-2 top-2 i-clarity:info-standard-solid text-blue-400 hover:bg-blue-300 transition-all w-6 h-6"
        @click="toggleWarning()"
      />
    </TransitionCollapseExpandY>
  </div>
</template>

<style scoped>
code {
  @apply bg-gray-300 rounded pt-0.5 px-1;
}
</style>
