<template>
  <v-container>
    <v-toolbar-title>요청 데이터</v-toolbar-title>
    <br>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="postData"
      item-key="of_id"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-btn>배송시작</v-btn>
      </template>
      <template v-slot:[`item.address`]="{ item }">
        {{ item.of_address }}, {{ item.of_address_detail }}
      </template>
      <template v-slot:[`item.date`]="{ item }">
        {{ item.createdAt }}
      </template>
      <template v-slot:[`item.state`]="{ item }">
        {{ item.of_status }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { getPostData } from '../../../api/postApi'

export default {
  data() {
    return {
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
    this.postData = await getPostData()
    this.postData = this.postData.data.data
    for(let i = 0; i < this.postData.length; i ++) {
      // 배송 상태 포멧
      this.postData[i].of_status = this.formatState(this.postData[i].of_status)
      // 날짜 시간 포멧
      var date = new Date();
      var res = 
      this.formatDate(date.getFullYear(), 4) + '-' + 
      this.formatDate(date.getMonth() + 1, 2) + '-' + 
      this.formatDate(date.getDate(), 2) + ' ' + 
      this.formatDate(date.getHours(), 2) + ':' + 
      this.formatDate(date.getMinutes(), 2) + ':' + 
      this.formatDate(date.getSeconds(), 2);
      this.postData[i].createdAt = res
    }
  },
  methods: {
    formatState: (state) => {
      switch (state) {
        case 0:
          return "수락하지 않은 엽서"
        case 1:
          return "배송 준비"
        case 2:
          return "배송 중"
        case 3:
          return "배송 완료"
        default:
          return "등록되지 않은 상태"
      }
    },
    formatDate: (n, digits) => {
      var zero = '';
      n = n.toString();
      if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++)
          zero += '0';
      }
      return zero + n;
    }
  },
}
</script>