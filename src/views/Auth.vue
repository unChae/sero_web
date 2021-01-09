<template>
  <div>
    <v-container fill-height fluid>
      <v-row align="center"
          justify="center">
          <v-col md="4">
            <v-card class="pa-0">
              <v-card-title>
                관리자 로그인
              </v-card-title>
              <v-card-text>
                <form @submit.prevent="submit">
                  <v-text-field
                    v-model="account"
                    :counter="10"
                    label="Account"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    class="input-group--focused"
                    @click:append="show = !show"
                  ></v-text-field>
                  <v-btn
                    type="submit"
                  >
                    submit
                  </v-btn>
                </form>
              </v-card-text>
            </v-card>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { login } from '../api/authApi'

export default {
  data() {
    return {
      show: false,
      account: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      let payload = {
        "adAccount": this.account,
        "adPassword": this.password
      }
      let res = await login(payload)
      console.log(res.data)
      if(res) {
        localStorage.setItem("adToken", res.data.data.new_token)
        localStorage.setItem("adId", res.data.data.admin.ad_id)
        location.replace('/admin')
      }
    }
  }
}
</script>