<template>
  <div class="notification-wrapper">

    <b-notification
      v-for="(text, key) in errors"
      :key="key"
      type="is-danger"
      aria-close-label="Close notification"
      role="alert">
      {{ text }}
      </b-notification>

    <b-notification
      v-for="(text, key) in info"
      :key="key"
      type="is-info is-light"
      aria-close-label="Close notification"
      role="alert">
      {{ text }}
      </b-notification>


  </div>
</template>

<script>
import { getUniqueId } from '../../helpers';


const MESSAGE_TYPE_ALLOWED = ['info', 'error'];


export default {

  data() {
    return {
      messages: {},
    }
  },

  props: {
    timeout: {
      type: Number,
      default: 4000
    },
    limit: {
      type: Number,
      default: 10
    }
  },

  computed: {
    info() { return this.assignMessage(this.messages, 'info') },
    errors() { return this.assignMessage(this.messages, 'error') }
  },

  methods: {

    addMessage(type, text) {
      let _id = getUniqueId();
      // possibility of duplicate IDs is extremely low, though
      if (this.messages[_id]) _id = getUniqueId();
      if (!Object.values(MESSAGE_TYPE_ALLOWED).includes(type)) type = MESSAGE_TYPE_ALLOWED.default;

      const message = {
        id: _id,
        type: type,
        text: text,
      }

      const messageList = Object.values(this.messages);
      if (messageList.length >= this.limit) {
        const oldest = messageList[0];
        if (oldest) this.delMessage(oldest);
      }
      if (!message.infinite) {
        setTimeout(() => this.delMessage(message), this.timeout);
      }
      this.$set(this.messages, _id, message);
    },

    assignMessage(messages, messageType) {
      return Object.values(messages).reduce((accum, message) => {
        if (message.type === messageType) {
          accum[message.id] = `${messageType.toUpperCase()}: ${message.text}`;
        }
        return accum;
      }, {});
    },

    delMessage(message) {
      this.$delete(this.messages, message.id);
    },
  }
}
</script>

<style>
</style>
