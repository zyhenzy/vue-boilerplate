<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import {MENUS} from "@/config/config.menu";

const selectedKeys = ref<string[]>([''])
const collapsed = ref<boolean>(false) // 收起状态

const menuList = computed(() => {
  return MENUS
})

onMounted(() => {
  const currentRoute = useRoute()
  selectedKeys.value = [currentRoute.name as string]
})

const handleLogout = () => {
  router.replace('/login')
}

const handleMenuClick = (menu:any) => {
  router.push(menu.path)
}
</script>

<template>
  <a-layout class='app-layout'>
    <a-layout-sider class='app-sider' v-model:collapsed='collapsed' :trigger='null' collapsible>
      <div class='layout-header_logo' />
      <a-menu v-model:selectedKeys='selectedKeys' theme='dark' mode='inline'>
        <a-menu-item @click='handleMenuClick(menu)' v-for="menu in menuList"  :key='menu.name'>
          <span>{{ menu.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class='container'>
      <a-layout-header class='layout-header'>
        <menu-unfold-outlined
          v-if='collapsed'
          class='layout-menu_trigger'
          @click='() => (collapsed = !collapsed)'
        />
        <menu-fold-outlined
          v-else
          class='layout-menu_trigger'
          @click='() => (collapsed = !collapsed)'
        />
        <div class='vab-avatar'>
          <a-dropdown>
            <span class='ant-dropdown-link'>
              <a-avatar>
                <template #icon><UserOutlined /></template>
              </a-avatar>
              user.name
              <DownOutlined />
            </span>
            <template v-slot:overlay>
              <a-menu>
                <a-menu-item @click='handleLogout'>退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        class='container-content'
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
          flex:1,
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang='scss'>
.app-layout {
  height: 100vh;

  .app-sider {
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .container-content {
    height: 100%;
    overflow-y: scroll;
  }
}

.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 0 !important;
  background: #fff !important;
}

.layout-menu_trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.layout-menu_trigger:hover {
  color: #1890ff;
}

.layout-header_logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.vab-avatar {
}

.ant-dropdown-link {
  display: block;
  min-height: 64px;
  cursor: pointer;
}
</style>
