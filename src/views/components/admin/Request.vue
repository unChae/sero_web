<template>
  <v-container>
    <v-snackbar
      v-model="toastSnackbar"
      dark
      absolute
      right
      rounded="pill"
      top
    >
      {{ errorMessage }}
    </v-snackbar>
    <v-card>
      <v-card-title>
        요청 데이터
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-help-circle-outline
            </v-icon>
          </template>
          <v-icon dark small>mdi-account-check</v-icon>&nbsp;수신 대기 중<br>
          <v-icon dark small>mdi-marker</v-icon>&nbsp;제작 중<br>
          <v-icon dark small>mdi-truck</v-icon>&nbsp;배송 중<br>
          <v-icon dark small>mdi-check-bold</v-icon>&nbsp;배송 완료
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-row align="end">
          <v-col
            sm="2"
          >
            <v-select
              item-text="name"
              item-value="value"
              @change="(v) => {
                options.category = v
                setPostData()
              }"
              :items="searchItems"
              v-model="defaultSelected"
            ></v-select>
          </v-col>

          <v-col
            sm="10"
          >
            <v-text-field
              v-model="options.search"
              append-icon="mdi-magnify"
              label="검색"
              @change="setPostData"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="postData"
        item-key="of_id"
        show-select
        class="elevation-1"
      >
        <template v-slot:top>
          <v-btn
            icon
            class="mx-2"
            @click="() => {
              stateSnackbar = false
              filterSnackbar = true 
              select = 'Filter'
            }"
          >
            <v-icon small>mdi-tune-variant</v-icon>
          </v-btn>
          <v-snackbar
            v-model="filterSnackbar"
          >
            <v-list-item-title>{{ select }}</v-list-item-title>
            <br />
            <v-btn-toggle
              v-model="options.state"
              multiple
              @change="setPostData"
            >
              <v-btn
                icon
              >
                <v-icon small>mdi-account-check</v-icon>
              </v-btn>
              <v-btn
                icon
              >
                <v-icon small>mdi-marker</v-icon>
              </v-btn>
              <v-btn
                icon
              >
                <v-icon small>mdi-truck</v-icon>
              </v-btn>
              <v-btn
                icon
              >
                <v-icon small>mdi-check-bold</v-icon>
              </v-btn>
            </v-btn-toggle>
            <template v-slot:action="{ attrs }">
              <v-btn
                text
                v-bind="attrs"
                @click="filterSnackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-btn
            icon
            class="mx-2"
            @click="() => {
              filterSnackbar = false 
              stateSnackbar = true 
              select = 'State'
            }"
          >
            <v-icon small>mdi-state-machine</v-icon>
          </v-btn>
          <v-snackbar
            v-model="stateSnackbar"
          >
            <v-list-item-title>{{ select }}</v-list-item-title>
            <br />
            <v-btn
              icon
              @click="updateState(0)"
            >
              <v-icon small>mdi-account-check</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="updateState(1)"
            >
              <v-icon small>mdi-marker</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="updateState(2)"
            >
              <v-icon small>mdi-truck</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="updateState(3)"
            >
              <v-icon small>mdi-check-bold</v-icon>
            </v-btn>
            <template v-slot:action="{ attrs }">
              <v-btn
                text
                v-bind="attrs"
                @click="stateSnackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-btn
            icon
            class="mx-2"
            @click="setPostData"
          >
            <v-icon small>mdi-reload</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.address`]="{ item }">
          {{ item.of_address }}, {{ item.of_address_detail }}
        </template>
        <template v-slot:[`item.date`]="{ item }">
          {{ item.createdAt }}
        </template>
        <template v-slot:[`item.state`]="{ item }">
          <v-icon small>{{ item.of_status }}</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { 
  getPostData,
  updatePostState, 
} from '../../../api/postApi'

export default {
  data() {
    return {
      select: '',
      errorMessage: '',
      toastSnackbar: false,
      filterSnackbar: false,
      stateSnackbar: false,
      defaultSelected: {
        name: '전체',
        value: 0
      },
      searchItems: [
        {
          name: '전체',
          value: 0
        },
        {
          name: '번호',
          value: 1
        },
        {
          name: '유저',
          value: 2
        },
        {
          name: '주소',
          value: 3
        },
        {
          name: '우편',
          value: 4
        },
      ],
      options: {
        'category': 0,
        'state': [0, 1, 2, 3],
        'search': '' 
      },
      postData: [],
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'start',
          sortable: false,
          value: 'of_id',
        },
        { text: '유저', value: 'of_us_id' },
        { text: '주소', value: 'address' },
        { text: '우편번호', value: 'of_address_number' },
        { text: '전송 날짜', value: 'date' },
        { text: '배송 상태', value: 'state' },
      ],
    }
  },
  async mounted() {
    await this.setPostData()
  },
  methods: {
    formatState(state) {
      switch (state) {
        case 0:
          return "mdi-account-check"
        case 1:
          return "mdi-marker"
        case 2:
          return "mdi-truck"
        case 3:
          return "mdi-check-bold"
        default:
          return "mdi-ghost"
      }
    },
    formatDate(date) {
      var _date = new Date(date)
      var res = 
      this.formatDateToZero(_date.getFullYear(), 4) + '-' + 
      this.formatDateToZero(_date.getMonth() + 1, 2) + '-' + 
      this.formatDateToZero(_date.getDate(), 2) + ' ' + 
      this.formatDateToZero(_date.getHours(), 2) + ':' + 
      this.formatDateToZero(_date.getMinutes(), 2) + ':' + 
      this.formatDateToZero(_date.getSeconds(), 2)
      return res
    },
    formatDateToZero(n, digits) {
      let zero = ''
      n = n.toString()
      if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++)
          zero += '0'
      }
      return zero + n
    },
    async setPostData() {
      let payload = {
        "options": this.options
      }
      this.postData = await getPostData(payload)
      this.postData = this.postData.data.data
      for(let i = 0; i < this.postData.length; i ++) {
        this.postData[i].of_status = this.formatState(this.postData[i].of_status)
        this.postData[i].createdAt = this.formatDate(this.postData[i].createdAt)
      }
    },
    async updateState(value) {
      if(this.selected.length == 0) {
        this.errorMessage = '항목을 선택해주세요'
        this.toastSnackbar = true
      }
      let payload = {
        value,
        "post": this.selected
      }
      let res = await updatePostState(payload);
      if(res.status == 200) {
        for(let i = 0; i < this.selected.length; i ++) {
          let idx = this.postData.indexOf(this.selected[i])
          this.postData[idx].of_status = this.formatState(value)
        }
      } else {
        this.errorMessage = '상태 업데이트에 실패했습니다'
        this.toastSnackbar = true
      }
      this.selected = []
    }
  },
}
</script>