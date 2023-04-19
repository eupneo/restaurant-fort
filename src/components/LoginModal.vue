<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md">
        <h5 align="center">Login</h5>
        <q-input
          outlined
          v-model="userData.username"
          label="Username"
          class="q-pb-md"
        />
        <q-input
          outlined
          v-model="userData.password"
          label="Password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="Login" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref } from "vue";

const $q = useQuasar();
const store = useStore();
const isPwd = ref(true);

const userData = ref({
  username: undefined,
  password: undefined,
});

const props = defineProps({
  // ...your custom props
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
async function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  try {
    await store.dispatch("login", userData.value);
    $q.notify({ message: "Loggin in", color: "green" });
    onDialogOK();
  } catch (error) {
    console.log(error);
    $q.notify({ message: "Failed login", color: "red" });
  }

  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
