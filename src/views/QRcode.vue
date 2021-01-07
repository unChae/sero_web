<template>
  <div>
    <Loading v-if="isLoading" />
    {{poId}}
    <div>{{qrData}}</div>
  </div>
</template>

<script>
// components
import Loading from './Loading';

// apis
import { getQrData } from '../api/qrCodeApi';

export default {
  components:{
    Loading
  },
  props: ["poId"],
  data() {
    return {
      isLoading: false,
      qrData: [],
    }
  },
  async mounted() {
    this.isLoading = true;
    this.qrData = await getQrData(this.poId);
    this.isLoading = false;
  },
  methods: {

  }
}
</script>

