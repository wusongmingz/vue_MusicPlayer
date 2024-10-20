<script setup lang="ts">
import { userPlaylistRes } from '@/api/interface'
import { MenuData } from './data'
import { userPlaylist } from '@/api'
import { Icon } from '@iconify/vue'
import {getLocalDataUser} from '@/api/localData'
import {gpt35Api} from '@/api/openai'
// import rebot from '@/views/robot/index.vue'



const menuStore = useMenuStore()
const router = useRouter()
const userStore = useUserStore()
const playlists = ref<userPlaylistRes[]>([])
const userMessage = ref('') // 这里是用户输入的消息
const conversation  = ref([
  {
    role:'system',
    content: '你是一个AI音乐助手，你可以帮助用户解决问题，你可以回复用户的问题，你可以帮助用户学习，你可以帮助用户学习编程，你可以帮助用户学习编程',
  },
])
const gptResponse  = ref('')


onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

watch(
  () => userStore.userInfo,
  () => {
    if (Object.keys(userStore.userInfo).length > 0) {
      userPlaylist<{ playlist: userPlaylistRes[] }>({
        id: userStore.userInfo.userId,
      }).then(({ playlist }) => {
        playlists.value = playlist
      })
    }
  },
  {
    immediate: true,
  }
)

// 监听快捷键
const handleKeyDown = (event: KeyboardEvent): void => {
  // 监听 Ctrl + D
  if (event.ctrlKey && event.key === 'd') {
    event.preventDefault()
    router.push('/discover')
    menuStore.setMenuIndex('1-0')
  }
  // 监听 Ctrl + Q
  if (event.ctrlKey && event.key === 'q') {
    event.preventDefault()
    router.push('/theme')
    menuStore.setMenuIndex('2-3')
  }
}

// @ts-ignore
// 获取测试数据
const getLocalDataUserdata = async function fetchData() {
  try {
    const data = await getLocalDataUser();
    console.log(data, 2);
  } catch (error) {
    console.error('获取数据失败：', error);
  }
};

const sendMessage = async () => {
  try {
        // 检查用户输入是否为空
        if (userMessage.value.trim() === '') {
          console.error('User message is empty. Please enter a message.');
          return;
        }

        // 将用户输入添加到对话数组
        conversation.value.push({ role: 'user', content: userMessage.value });

        // 调用 gpt35Api 函数
        const response = await gpt35Api(userMessage.value); // 确保传入的是数组

        // 获取 GPT 的响应并添加到对话中
        gptResponse.value = response;
        conversation.value.push({ role: 'assistant', content: gptResponse.value });

        // 清空用户输入
        userMessage.value = '';
      } catch (error) {
        console.error('Error fetching GPT response:', error);
      }
};



</script>
<template>

  <aside
    class="w-64 dark:border-gray-600 h-full border-r box-border flex flex-col overflow-x-hidden"
  >
  <div>
      <input v-model="userMessage" @keyup.ente="sendMessage" placeholder="enter your message">
      <button @click="sendMessage">sendMessage</button>
      <p v-if="gptResponse ">{{ gptResponse  }}</p>
  </div> 
  <!-- <div>
    <rebot></rebot>
  </div>  -->
    <div class="flex flex-col items-center p-4 gap-2">
      <span class="relative flex h-24 w-24 shrink-0">
        <img
          class="aspect-square h-full w-full rounded-full"
          src="@/assets/gthub-avatar.png"
        />
      </span>
      <a href="https://github.com/XiangZi7" target="_blank">
        <div
          class="flex items-center bg-black text-white gap-1 text-xs p-1 rounded-lg"
        >
        <p>升级黑椒会员</p>
          <!-- <img
            alt="GitHub User's stars"
            src="https://img.shields.io/github/stars/XiangZi7?style=flat&logo=github&label=XiangZi&labelColor=%23000&color=%23000"
          /> -->
        </div>
      </a>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        用户名
      </h2>
    </div>
    <nav
      class="flex flex-col p-4 space-y-4 flex-1 h-full box-border overflow-x-hidden"
    >
      <div
        v-for="(item, index) in MenuData"
        :key="index"
        class="w-full flex flex-col gap-1"
      >
        <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {{ item.title }}
        </h3>
        <router-link
          class="rounded-lg w-full py-2 px-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-[#414243] transition ease-in-out duration-200"
          :to="item2.router"
          v-for="(item2, index2) in item.children"
          :data-index="index + '-' + index2"
          :key="index2"
          :class="
            menuStore.menuIndex == index + '-' + index2
              ? 'bg-gray-200 dark:bg-[#414243]'
              : ''
          "
          @click="menuStore.setMenuIndex(index + '-' + index2)"
        >
          <Icon :icon="item2.icon" />
          <span class="text-sm">{{ item2.title }}</span>
          <span
            v-if="item2.shortcut"
            class="!ml-auto text-[10px] text-muted-color bg-emphasis border-surface p-1 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            {{ item2.shortcut }}
          </span>
        </router-link>
      </div>
      <div class="w-full flex flex-col gap-1 overflow-x-hidden">
        <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400">
          我的歌单
        </h3>
        <el-scrollbar class="flex-1 overflow-x-hidden">
          <router-link
            class="rounded-lg w-full py-2 px-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition ease-in-out duration-200"
            v-for="(item, index) in playlists"
            :to="`/songlist?id=${item.id}`"
            :key="index"
          >
            <el-image
              class="w-7 h-7 rounded-lg"
              :src="item.coverImgUrl + '?param=50y50'"
              :alt="item.name"
            />
            <span class="text-sm line-clamp-1">{{ item.name }}</span>
          </router-link>
        </el-scrollbar>
      </div>
    </nav>
  </aside>
</template>
