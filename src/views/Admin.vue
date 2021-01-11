<template>
  <div>
    <v-row>
      <v-col
        md="2"
      >
        <v-card
          width="256"
        >
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  세로엽서
                </v-list-item-title>
                <v-list-item-subtitle>
                  admin
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
              dense
              nav
            >
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                @click="menuFunction(item.func)"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col>
        <transition name="fade">
          <component v-bind:is="component"></component>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RequestView from './components/admin/Request'
import AnalysisView from './components/admin/Analysis'
import SendNotifyView from './components/admin/SendNotify'

  export default {
    components: {
      RequestView,
      AnalysisView,
      SendNotifyView
    },
    data () {
      return {
        items: [
          { title: '요청', icon: 'mdi-bell-ring-outline', func: "requestComponent" },
          { title: '분석', icon: 'mdi-chart-box-outline', func: "analysisComponent" },
          { title: '알람 전송', icon: 'mdi-send-outline', func: "sendNotifyComponent" },
          { title: '로그아웃', icon: 'mdi-logout-variant', func: "logout" },
        ],
        component: 'RequestView',
        right: null,
      }
    },
    methods: {
      menuFunction(func) {
        if (func === "requestComponent") {
          this.component = "RequestView"
        } else if (func === "analysisComponent") {
          this.component = "AnalysisView"
        } else if (func === "sendNotifyComponent") {
          this.component = "SendNotifyView"
        } else if (func === "logout") {
          localStorage.removeItem("adId")
          localStorage.removeItem("adToken")
          location.replace("/")
        }
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active {
      transition: all 0.8s ease;
  }
  .fade-leave-active {
      transition: all 0.8s cubic-bezier(1, 1, 1.8, 3);
  }
  .fade-enter,
  .fade-leave-to {
      transform: translateY(2vw);
      opacity: 0
  }
</style>